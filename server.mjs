import { createServer } from "node:http";
import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dataStorePath = join(root, "data-store.json");
const dataJsPath = join(root, "data.js");
const exampleDataPath = join(root, "data-store.example.json");
const uploadDir = join(root, "uploads");
const backupDir = join(root, "backups");
const pythonPath =
  process.env.PYTHON ||
  "C:\\Users\\KCH\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe";
const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 4173);

async function ensureLocalDataFiles() {
  try {
    await stat(dataStorePath);
  } catch {
    await copyFile(exampleDataPath, dataStorePath);
  }
  try {
    await stat(dataJsPath);
  } catch {
    const json = await readFile(dataStorePath, "utf8");
    await writeFile(dataJsPath, `window.CPT_DATA = ${json.trim()};\n`, "utf8");
  }
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return JSON.parse(raw || "{}");
}

async function readRawBody(request, maxBytes = 50 * 1024 * 1024) {
  const chunks = [];
  let total = 0;
  for await (const chunk of request) {
    total += chunk.length;
    if (total > maxBytes) throw new Error("Uploaded file is too large");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload, null, 2));
}

function runExcelImport(filePath) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(pythonPath, ["import_excel.py"], {
      cwd: root,
      env: { ...process.env, INPUT_XLSX: filePath },
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString("utf8");
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString("utf8");
    });
    child.on("error", rejectPromise);
    child.on("close", (code) => {
      if (code !== 0) {
        rejectPromise(new Error(stderr || stdout || `Import failed with exit code ${code}`));
        return;
      }
      try {
        resolvePromise(JSON.parse(stdout));
      } catch {
        resolvePromise({ output: stdout.trim() });
      }
    });
  });
}

async function handleApi(request, response, pathname) {
  if (pathname === "/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (pathname === "/api/import-excel") {
    if (request.method !== "POST") {
      sendJson(response, 405, { ok: false, error: "Method not allowed" });
      return true;
    }
    try {
      const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
      const fileName = url.searchParams.get("filename") || "upload.xlsx";
      const extension = extname(fileName).toLowerCase();
      if (![".xlsx", ".xlsm"].includes(extension)) {
        sendJson(response, 400, { ok: false, error: "Please upload an .xlsx workbook" });
        return true;
      }
      await mkdir(uploadDir, { recursive: true });
      const body = await readRawBody(request);
      if (!body.length) throw new Error("Uploaded file is empty");
      const importPath = join(uploadDir, `import-${Date.now()}${extension}`);
      await writeFile(importPath, body);
      await mkdir(backupDir, { recursive: true });
      const backupPath = join(backupDir, `data-store-${Date.now()}.json`);
      await copyFile(dataStorePath, backupPath);
      const summary = await runExcelImport(importPath);
      const importedData = JSON.parse(await readFile(dataStorePath, "utf8"));
      sendJson(response, 200, { ok: true, summary, backupPath, data: importedData });
    } catch (error) {
      sendJson(response, 500, { ok: false, error: error.message });
    }
    return true;
  }

  if (pathname !== "/api/data") return false;

  if (request.method === "GET") {
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
    createReadStream(dataStorePath).pipe(response);
    return true;
  }

  if (request.method === "PUT") {
    try {
      const payload = await readJsonBody(request);
      payload.generatedAt = new Date().toISOString();
      const json = JSON.stringify(payload, null, 2);
      await writeFile(dataStorePath, `${json}\n`, "utf8");
      await writeFile(dataJsPath, `window.CPT_DATA = ${json};\n`, "utf8");
      sendJson(response, 200, payload);
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message });
    }
    return true;
  }

  sendJson(response, 405, { ok: false, error: "Method not allowed" });
  return true;
}

function resolveStaticPath(pathname) {
  const decoded = decodeURIComponent(pathname === "/" ? "/index.html" : pathname);
  const relativePath = normalize(decoded).replace(/^[/\\]+/, "");
  const filePath = resolve(root, relativePath);
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) return null;
  return filePath;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    if (await handleApi(request, response, url.pathname)) return;

    const filePath = resolveStaticPath(url.pathname);
    if (!filePath) {
      sendJson(response, 403, { ok: false, error: "Forbidden" });
      return;
    }

    try {
      const info = await stat(filePath);
      if (!info.isFile()) throw new Error("not a file");
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const extension = extname(filePath).toLowerCase();
    const noStore = [".html", ".js", ".mjs", ".json"].includes(extension);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": noStore ? "no-store" : "public, max-age=60",
    });
    createReadStream(filePath).pipe(response);
  } catch (error) {
    sendJson(response, 500, { ok: false, error: error.message });
  }
});

await ensureLocalDataFiles();

server.listen(port, host, () => {
  console.log(`CoalTrack server running at http://${host}:${port}`);
});
