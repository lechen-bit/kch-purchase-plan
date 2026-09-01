let data = readLocalData();
const apiState = { available: false, lastGeneratedAt: data?.generatedAt || "" };

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TOTAL_MONTH = 0;
const monthNamesLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const nf0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const heatBenchmarks = { 1: 6600, 2: 5800, 3: 5000, 4: 4200, 5: 3400 };

const els = {
  dataStatus: document.querySelector("#dataStatus"),
  todayLabel: document.querySelector("#todayLabel"),
  brandLogo: document.querySelector("#brandLogo"),
  dashboardPage: document.querySelector("#dashboardPage"),
  analyticsPage: document.querySelector("#analyticsPage"),
  forecastPage: document.querySelector("#forecastPage"),
  viewTabs: document.querySelectorAll("[data-view]"),
  searchInput: document.querySelector("#searchInput"),
  exportButton: document.querySelector("#exportButton"),
  importExcelButton: document.querySelector("#importExcelButton"),
  excelImportInput: document.querySelector("#excelImportInput"),
  importStatus: document.querySelector("#importStatus"),
  addCargoButton: document.querySelector("#addCargoButton"),
  prevYear: document.querySelector("#prevYear"),
  nextYear: document.querySelector("#nextYear"),
  yearLabel: document.querySelector("#yearLabel"),
  periodLabel: document.querySelector("#periodLabel"),
  monthTabs: document.querySelector("#monthTabs"),
  statusTabs: document.querySelectorAll("[data-status]"),
  typeTabs: document.querySelectorAll("[data-type]"),
  mineFilter: document.querySelector("#mineFilter"),
  buyerFilter: document.querySelector("#buyerFilter"),
  chartTabs: document.querySelectorAll("[data-chart-index]"),
  kpiGrid: document.querySelector("#kpiGrid"),
  marketCards: document.querySelector("#marketCards"),
  chart: document.querySelector("#iciChart"),
  fcBaseLabel: document.querySelector("#fcBaseLabel"),
  fcPeriodLabel: document.querySelector("#fcPeriodLabel"),
  fcShiftSelector: document.querySelector("#fcShiftSelector"),
  fcForecastColHeader: document.querySelector("#fcForecastColHeader"),
  fcMatrixBody: document.querySelector("#fcMatrixBody"),
  fcAvgBody: document.querySelector("#fcAvgBody"),
  fcSettlementBody: document.querySelector("#fcSettlementBody"),
  trendSelector: document.querySelector("#trendSelector"),
  cargoDetailPage: document.querySelector("#cargoDetailPage"),
  cdpBackButton: document.querySelector("#cdpBackButton"),
  cdpTitle: document.querySelector("#cdpTitle"),
  cdpSubtitle: document.querySelector("#cdpSubtitle"),
  cdpCargoInfo: document.querySelector("#cdpCargoInfo"),
  cdpRefTitle: document.querySelector("#cdpRefTitle"),
  cdpRefPeriodLabel: document.querySelector("#cdpRefPeriodLabel"),
  cdpRefTableContainer: document.querySelector("#cdpRefTableContainer"),
  cdpSensitivityBody: document.querySelector("#cdpSensitivityBody"),
  cdpJudgmentSavedAt: document.querySelector("#cdpJudgmentSavedAt"),
  cdpDirectionGroup: document.querySelector("#cdpDirectionGroup"),
  cdpActionGroup: document.querySelector("#cdpActionGroup"),
  cdpTargetSettlement: document.querySelector("#cdpTargetSettlement"),
  cdpNote: document.querySelector("#cdpNote"),
  cdpSaveJudgment: document.querySelector("#cdpSaveJudgment"),
  forecastChart: document.querySelector("#ici3ForecastChart"),
  addForecastWeekButton: document.querySelector("#addForecastWeekButton"),
  saveForecastButton: document.querySelector("#saveForecastButton"),
  forecastStatus: document.querySelector("#forecastStatus"),
  summarySubtitle: document.querySelector("#summarySubtitle"),
  analyticsYearLabel: document.querySelector("#analyticsYearLabel"),
  analyticsPrevYear: document.querySelector("#analyticsPrevYear"),
  analyticsNextYear: document.querySelector("#analyticsNextYear"),
  analyticsKpiGrid: document.querySelector("#analyticsKpiGrid"),
  targetProgress: document.querySelector("#targetProgress"),
  reexportTrade: document.querySelector("#reexportTrade"),
  analyticsFilterChips: document.querySelector("#analyticsFilterChips"),
  monthlyTrendChart: document.querySelector("#monthlyTrendChart"),
  mineVolumeChart: document.querySelector("#mineVolumeChart"),
  buyerVolumeChart: document.querySelector("#buyerVolumeChart"),
  heatMixChart: document.querySelector("#heatMixChart"),

  typeMixLegend: document.querySelector("#typeMixLegend"),
  mineSummaryRows: document.querySelector("#mineSummaryRows"),
  buyerSummaryRows: document.querySelector("#buyerSummaryRows"),
  typeSummaryRows: document.querySelector("#typeSummaryRows"),
  heatSummaryRows: document.querySelector("#heatSummaryRows"),
  mineTableWrap: document.querySelector("#mineTableWrap"),
  buyerTableWrap: document.querySelector("#buyerTableWrap"),
  heatTableWrap: document.querySelector("#heatTableWrap"),
  mineTableToggle: document.querySelector("#mineTableToggle"),
  buyerTableToggle: document.querySelector("#buyerTableToggle"),
  heatTableToggle: document.querySelector("#heatTableToggle"),
  fixedPriceTrendChart: document.querySelector("#fixedPriceTrendChart"),
  heatBuyerMatrix: document.querySelector("#heatBuyerMatrix"),

  updateIciButton: document.querySelector("#updateIciButton"),
  cargoRows: document.querySelector("#cargoRows"),
  cargoDetail: document.querySelector("#cargoDetail"),
  detailSubhead: document.querySelector("#detailSubhead"),
  tableCount: document.querySelector("#tableCount"),
  tableSubtitle: document.querySelector("#tableSubtitle"),
  marketSubtitle: document.querySelector("#marketSubtitle"),
  cargoModal: document.querySelector("#cargoModal"),
  cargoForm: document.querySelector("#cargoForm"),
  modalTitle: document.querySelector("#modalTitle"),
  closeModalButton: document.querySelector("#closeModalButton"),
  cancelModalButton: document.querySelector("#cancelModalButton"),
  deleteCargoButton: document.querySelector("#deleteCargoButton"),
  saveStatus: document.querySelector("#saveStatus"),
  iciModal: document.querySelector("#iciModal"),
  iciForm: document.querySelector("#iciForm"),
  closeIciModalButton: document.querySelector("#closeIciModalButton"),
  cancelIciModalButton: document.querySelector("#cancelIciModalButton"),
  iciSaveStatus: document.querySelector("#iciSaveStatus"),
  ici: {
    date: document.querySelector("#iciDate"),
    ici1: document.querySelector("#ici1Input"),
    ici2: document.querySelector("#ici2Input"),
    ici3: document.querySelector("#ici3Input"),
    ici4: document.querySelector("#ici4Input"),
    ici5: document.querySelector("#ici5Input"),
  },
  form: {
    id: document.querySelector("#cargoIdField"),
    year: document.querySelector("#formYear"),
    month: document.querySelector("#formMonth"),
    status: document.querySelector("#formStatus"),
    type: document.querySelector("#formType"),
    mine: document.querySelector("#formMine"),
    spec: document.querySelector("#formSpec"),
    quantity: document.querySelector("#formQuantity"),
    fixedPrice: document.querySelector("#formFixedPrice"),
    formula: document.querySelector("#formFormula"),
    indexRule: document.querySelector("#formIndexRule"),
    buyer: document.querySelector("#formBuyer"),
    laycanStart: document.querySelector("#formLaycanStart"),
    laycanEnd: document.querySelector("#formLaycanEnd"),
    laycanConfirmed: document.querySelector("#formLaycanConfirmed"),
    purchaseDate: document.querySelector("#formPurchaseDate"),
    specialTerms: document.querySelector("#formSpecialTerms"),
    salesRemark: document.querySelector("#formSalesRemark"),
    notes: document.querySelector("#formNotes"),
  },
};

function readLocalData() {
  try {
    const saved = localStorage.getItem("coaltrack_shared_data");
    if (saved) return JSON.parse(saved);
  } catch {
    localStorage.removeItem("coaltrack_shared_data");
  }
  return window.CPT_DATA;
}

async function loadSharedData(options = {}) {
  try {
    const response = await fetch("/api/data", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const nextData = await response.json();
    const changed = !apiState.available || nextData.generatedAt !== apiState.lastGeneratedAt;
    apiState.available = true;
    apiState.lastGeneratedAt = nextData.generatedAt || "";
    if (els.importStatus?.textContent === "Shared service offline") {
      els.importStatus.textContent = "";
    }
    if (options.silent && els.cargoModal && !els.cargoModal.hidden) {
      refreshFormSaveMode();
      return;
    }
    if (changed || !options.silent) {
      data = nextData;
      state.ici3ForecastRows = null;
      localStorage.setItem("coaltrack_shared_data", JSON.stringify(data));
      renderAll();
    }
    refreshFormSaveMode();
  } catch {
    apiState.available = false;
    refreshFormSaveMode();
  }
}

async function persistData() {
  data.generatedAt = new Date().toISOString();
  localStorage.setItem("coaltrack_shared_data", JSON.stringify(data));
  if (!apiState.available) return { mode: "local" };
  const response = await fetch("/api/data", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Save failed: HTTP ${response.status}`);
  data = await response.json();
  state.ici3ForecastRows = null;
  apiState.lastGeneratedAt = data.generatedAt || "";
  localStorage.setItem("coaltrack_shared_data", JSON.stringify(data));
  return { mode: "shared" };
}

async function importExcelFile(file) {
  if (!file) return;
  if (!apiState.available) await loadSharedData({ silent: true });
  if (!apiState.available) {
    els.importStatus.textContent = "Shared service offline";
    return;
  }

  els.importExcelButton.disabled = true;
  els.importStatus.textContent = "Importing...";

  try {
    const body = await file.arrayBuffer();
    const response = await fetch(`/api/import-excel?filename=${encodeURIComponent(file.name)}`, {
      method: "POST",
      headers: {
        "Content-Type": file.type || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      body,
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) throw new Error(payload.error || `HTTP ${response.status}`);

    data = payload.data;
    state.ici3ForecastRows = null;
    apiState.available = true;
    apiState.lastGeneratedAt = data.generatedAt || "";
    localStorage.setItem("coaltrack_shared_data", JSON.stringify(data));
    state.selectedId = null;
    renderAll();

    const importedCount = payload.summary?.imported2026 ?? data.cargos.filter((cargo) => cargo.year === 2026).length;
    els.importStatus.textContent = `Imported ${nf0.format(importedCount)} records`;
  } catch (error) {
    els.importStatus.textContent = error.message;
  } finally {
    els.importExcelButton.disabled = false;
  }
}

function formSaveModeText() {
  return apiState.available ? "Shared save enabled" : "Local save only";
}

function refreshFormSaveMode() {
  if (!els.cargoModal || els.cargoModal.hidden || !els.saveStatus) return;
  els.saveStatus.textContent = formSaveModeText();
}

function startSharedRefresh() {
  setInterval(() => loadSharedData({ silent: true }), 10000);
  window.addEventListener("focus", () => loadSharedData({ silent: true }));
}

function nextMonthDefault() {
  const now = new Date();
  const m = now.getMonth() + 2;
  return { year: m > 12 ? now.getFullYear() + 1 : now.getFullYear(), month: m > 12 ? 1 : m };
}

function initialPeriod() {
  const rawHash = window.location.hash.replace(/^#/, "");
  const hashQuery = rawHash.includes("?") ? rawHash.split("?")[1] : rawHash;
  const params = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(hashQuery);
  const monthParam = hashParams.get("month") || params.get("month");
  const def = nextMonthDefault();
  const requestedView = hashParams.get("view") || params.get("view");
  const cargoId = hashParams.get("id") || params.get("id");
  return {
    year: Number(hashParams.get("year") || params.get("year")) || def.year,
    month: monthParam === "total" ? TOTAL_MONTH : Number(monthParam) || def.month,
    view: ["analytics", "forecast", "cargoDetail"].includes(requestedView) ? requestedView : "dashboard",
    initialCargoId: cargoId || null,
  };
}

const initialState = initialPeriod();
const state = {
  ...initialState,
  status: "all",
  type: "all",
  mine: "all",
  buyer: "all",
  search: "",
  chartIndex: "ici3",
  selectedId: initialState.initialCargoId,
  expandedCargoId: null,
  tableExpanded: { mine: false, buyer: false, heat: false },
  analyticsFilters: { mine: null, buyer: null, heat: null },
  ici3ForecastRows: null,
  trendMode: "flat",
  showFcHistory: false,
  priceShift: 0,
  targetProgressFocus: null,
  cdpCargoId: initialState.initialCargoId,
};

const chartHitBoxes = new Map();

function dateFromISO(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function toISO(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 86_400_000);
}

function addMonths(date, months) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, date.getUTCDate()));
}

function startOfMonth(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function endOfMonth(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));
}

function startOfWeekMonday(date) {
  const day = date.getUTCDay();
  const diff = (day + 6) % 7;
  return addDays(date, -diff);
}

function endOfWeekMonday(date) {
  return addDays(startOfWeekMonday(date), 6);
}

function sameOrBetween(date, start, end) {
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
}

function formatDate(value) {
  const date = typeof value === "string" ? dateFromISO(value) : value;
  return `${monthNames[date.getUTCMonth()]} ${String(date.getUTCDate()).padStart(2, "0")}, ${date.getUTCFullYear()}`;
}

function formatShortDate(value) {
  const date = typeof value === "string" ? dateFromISO(value) : value;
  return `${monthNames[date.getUTCMonth()]} ${String(date.getUTCDate()).padStart(2, "0")}`;
}

function monthEndIso(year, month) {
  return toISO(new Date(Date.UTC(year, month, 0)));
}

function labelForStatus(status) {
  return { sold: "Sold", forsale: "For Sale", planned: "Planned" }[status] ?? "All";
}

function labelForType(type) {
  return { fixed: "Fixed", index: "Index" }[type] ?? "All";
}

function periodCargos() {
  if (state.month === TOTAL_MONTH) return yearCargos();
  return data.cargos.filter((cargo) => cargo.year === state.year && cargo.month === state.month);
}

function yearCargos() {
  return data.cargos.filter((cargo) => cargo.year === state.year);
}

function filteredCargos() {
  const q = state.search.trim().toLowerCase();
  const statusOrder = { forsale: 0, planned: 1, sold: 2 };
  return periodCargos()
    .filter((cargo) => {
      const statusOk = state.status === "all" || cargo.status === state.status;
      const typeOk = state.type === "all" || cargo.purchaseType === state.type;
      const mineOk = state.mine === "all" || cargo.mine === state.mine;
      const buyerOk = state.buyer === "all" || (cargo.buyer || "") === state.buyer;
      const text = [
        cargo.id,
        cargo.mine,
        cargo.spec,
        cargo.buyer || "",
        cargo.notes || "",
        cargo.priceFormula || "",
        cargo.indexRule || "",
        cargo.purchaseType,
        labelForStatus(cargo.status),
        heatLabelForSpec(cargo.spec),
        cargo.purchaseDate,
        cargo.laycanStart,
        cargo.laycanEnd,
      ]
        .join(" ")
        .toLowerCase();
      return statusOk && typeOk && mineOk && buyerOk && (!q || text.includes(q));
    })
    .sort(
      (a, b) =>
        (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9) ||
        dateFromISO(a.laycanStart) - dateFromISO(b.laycanStart) ||
        a.mine.localeCompare(b.mine),
    );
}

function sumQty(items) {
  return items.reduce((sum, cargo) => sum + cargo.quantityMt, 0);
}

function summarizeBy(items, keyFn) {
  const totalQty = sumQty(items) || 1;
  const grouped = new Map();
  items.forEach((cargo) => {
    const key = keyFn(cargo) || "Unassigned";
    const item = grouped.get(key) || { label: key, quantityMt: 0, count: 0 };
    item.quantityMt += cargo.quantityMt;
    item.count += 1;
    grouped.set(key, item);
  });
  return [...grouped.values()]
    .map((item) => ({ ...item, share: item.quantityMt / totalQty }))
    .sort((a, b) => b.quantityMt - a.quantityMt || a.label.localeCompare(b.label));
}

function renderSummaryRows(rows, options = {}) {
  if (!rows.length) {
    return `<tr><td colspan="4" class="empty-cell">No cargo data</td></tr>`;
  }
  const limit = options.expanded ? rows.length : (options.visibleRows ?? 5);
  const filterAttr = options.filterKey ? `data-analytics-filter="${options.filterKey}"` : "";
  return rows
    .slice(0, limit)
    .map(
      (row) => `
        <tr ${filterAttr} data-filter-value="${row.label}" class="${options.activeValue === row.label ? "is-active-filter" : ""}">
          <td><strong>${row.label}</strong></td>
          <td class="numeric">${formatQuantity(row.quantityMt)}</td>
          <td>${row.count}</td>
          <td>${nf2.format(row.share * 100)}%</td>
        </tr>
      `,
    )
    .join("");
}

function renderCollapsibleTable(rows, type, label, body, wrap, toggle) {
  const expanded = state.tableExpanded[type];
  body.innerHTML = renderSummaryRows(rows, {
    expanded,
    visibleRows: 5,
    filterKey: type,
    activeValue: state.analyticsFilters[type],
  });
  if (!toggle || !wrap) return;
  const canExpand = rows.length > 5;
  toggle.hidden = !canExpand;
  toggle.textContent = expanded ? "Collapse ▲" : `Show all ${rows.length} ${label} ▼`;
  wrap.classList.toggle("is-expanded", expanded);
}

function applyAnalyticsFilters(cargos) {
  return cargos.filter((cargo) => {
    const mineOk = !state.analyticsFilters.mine || cargo.mine === state.analyticsFilters.mine;
    const buyerOk = !state.analyticsFilters.buyer || buyerLabel(cargo) === state.analyticsFilters.buyer;
    const heatOk = !state.analyticsFilters.heat || heatLabelForSpec(cargo.spec) === state.analyticsFilters.heat;
    return mineOk && buyerOk && heatOk;
  });
}

function toggleAnalyticsFilter(type, value) {
  state.analyticsFilters[type] = state.analyticsFilters[type] === value ? null : value;
  renderPortfolioSummary();
}

function clearAnalyticsFilter(type) {
  state.analyticsFilters[type] = null;
  renderPortfolioSummary();
}

function renderAnalyticsFilterChips() {
  const chips = Object.entries(state.analyticsFilters).filter(([, value]) => value);
  els.analyticsFilterChips.innerHTML = chips
    .map(([type, value]) => `<button class="filter-chip" data-clear-analytics-filter="${type}" type="button">Filtered: ${type[0].toUpperCase() + type.slice(1)} = ${value} <span>×</span></button>`)
    .join("");
  document.querySelectorAll("[data-clear-analytics-filter]").forEach((button) => {
    button.addEventListener("click", () => clearAnalyticsFilter(button.dataset.clearAnalyticsFilter));
  });
}

function bindAnalyticsTableFilters() {
  document.querySelectorAll("[data-analytics-filter]").forEach((row) => {
    row.addEventListener("click", () => toggleAnalyticsFilter(row.dataset.analyticsFilter, row.dataset.filterValue));
  });
}

const chartPalette = ["#003b73", "#0077b6", "#00a6d6", "#f59e0b", "#22c55e", "#2563eb", "#64748b", "#dc2626", "#14b8a6", "#7c3aed"];
const statusColors = { sold: "#22c55e", forsale: "#f59e0b", planned: "#2563eb" };
const typeColors = { Fixed: "#003b73", Index: "#00a6d6" };

function formatPercent(value) {
  return `${nf2.format(value * 100)}%`;
}

function formatPct1(value) {
  return `${nf1.format((value || 0) * 100)}%`;
}

function formatMn(value) {
  return `${nf2.format((value || 0) / 1_000_000)} mn t`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatQuantity(value) {
  return `${nf0.format(value || 0)} MT`;
}

function formatManTon(value) {
  const manTon = value / 10_000;
  const hasDecimal = Math.abs(manTon - Math.round(manTon)) > 0.001;
  return `${manTon.toLocaleString("ko-KR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: hasDecimal ? 1 : 0,
  })}만톤`;
}

function formatQuantitySub(value, count = null) {
  const cargoText = count == null ? "" : ` · ${count} cargo${count === 1 ? "" : "s"}`;
  return `${formatManTon(value || 0)}${cargoText}`;
}

function formatPricePerTon(value) {
  return Number.isFinite(value) ? `$${nf2.format(value)}/t` : "N/A";
}

function formatSignedPricePerTon(value) {
  if (!Number.isFinite(value)) return "N/A";
  return `${value >= 0 ? "+" : "-"}$${nf2.format(Math.abs(value))}/t`;
}

function deltaInfo(current, previous, contextLabel, options = {}) {
  if (options.noPrior || !Number.isFinite(previous)) {
    return { className: "neutral", text: options.firstLabel || "— no prior data" };
  }
  if (previous === 0) {
    if (Math.abs(current) < 0.0001) return { className: "neutral", text: `— vs ${contextLabel}` };
    const formatted = options.absoluteFormatter ? options.absoluteFormatter(current) : nf0.format(current);
    return { className: current > 0 ? "positive" : "negative", text: `${current > 0 ? "▲ +" : "▼ -"}${formatted} vs ${contextLabel}` };
  }
  const diff = current - previous;
  if (Math.abs(diff) < 0.0001) return { className: "neutral", text: `— vs ${contextLabel}` };
  const pct = (diff / previous) * 100;
  return {
    className: diff > 0 ? "positive" : "negative",
    text: `${diff > 0 ? "▲" : "▼"} ${diff > 0 ? "+" : ""}${nf2.format(pct)}% vs ${contextLabel}`,
  };
}

function renderDelta(delta) {
  if (!delta) return "";
  return `<span class="delta-line ${delta.className}">${delta.text}</span>`;
}

function deltaInfoPp(currentShare, priorShare, contextLabel, noPrior = false) {
  if (noPrior || !Number.isFinite(priorShare) || !Number.isFinite(currentShare)) {
    return { className: "neutral", text: "— no prior data" };
  }
  const pp = (currentShare - priorShare) * 100;
  if (Math.abs(pp) < 0.05) return { className: "neutral", text: `— vs ${contextLabel}` };
  return {
    className: pp > 0 ? "positive" : "negative",
    text: `${pp > 0 ? "▲ +" : "▼ "}${nf2.format(Math.abs(pp))}p vs ${contextLabel}`,
  };
}

function weightedAverageHeat(cargos) {
  const heatRows = cargos
    .map((cargo) => ({ heat: extractHeatValue(cargo.spec), qty: cargo.quantityMt }))
    .filter((row) => Number.isFinite(row.heat) && row.qty > 0);
  const total = heatRows.reduce((sum, row) => sum + row.qty, 0);
  if (!total) return null;
  return heatRows.reduce((sum, row) => sum + row.heat * row.qty, 0) / total;
}

function buyerLabel(cargo) {
  return cargo.buyer?.trim() || "Unsold / Unlocked";
}

function heatLabelForSpec(spec) {
  const normalized = String(spec || "").toUpperCase().replace(/\s+/g, " ").trim();
  const match = normalized.match(/\b(GAR|NAR)\s*(\d{3,4})\b/);
  if (match) return `${match[1]}${match[2]}`;
  const fallback = normalized.match(/(\d{3,4})/);
  return fallback ? `HEAT${fallback[1]}` : "Unknown";
}

function heatSortValue(label) {
  const number = Number(String(label).match(/\d{3,4}/)?.[0] ?? 0);
  const basisRank = label.startsWith("NAR") ? 0 : label.startsWith("GAR") ? 1 : 2;
  return number * 10 - basisRank;
}

function canvasContext(canvas, minHeight = 260) {
  if (!canvas) return null;
  const parent = canvas.parentElement;
  const rect = parent.getBoundingClientRect();
  if (rect.width < 20 || rect.height < 20) return null;
  const dpr = window.devicePixelRatio || 1;
  const width = rect.width;
  const height = Math.max(rect.height, minHeight);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fbfcfd";
  ctx.fillRect(0, 0, width, height);
  ctx.font = "12px Inter, Microsoft YaHei, sans-serif";
  return { ctx, width, height };
}

function drawEmptyChart(canvas, label = "No cargo data") {
  const box = canvasContext(canvas);
  if (!box) return;
  const { ctx, width, height } = box;
  ctx.fillStyle = "#64748b";
  ctx.textAlign = "center";
  ctx.fillText(label, width / 2, height / 2);
  ctx.textAlign = "left";
}

function drawDonutChart(canvas, rows, colors, centerLabel) {
  const box = canvasContext(canvas, 120);
  if (!box) return;
  const { ctx, width, height } = box;
  const total = rows.reduce((sum, row) => sum + row.quantityMt, 0);
  if (!total) {
    drawEmptyChart(canvas);
    return;
  }

  const radius = Math.min(width, height) * 0.30;
  const cx = width / 2;
  const cy = height / 2;
  const lineWidth = Math.max(18, radius * 0.28);
  let start = -Math.PI / 2;

  rows.forEach((row, index) => {
    const angle = (row.quantityMt / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.strokeStyle = colors[row.label] || chartPalette[index % chartPalette.length];
    ctx.lineWidth = lineWidth;
    ctx.arc(cx, cy, radius, start, start + angle);
    ctx.stroke();
    start += angle;
  });

  ctx.fillStyle = "#0f172a";
  ctx.font = "700 20px Inter, Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(nf0.format(total), cx, cy - 2);
  ctx.fillStyle = "#64748b";
  ctx.font = "11px Inter, Microsoft YaHei, sans-serif";
  ctx.fillText(centerLabel, cx, cy + 14);
  ctx.textAlign = "left";
}

function drawHorizontalBarChart(canvas, rows, options = {}) {
  const box = canvasContext(canvas, 160);
  if (!box) return;
  const { ctx, width, height } = box;
  const visibleRows = rows.slice(0, options.limit ?? 10);
  const hitBoxes = [];
  if (!visibleRows.length) {
    drawEmptyChart(canvas);
    chartHitBoxes.set(canvas.id, hitBoxes);
    return;
  }

  const pad = { top: 16, right: 22, bottom: 20, left: 118 };
  const max = Math.max(...visibleRows.map((row) => row.quantityMt), 1);
  const rowHeight = (height - pad.top - pad.bottom) / visibleRows.length;

  ctx.strokeStyle = "#e2e8f0";
  ctx.fillStyle = "#64748b";
  ctx.font = "12px Inter, Microsoft YaHei, sans-serif";

  visibleRows.forEach((row, index) => {
    const y = pad.top + index * rowHeight + rowHeight * 0.2;
    const barHeight = Math.max(12, rowHeight * 0.48);
    const barWidth = ((width - pad.left - pad.right) * row.quantityMt) / max;
    const color = options.colors?.[row.label] || chartPalette[index % chartPalette.length];
    const isDimmed = options.activeValue && row.label !== options.activeValue;

    ctx.globalAlpha = isDimmed ? 0.3 : 1;
    ctx.fillStyle = "#0f172a";
    ctx.font = "700 12px Inter, Microsoft YaHei, sans-serif";
    ctx.fillText(row.label.length > 16 ? `${row.label.slice(0, 15)}...` : row.label, 12, y + barHeight - 2);

    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(pad.left, y, width - pad.left - pad.right, barHeight);
    ctx.fillStyle = color;
    ctx.fillRect(pad.left, y, Math.max(barWidth, 3), barHeight);

    ctx.fillStyle = "#64748b";
    ctx.font = "12px Inter, Microsoft YaHei, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`${nf0.format(row.quantityMt)} · ${formatPercent(row.share)}`, width - 8, y + barHeight - 2);
    ctx.textAlign = "left";
    ctx.globalAlpha = 1;
    hitBoxes.push({ x: 0, y: y - 4, width, height: barHeight + 8, value: row.label, filterKey: options.filterKey });
  });
  chartHitBoxes.set(canvas.id, hitBoxes);
}

function drawMonthlyTrendChart(canvas, cargos) {
  const box = canvasContext(canvas, 320);
  if (!box) return;
  const { ctx, width, height } = box;
  const statuses = ["sold", "forsale", "planned"];
  const statusLabels = { sold: "Sold", forsale: "For Sale", planned: "Planned" };
  const months = monthNames.map((name, index) => {
    const month = index + 1;
    const parts = Object.fromEntries(statuses.map((status) => [status, sumQty(cargos.filter((cargo) => cargo.month === month && cargo.status === status))]));
    return { name, total: statuses.reduce((sum, status) => sum + parts[status], 0), parts };
  });
  const max = Math.max(...months.map((row) => row.total), 1);
  const pad = { top: 18, right: 20, bottom: 42, left: 58 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const xStep = chartW / months.length;
  const barW = Math.max(16, Math.min(42, xStep * 0.62));
  const y = (value) => pad.top + chartH - (value / max) * chartH;

  ctx.strokeStyle = "#e2e8f0";
  ctx.fillStyle = "#64748b";
  ctx.font = "12px Inter, Microsoft YaHei, sans-serif";
  for (let i = 0; i <= 4; i += 1) {
    const value = (max / 4) * i;
    const yy = y(value);
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(width - pad.right, yy);
    ctx.stroke();
    ctx.fillText(nf0.format(value), 8, yy + 4);
  }

  months.forEach((row, index) => {
    const x = pad.left + index * xStep + (xStep - barW) / 2;
    let top = pad.top + chartH;
    statuses.forEach((status) => {
      const h = (row.parts[status] / max) * chartH;
      if (h > 0) {
        ctx.fillStyle = statusColors[status];
        ctx.fillRect(x, top - h, barW, h);
        top -= h;
      }
    });
    ctx.fillStyle = "#64748b";
    ctx.textAlign = "center";
    ctx.fillText(row.name, x + barW / 2, height - 14);
  });

  let lx = pad.left;
  statuses.forEach((status) => {
    ctx.fillStyle = statusColors[status];
    ctx.fillRect(lx, 8, 10, 10);
    ctx.fillStyle = "#64748b";
    ctx.textAlign = "left";
    ctx.fillText(statusLabels[status], lx + 15, 17);
    lx += statusLabels[status].length * 8 + 42;
  });
  ctx.textAlign = "left";
}

function estimateIndexWithLatest(cargo) {
  const parsed = parseFormula(cargo.priceFormula || "");
  const latest = latestIndices();
  if (!parsed || !latest) return null;
  return estimateIndexWithAverages(cargo, parsed, {
    avgIci2: latest.ici2,
    avgIci3: latest.ici3,
    avgIci4: latest.ici4,
    avgIci5: latest.ici5,
  });
}

function estimateIndexWithAverages(cargo, parsed, averages) {
  const formulaPrice = parsed.expression(averages);
  const heatValue = extractHeatValue(cargo.spec);
  const benchmark = heatBenchmarks[parsed.ici];
  const offset = parsed.offset ?? 0;
  const applyHeatAdjustment = isProrateFormula(cargo.priceFormula || "") && heatValue && benchmark && heatValue !== benchmark;
  if (!applyHeatAdjustment) return formulaPrice;
  return ((formulaPrice - offset) / benchmark) * heatValue + offset;
}

function monthlyWeightedAverage(cargos, priceGetter) {
  const byMonth = Array.from({ length: 12 }, (_, index) => ({ month: index + 1, qty: 0, value: 0 }));
  cargos.forEach((cargo) => {
    const price = priceGetter(cargo);
    if (!Number.isFinite(price)) return;
    const row = byMonth[cargo.month - 1];
    row.qty += cargo.quantityMt;
    row.value += price * cargo.quantityMt;
  });
  return byMonth.map((row) => ({ ...row, avg: row.qty ? row.value / row.qty : null }));
}

function drawLineChart(canvas, series, options = {}) {
  const box = canvasContext(canvas, 320);
  if (!box) return;
  const { ctx, width, height } = box;
  const allValues = series.flatMap((item) => item.points.map((point) => point.value).filter((value) => Number.isFinite(value)));
  if (!allValues.length) {
    drawEmptyChart(canvas, "No fixed price trend data");
    return;
  }
  const pad = { top: 26, right: 28, bottom: 42, left: 58 };
  const min = Math.floor(Math.min(...allValues) / 10) * 10;
  const max = Math.ceil(Math.max(...allValues) / 10) * 10;
  const x = (month) => pad.left + ((month - 1) / 11) * (width - pad.left - pad.right);
  const y = (value) => pad.top + ((max - value) / Math.max(max - min, 1)) * (height - pad.top - pad.bottom);

  ctx.strokeStyle = "#d7e7f0";
  ctx.fillStyle = "#526b82";
  ctx.font = "12px Inter, Microsoft YaHei, sans-serif";
  for (let i = 0; i <= 4; i += 1) {
    const value = min + ((max - min) / 4) * i;
    const yy = y(value);
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(width - pad.right, yy);
    ctx.stroke();
    ctx.fillText(nf0.format(value), 8, yy + 4);
  }
  monthNames.forEach((name, index) => {
    ctx.fillText(name, x(index + 1) - 10, height - 14);
  });

  series.forEach((item, index) => {
    const color = chartPalette[index % chartPalette.length];
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    item.points.forEach((point) => {
      if (!Number.isFinite(point.value)) return;
      const xx = x(point.month);
      const yy = y(point.value);
      if (!started) {
        ctx.moveTo(xx, yy);
        started = true;
      } else {
        ctx.lineTo(xx, yy);
      }
    });
    ctx.stroke();
    item.points.forEach((point) => {
      if (!Number.isFinite(point.value)) return;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x(point.month), y(point.value), 3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = color;
    ctx.fillText(item.label, pad.left + index * 92, 15);
  });
}

function drawGroupedBarChart(canvas, rows) {
  const box = canvasContext(canvas, 320);
  if (!box) return;
  const { ctx, width, height } = box;
  if (!rows.some((row) => Number.isFinite(row.fixed) || Number.isFinite(row.index))) {
    drawEmptyChart(canvas, "No comparable fixed/index data");
    return;
  }
  const pad = { top: 24, right: 24, bottom: 42, left: 58 };
  const values = rows.flatMap((row) => [row.fixed, row.index]).filter((value) => Number.isFinite(value));
  const max = Math.ceil(Math.max(...values, 1) / 10) * 10;
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const step = chartW / rows.length;
  const barW = Math.min(18, step * 0.28);
  const y = (value) => pad.top + chartH - (value / max) * chartH;

  ctx.strokeStyle = "#d7e7f0";
  ctx.fillStyle = "#526b82";
  ctx.font = "12px Inter, Microsoft YaHei, sans-serif";
  for (let i = 0; i <= 4; i += 1) {
    const value = (max / 4) * i;
    const yy = y(value);
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(width - pad.right, yy);
    ctx.stroke();
    ctx.fillText(nf0.format(value), 8, yy + 4);
  }
  rows.forEach((row, index) => {
    const cx = pad.left + index * step + step / 2;
    if (Number.isFinite(row.fixed)) {
      ctx.fillStyle = "#1E40AF";
      ctx.fillRect(cx - barW - 2, y(row.fixed), barW, pad.top + chartH - y(row.fixed));
    }
    if (Number.isFinite(row.index)) {
      ctx.fillStyle = "#0891B2";
      ctx.fillRect(cx + 2, y(row.index), barW, pad.top + chartH - y(row.index));
    }
    ctx.fillStyle = "#526b82";
    ctx.textAlign = "center";
    ctx.fillText(row.monthName, cx, height - 14);
  });
  ctx.textAlign = "left";
  ctx.fillStyle = "#1E40AF";
  ctx.fillRect(pad.left, 9, 10, 10);
  ctx.fillStyle = "#526b82";
  ctx.fillText("Fixed", pad.left + 15, 18);
  ctx.fillStyle = "#0891B2";
  ctx.fillRect(pad.left + 70, 9, 10, 10);
  ctx.fillStyle = "#526b82";
  ctx.fillText("Index", pad.left + 85, 18);
}

function renderLegend(container, rows, colors) {
  if (!container) return;
  const total = rows.reduce((sum, row) => sum + row.quantityMt, 0) || 1;
  container.innerHTML = rows
    .map((row, index) => {
      const color = colors[row.label] || chartPalette[index % chartPalette.length];
      return `
        <span class="legend-item">
          <span class="legend-dot" style="background:${color}"></span>
          <strong>${row.label}</strong>
          <em>${formatPercent(row.quantityMt / total)}</em>
        </span>
      `;
    })
    .join("");
}

function renderAnalyticsKpis(ytdCargos, priorYtdCargos, ytdLabel, ytdMonth, isCurrentYear) {
  const noPrior = !priorYtdCargos.length;
  const total = sumQty(ytdCargos);
  const indexQty = sumQty(ytdCargos.filter((c) => c.purchaseType === "index"));
  const soldQty = sumQty(ytdCargos.filter((c) => c.status === "sold"));
  const unsoldQty = sumQty(ytdCargos.filter((c) => c.status !== "sold"));
  const priorTotal = sumQty(priorYtdCargos);
  const priorIndexQty = sumQty(priorYtdCargos.filter((c) => c.purchaseType === "index"));
  const priorSoldQty = sumQty(priorYtdCargos.filter((c) => c.status === "sold"));
  const priorUnsoldQty = sumQty(priorYtdCargos.filter((c) => c.status !== "sold"));
  const indexShare = total ? indexQty / total : 0;
  const soldShare = total ? soldQty / total : 0;
  const unsoldShare = total ? unsoldQty / total : 0;
  const priorIndexShare = priorTotal ? priorIndexQty / priorTotal : 0;
  const priorSoldShare = priorTotal ? priorSoldQty / priorTotal : 0;
  const priorUnsoldShare = priorTotal ? priorUnsoldQty / priorTotal : 0;
  const cards = [
    {
      label: "Total Procured",
      value: formatMn(total),
      delta: `${ytdCargos.length} cargos · portfolio total`,
      trend: deltaInfo(total, priorTotal, ytdLabel, {
        firstLabel: "— first year",
        noPrior,
        absoluteFormatter: (v) => `${nf0.format(v)} MT`,
      }),
    },
    {
      label: "Sold",
      value: formatMn(soldQty),
      delta: `${formatPct1(soldShare)} allocated`,
      trend: deltaInfo(soldQty, priorSoldQty, ytdLabel, {
        firstLabel: "— first year",
        noPrior,
        absoluteFormatter: (v) => `${nf0.format(v)} MT`,
      }),
    },
    {
      label: "Index-linked",
      value: formatMn(indexQty),
      delta: `${formatPct1(indexShare)} index share`,
      trend: deltaInfoPp(indexShare, priorIndexShare, ytdLabel, noPrior),
    },
    {
      label: "Unsold",
      value: formatMn(unsoldQty),
      delta: `${formatPct1(unsoldShare)} exposure`,
      trend: deltaInfoPp(unsoldShare, priorUnsoldShare, ytdLabel, noPrior),
    },
  ];

  els.analyticsKpiGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="kpi-card">
          <p>${card.label}</p>
          <strong>${card.value}</strong>
          <span class="delta">${card.delta}</span>
          ${renderDelta(card.trend)}
        </article>
      `,
    )
    .join("");
}

function isRussianCoal(cargo) {
  return String(cargo.mine || "").toLowerCase().replace(/[^a-z0-9]/g, "") === "cpro";
}

function targetCargoFilter(key) {
  if (key === "indonesia") return (cargo) => !isRussianCoal(cargo);
  if (key === "russia") return isRussianCoal;
  return () => true;
}

function targetMonthlyRows(cargos, row) {
  const filter = targetCargoFilter(row.key);
  const monthlyTarget = row.target / 12;
  let cumulative = 0;
  return monthNames.map((monthName, index) => {
    const month = index + 1;
    const actual = sumQty(cargos.filter((cargo) => cargo.month === month && filter(cargo)));
    cumulative += actual;
    return {
      month,
      monthName,
      target: monthlyTarget,
      actual,
      completion: monthlyTarget ? actual / monthlyTarget : 0,
      cumulative,
      cumulativeTarget: monthlyTarget * month,
    };
  });
}

function renderTargetMonthlyBreakdown(cargos, row) {
  const monthlyRows = targetMonthlyRows(cargos, row);
  const monthlyTarget = row.target / 12;
  const maxMonthly = Math.max(monthlyTarget, ...monthlyRows.map((item) => item.actual), 1);

  return `
    <section class="target-monthly-breakdown">
      <div class="target-breakdown-head">
        <div>
          <h3>${row.label} Monthly Target</h3>
          <p>Annual target ${formatQuantity(row.target)} ÷ 12 months = ${formatQuantity(Math.round(monthlyTarget))} / month</p>
        </div>
        <button class="target-collapse-button" type="button" data-target-close>Collapse ▲</button>
      </div>
      <div class="target-monthly-table">
        <div class="target-monthly-header">
          <span>Month</span>
          <span>Monthly Target</span>
          <span>Completed</span>
          <span>Completion</span>
          <span>Cumulative</span>
        </div>
        ${monthlyRows
          .map((item) => {
            const width = Math.min((item.actual / maxMonthly) * 100, 100);
            const cumulativePct = item.cumulativeTarget ? item.cumulative / item.cumulativeTarget : 0;
            return `
              <div class="target-monthly-row">
                <strong>${item.monthName}</strong>
                <span>${formatQuantity(Math.round(item.target))}</span>
                <span class="target-monthly-actual">
                  <em style="width:${width}%"></em>
                  <b>${formatQuantity(item.actual)}</b>
                </span>
                <span>${formatPct1(item.completion)}</span>
                <span>${formatQuantity(item.cumulative)} · ${formatPct1(cumulativePct)}</span>
              </div>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderTargetProgress(cargos) {
  if (!els.targetProgress) return;
  const rows = [
    {
      key: "indonesia",
      label: "Indonesia Coal",
      target: 13_000_000,
      current: sumQty(cargos.filter((cargo) => !isRussianCoal(cargo))),
      note: "All mines except C-Pro",
    },
    {
      key: "russia",
      label: "Russian Coal",
      target: 7_000_000,
      current: sumQty(cargos.filter(isRussianCoal)),
      note: "C-Pro only",
    },
  ];
  const totalRow = {
    key: "total",
    label: "Total Target",
    target: rows.reduce((sum, row) => sum + row.target, 0),
    current: rows.reduce((sum, row) => sum + row.current, 0),
    note: "Indonesia + Russian coal",
  };
  const allRows = [totalRow, ...rows];
  const activeRow = allRows.find((row) => row.key === state.targetProgressFocus);

  els.targetProgress.innerHTML = allRows
    .map((row) => {
      const remaining = Math.max(row.target - row.current, 0);
      const progress = row.target ? row.current / row.target : 0;
      const pct = Math.min(progress, 1) * 100;
      const isTotal = row.label === "Total Target";
      const isActive = row.key === state.targetProgressFocus;
      return `
        <article class="target-progress-item ${isTotal ? "is-total" : ""} ${isActive ? "is-active" : ""}" data-target-progress="${row.key}" role="button" tabindex="0" aria-expanded="${isActive}">
          <div class="target-progress-head">
            <div>
              <p>${row.label}</p>
              <strong>${formatPct1(progress)}</strong>
            </div>
            <span>${formatMn(row.current)} / ${formatMn(row.target)} · Need ${formatMn(remaining)}</span>
          </div>
          <div class="progress-track" aria-label="${row.label} progress">
            <div class="progress-fill" style="width:${pct}%"></div>
          </div>
        </article>
      `;
    })
    .join("") + (activeRow ? renderTargetMonthlyBreakdown(cargos, activeRow) : "");

  els.targetProgress.querySelectorAll("[data-target-progress]").forEach((card) => {
    const toggle = () => {
      state.targetProgressFocus = state.targetProgressFocus === card.dataset.targetProgress ? null : card.dataset.targetProgress;
      renderTargetProgress(cargos);
    };
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
  });
  els.targetProgress.querySelector("[data-target-close]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    state.targetProgressFocus = null;
    renderTargetProgress(cargos);
  });
}

const reexportBuyerList = ["GDG", "XFR", "BARY", "VISA", "ADANI", "BULK", "ENR"];
const reexportBuyers = new Set(reexportBuyerList);

function normalizedBuyer(value) {
  return String(value || "").trim().toUpperCase();
}

function isReexportTrade(cargo) {
  return reexportBuyers.has(normalizedBuyer(cargo.buyer));
}

function renderReexportTrade(cargos) {
  if (!els.reexportTrade) return;
  const rows = cargos.filter(isReexportTrade);
  const totalVolume = sumQty(cargos);
  const reexportVolume = sumQty(rows);
  const byBuyer = reexportBuyerList.map((buyer) => {
    const buyerRows = rows.filter((cargo) => normalizedBuyer(cargo.buyer) === buyer);
    const mines = summarizeBy(buyerRows, (cargo) => cargo.mine)
      .slice(0, 3)
      .map((row) => row.label)
      .join(", ");
    return {
      buyer,
      quantityMt: sumQty(buyerRows),
      count: buyerRows.length,
      share: reexportVolume ? sumQty(buyerRows) / reexportVolume : 0,
      mines: mines || "-",
    };
  });
  const kpis = [
    { label: "Re-export Volume", value: formatQuantity(reexportVolume), delta: `${formatPercent(totalVolume ? reexportVolume / totalVolume : 0)} of 2026 current volume` },
    { label: "Cargo Count", value: nf0.format(rows.length), delta: reexportBuyerList.join(" / ") },
    { label: "Active Buyers", value: nf0.format(byBuyer.filter((row) => row.quantityMt > 0).length), delta: "buyers with current volume" },
  ];

  els.reexportTrade.innerHTML = `
    <div class="reexport-grid">
      <div class="mini-kpi-grid reexport-kpis">
        ${kpis
          .map(
            (card) => `
              <article class="mini-kpi-card">
                <p>${card.label}</p>
                <strong>${card.value}</strong>
                <span>${card.delta}</span>
              </article>
            `,
          )
          .join("")}
      </div>
      <div class="table-wrap compact-table reexport-table">
        <table>
          <thead>
            <tr>
              <th>Buyer</th>
              <th class="numeric">Qty</th>
              <th>Cargos</th>
              <th>Share</th>
              <th>Main Mines</th>
            </tr>
          </thead>
          <tbody>
            ${byBuyer
              .map(
                (row) => `
                  <tr>
                    <td><strong>${row.buyer}</strong></td>
                    <td class="numeric">${formatQuantity(row.quantityMt)}</td>
                    <td>${row.count}</td>
                    <td>${formatPercent(row.share)}</td>
                    <td>${escapeHtml(row.mines)}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function drawAnalyticsCharts(cargos, mineRows, typeRows, statusRows, heatRows) {
  if (els.analyticsPage?.hidden) return;
  const buyerRows = summarizeBy(cargos, buyerLabel);
  drawMonthlyTrendChart(els.monthlyTrendChart, cargos);
  drawHorizontalBarChart(els.mineVolumeChart, mineRows, { filterKey: "mine", activeValue: state.analyticsFilters.mine });
  drawHorizontalBarChart(els.buyerVolumeChart, buyerRows, { filterKey: "buyer", activeValue: state.analyticsFilters.buyer });
  drawHorizontalBarChart(els.heatMixChart, heatRows, { filterKey: "heat", activeValue: state.analyticsFilters.heat });
}

function renderHeatBuyerMatrix(cargos) {
  const heatRows = summarizeBy(cargos, (cargo) => heatLabelForSpec(cargo.spec)).sort((a, b) => heatSortValue(b.label) - heatSortValue(a.label));
  const buyerRows = summarizeBy(cargos, buyerLabel);
  const heatLabels = heatRows.slice(0, 8).map((row) => row.label);
  const visibleHeatSet = new Set(heatLabels);
  const matrixColumns = heatRows.length > heatLabels.length ? [...heatLabels, "Other"] : heatLabels;
  const buyerLabels = buyerRows.slice(0, 10).map((row) => row.label);
  const grid = new Map();

  cargos.forEach((cargo) => {
    const buyer = buyerLabel(cargo);
    const rawHeat = heatLabelForSpec(cargo.spec);
    const heat = visibleHeatSet.has(rawHeat) ? rawHeat : "Other";
    if (!buyerLabels.includes(buyer) || !matrixColumns.includes(heat)) return;
    const key = `${buyer}::${heat}`;
    grid.set(key, (grid.get(key) || 0) + cargo.quantityMt);
  });

  if (!buyerLabels.length || !matrixColumns.length) {
    els.heatBuyerMatrix.innerHTML = `<tbody><tr><td class="empty-cell">No cargo data</td></tr></tbody>`;
    return;
  }

  els.heatBuyerMatrix.innerHTML = `
    <thead>
      <tr>
        <th>Buyer</th>
        ${matrixColumns.map((label) => `<th>${label}</th>`).join("")}
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${buyerLabels
        .map((buyer) => {
          const cells = matrixColumns.map((heat) => grid.get(`${buyer}::${heat}`) || 0);
          const total = cells.reduce((sum, value) => sum + value, 0);
          return `
            <tr>
              <td><strong>${buyer}</strong></td>
              ${cells.map((value) => `<td>${value ? formatQuantity(value) : "-"}</td>`).join("")}
              <td><strong>${formatQuantity(total)}</strong></td>
            </tr>
          `;
        })
        .join("")}
    </tbody>
  `;
}


function renderExposureMix(cargos) {
  const total = sumQty(cargos);

  // Total KPI
  if (els.exposureTotalKpi) {
    els.exposureTotalKpi.innerHTML =
      `<strong>${formatMn(total)}</strong>` +
      `<span>${nf0.format(cargos.length)} cargos · ${state.year} portfolio</span>`;
  }

  // Sold / For Sale / Planned status bars
  if (els.exposureStatusBar) {
    const buckets = [
      { label: "Sold", status: "sold", color: statusColors.sold },
      { label: "For Sale", status: "forsale", color: statusColors.forsale },
      { label: "Planned", status: "planned", color: statusColors.planned },
    ];
    els.exposureStatusBar.innerHTML = buckets
      .map((b) => {
        const qty = sumQty(cargos.filter((c) => c.status === b.status));
        if (!qty) return "";
        const pct = total ? (qty / total) * 100 : 0;
        return `<div class="esb-row">
          <div class="esb-label">${b.label}</div>
          <div class="esb-track"><div class="esb-fill" style="width:${pct.toFixed(1)}%;background:${b.color}"></div></div>
          <div class="esb-pct">${nf1.format(pct)}%</div>
          <div class="esb-qty">${formatMn(qty)}</div>
        </div>`;
      })
      .join("");
  }
}

function renderFixedPriceTrend(cargos) {
  const fixedCargos = cargos.filter((cargo) => cargo.purchaseType === "fixed" && Number.isFinite(cargo.priceFixed));
  const specGroups = summarizeBy(fixedCargos, (cargo) => heatLabelForSpec(cargo.spec))
    .map((row) => row.label)
    .slice(0, 8);
  const lineSeries = specGroups
    .map((spec) => {
      const rows = monthlyWeightedAverage(
        fixedCargos.filter((cargo) => heatLabelForSpec(cargo.spec) === spec),
        (cargo) => cargo.priceFixed,
      );
      return {
        label: spec,
        points: rows.map((row) => ({ month: row.month, value: row.avg, qty: row.qty })),
        dataPoints: rows.filter((row) => Number.isFinite(row.avg)).length,
      };
    })
    .filter((item) => item.dataPoints >= 3);
  drawLineChart(els.fixedPriceTrendChart, lineSeries);
}

function latestIndices() {
  return data.indices.length ? data.indices[data.indices.length - 1] : null;
}

function previousIndices(offset = 1) {
  return data.indices[Math.max(0, data.indices.length - 1 - offset)];
}

function valueForAverage(averages, iciNum) {
  return averages[`avgIci${iciNum}`] ?? 0;
}

function extractHeatValue(spec) {
  const match = spec.match(/(\d{3,4})/);
  return match ? Number(match[1]) : null;
}

function isProrateFormula(formula) {
  const lower = formula.toLowerCase();
  return lower.includes("prorate") && !lower.includes("/");
}

function normalizeFormula(formula) {
  return formula
    .toLowerCase()
    .replace(/\([^)]*(?:agent fee|weeks? before|month before)[^)]*\)/g, "")
    .replace(/\(([-+]\d+(?:\.\d+)?)\)/g, "$1")
    .replace(/\+agent fee\d+(\.\d+)?/g, "")
    .replace(/\+agent fee/g, "")
    .replace(/prorate/g, "")
    .replace(/[\s$]/g, "");
}

function signedNumberSum(text) {
  if (!text) return 0;
  const matches = text.match(/[+-]\d+(?:\.\d+)?/g) ?? [];
  return matches.reduce((sum, value) => sum + Number(value), 0);
}

function signedMoney(value) {
  return `${value >= 0 ? "+" : "-"}$${nf2.format(Math.abs(value))}`;
}

function parseFormula(formula) {
  const normalized = normalizeFormula(formula);

  let match = normalized.match(/^ici(\d)\/(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)([+-]\d+(?:\.\d+)?)$/);
  if (match) {
    const ici = Number(match[1]);
    const fromHeat = Number(match[2]);
    const toHeat = Number(match[3]);
    const offset = Number(match[4]);
    return {
      ici,
      offset,
      description: `avg(ICI${ici})/${fromHeat}*${toHeat} ${offset >= 0 ? "+" : ""}${offset}`,
      expression: (avg) => (valueForAverage(avg, ici) / fromHeat) * toHeat + offset,
    };
  }

  match = normalized.match(/^(\d+(?:\.\d+)?)%ici(\d)\+(\d+(?:\.\d+)?)%ici(\d)((?:[+-]\d+(?:\.\d+)?)*)$/);
  if (match) {
    const weightA = Number(match[1]) / 100;
    const iciA = Number(match[2]);
    const weightB = Number(match[3]) / 100;
    const iciB = Number(match[4]);
    const offset = signedNumberSum(match[5]);
    return {
      ici: iciA,
      offset,
      description: `${weightA * 100}%ICI${iciA} + ${weightB * 100}%ICI${iciB} ${offset >= 0 ? "+" : ""}${offset}`,
      expression: (avg) => weightA * valueForAverage(avg, iciA) + weightB * valueForAverage(avg, iciB) + offset,
    };
  }

  match = normalized.match(/^ici(\d)\*(\d+(?:\.\d+)?)%\+ici(\d)\*(\d+(?:\.\d+)?)%((?:[+-]\d+(?:\.\d+)?)*)$/);
  if (match) {
    const iciA = Number(match[1]);
    const weightA = Number(match[2]) / 100;
    const iciB = Number(match[3]);
    const weightB = Number(match[4]) / 100;
    const offset = signedNumberSum(match[5]);
    return {
      ici: iciA,
      offset,
      description: `${weightA * 100}%ICI${iciA} + ${weightB * 100}%ICI${iciB} ${offset >= 0 ? "+" : ""}${offset}`,
      expression: (avg) => weightA * valueForAverage(avg, iciA) + weightB * valueForAverage(avg, iciB) + offset,
    };
  }

  match = normalized.match(/^ici(\d)\*(\d+(?:\.\d+)?)\+ici(\d)\*(\d+(?:\.\d+)?)((?:[+-]\d+(?:\.\d+)?)*)$/);
  if (match) {
    const iciA = Number(match[1]);
    const weightA = Number(match[2]);
    const iciB = Number(match[3]);
    const weightB = Number(match[4]);
    const offset = signedNumberSum(match[5]);
    return {
      ici: iciA,
      offset,
      description: `${weightA}*ICI${iciA} + ${weightB}*ICI${iciB} ${offset >= 0 ? "+" : ""}${offset}`,
      expression: (avg) => weightA * valueForAverage(avg, iciA) + weightB * valueForAverage(avg, iciB) + offset,
    };
  }

  match = normalized.match(/^\(ici(\d)\+ici(\d)\)\*(\d+(?:\.\d+)?)([+-]\d+(?:\.\d+)?)$/);
  if (match) {
    const iciA = Number(match[1]);
    const iciB = Number(match[2]);
    const weight = Number(match[3]);
    const offset = Number(match[4]);
    return {
      ici: iciA,
      offset,
      description: `${weight}*(ICI${iciA}+ICI${iciB}) ${offset >= 0 ? "+" : ""}${offset}`,
      expression: (avg) => weight * (valueForAverage(avg, iciA) + valueForAverage(avg, iciB)) + offset,
    };
  }

  match = normalized.match(/^(\d+(?:\.\d+)?)\*\(ici(\d)\+ici(\d)\)([+-]\d+(?:\.\d+)?)$/);
  if (match) {
    const weight = Number(match[1]);
    const iciA = Number(match[2]);
    const iciB = Number(match[3]);
    const offset = Number(match[4]);
    return {
      ici: iciA,
      offset,
      description: `${weight}*(ICI${iciA}+ICI${iciB}) ${offset >= 0 ? "+" : ""}${offset}`,
      expression: (avg) => weight * (valueForAverage(avg, iciA) + valueForAverage(avg, iciB)) + offset,
    };
  }

  match = normalized.match(/^ici(\d)&ici(\d)((?:[+-]\d+(?:\.\d+)?)*)$/);
  if (match) {
    const iciA = Number(match[1]);
    const iciB = Number(match[2]);
    const offset = signedNumberSum(match[3]);
    return {
      ici: iciA,
      offset,
      description: `(ICI${iciA}+ICI${iciB})/2 ${offset >= 0 ? "+" : ""}${offset}`,
      expression: (avg) => (valueForAverage(avg, iciA) + valueForAverage(avg, iciB)) / 2 + offset,
    };
  }

  match = normalized.match(/^ici(\d)((?:[+-]\d+(?:\.\d+)?)*)$/);
  if (match) {
    const ici = Number(match[1]);
    const offset = signedNumberSum(match[2]);
    return {
      ici,
      offset,
      description: offset === 0 ? `avg(ICI${ici})` : `avg(ICI${ici}) ${offset >= 0 ? "+" : ""}${offset}`,
      expression: (avg) => valueForAverage(avg, ici) + offset,
    };
  }

  match = normalized.match(/^\d+(?:\.\d+)?$/);
  if (match) {
    const fixedValue = Number(match[0]);
    return {
      ici: 3,
      offset: 0,
      description: `fixed numeric value ${nf2.format(fixedValue)}`,
      expression: () => fixedValue,
    };
  }

  return null;
}

function indicesForRule(laycanStart, rule) {
  const startDate = dateFromISO(laycanStart);
  if (rule === "1 month before laycan") {
    const referenceMonth = addMonths(startDate, -1);
    const start = startOfMonth(referenceMonth);
    const end = endOfMonth(referenceMonth);
    return data.indices
      .filter((item) => sameOrBetween(dateFromISO(item.publicationDate), start, end))
      .sort((a, b) => dateFromISO(a.publicationDate) - dateFromISO(b.publicationDate));
  }

  const weeks = rule === "3 weeks before laycan" ? 3 : 4;
  const start = startOfWeekMonday(addDays(startDate, -7 * weeks));
  const end = endOfWeekMonday(addDays(startDate, -7));
  return data.indices
    .filter((item) => sameOrBetween(dateFromISO(item.weekStart), start, end))
    .sort((a, b) => dateFromISO(a.weekStart) - dateFromISO(b.weekStart));
}

function averageIndices(indices) {
  if (!indices.length) return { avgIci2: 0, avgIci3: 0, avgIci4: 0, avgIci5: 0, weeksUsed: [] };
  const sums = indices.reduce(
    (acc, item) => {
      acc.avgIci2 += item.ici2;
      acc.avgIci3 += item.ici3;
      acc.avgIci4 += item.ici4;
      acc.avgIci5 += item.ici5;
      acc.weeksUsed.push(item);
      return acc;
    },
    { avgIci2: 0, avgIci3: 0, avgIci4: 0, avgIci5: 0, weeksUsed: [] },
  );
  const count = indices.length;
  return {
    avgIci2: sums.avgIci2 / count,
    avgIci3: sums.avgIci3 / count,
    avgIci4: sums.avgIci4 / count,
    avgIci5: sums.avgIci5 / count,
    weeksUsed: sums.weeksUsed,
  };
}

function latestFallbackAverage() {
  const latest = latestIndices();
  return {
    avgIci2: latest.ici2,
    avgIci3: latest.ici3,
    avgIci4: latest.ici4,
    avgIci5: latest.ici5,
    weeksUsed: [latest],
  };
}

function calculateIndexPrice(cargo) {
  const parsed = parseFormula(cargo.priceFormula);
  if (!parsed) {
    return {
      estimatedPrice: null,
      breakdown: `Unable to parse formula: "${cargo.priceFormula}"`,
      weeksUsed: [],
      isLatestFallback: false,
    };
  }

  let weeks = indicesForRule(cargo.laycanStart, cargo.indexRule);
  let averages = averageIndices(weeks);
  let isLatestFallback = false;

  if (!weeks.length && data.indices.length) {
    averages = latestFallbackAverage();
    weeks = averages.weeksUsed;
    isLatestFallback = true;
  }

  if (!weeks.length) {
    return { estimatedPrice: null, breakdown: "No Argus index data available.", weeksUsed: [], isLatestFallback };
  }

  const formulaPrice = parsed.expression(averages);
  const heatValue = extractHeatValue(cargo.spec);
  const benchmark = heatBenchmarks[parsed.ici];
  const applyHeatAdjustment = isProrateFormula(cargo.priceFormula) && heatValue && benchmark && heatValue !== benchmark;
  const formulaOffset = parsed.offset ?? 0;
  const heatBasisPrice = formulaPrice - formulaOffset;
  const heatAdjustedPrice = applyHeatAdjustment ? (heatBasisPrice / benchmark) * heatValue : formulaPrice;
  const finalPrice = applyHeatAdjustment ? heatAdjustedPrice + formulaOffset : formulaPrice;
  const lines = [];

  if (isLatestFallback) {
    lines.push("REFERENCE PERIOD DATA NOT AVAILABLE YET");
    lines.push(`Using latest available Argus index (${weeks[0].publicationDate}) as reference estimate`);
    lines.push("");
  } else if (cargo.indexRule === "1 month before laycan") {
    const referenceMonth = addMonths(dateFromISO(cargo.laycanStart), -1);
    lines.push(`Reference: indices PUBLISHED in ${monthNamesLong[referenceMonth.getUTCMonth()]} ${referenceMonth.getUTCFullYear()}`);
  } else {
    const weeksBack = cargo.indexRule === "3 weeks before laycan" ? 3 : 4;
    const start = startOfWeekMonday(addDays(dateFromISO(cargo.laycanStart), -7 * weeksBack));
    const end = endOfWeekMonday(addDays(dateFromISO(cargo.laycanStart), -7));
    lines.push(`Reference: ${weeksBack} weeks before laycan (${formatShortDate(start)} - ${formatShortDate(end)})`);
  }

  if (!isLatestFallback) lines.push(`${weeks.length} week(s) used:`);
  weeks.forEach((item) => {
    lines.push(
      `  ${item.publicationDate}: ICI2=${nf2.format(item.ici2)}, ICI3=${nf2.format(item.ici3)}, ICI4=${nf2.format(item.ici4)}, ICI5=${nf2.format(item.ici5)}`,
    );
  });
  if (!isLatestFallback) {
    lines.push(
      `Averages: ICI2=${nf2.format(averages.avgIci2)}, ICI3=${nf2.format(averages.avgIci3)}, ICI4=${nf2.format(averages.avgIci4)}, ICI5=${nf2.format(averages.avgIci5)}`,
    );
  }
  lines.push(`Formula: ${parsed.description}`);

  if (applyHeatAdjustment) {
    lines.push(`Heat Value Adjustment: ICI${parsed.ici} = GAR ${benchmark}, Cargo = ${heatValue}`);
    lines.push(`  Index basis: $${nf2.format(heatBasisPrice)} / ${benchmark} kcal/kg × ${heatValue} kcal/kg`);
    if (formulaOffset) {
      lines.push(`  = $${nf2.format(heatAdjustedPrice)} ${signedMoney(formulaOffset)} = ${formatPricePerTon(finalPrice)}`);
    } else {
      lines.push(`  = ${formatPricePerTon(finalPrice)}`);
    }
  }

  lines.push(`${isLatestFallback ? "ESTIMATED (latest index)" : "Result"}: ${formatPricePerTon(finalPrice)}`);

  return {
    estimatedPrice: Math.round(finalPrice * 100) / 100,
    breakdown: lines.join("\n"),
    weeksUsed: weeks,
    isLatestFallback,
  };
}

function cargoPrice(cargo) {
  if (cargo.purchaseType === "fixed") {
    return {
      display: formatPricePerTon(cargo.priceFixed),
      value: cargo.priceFixed,
      detail: null,
    };
  }
  const detail = calculateIndexPrice(cargo);
  return {
    display: cargo.priceFormula,
    value: detail.estimatedPrice,
    detail,
  };
}

function loadingWindow(cargo) {
  return cargo.notes || `${formatShortDate(cargo.laycanStart)} - ${formatShortDate(cargo.laycanEnd)}`;
}

function populateSelect(select, values, allLabel) {
  const current = select.value || "all";
  select.innerHTML = [
    `<option value="all">${allLabel}</option>`,
    ...values.map((value) => `<option value="${value}">${value || "Unassigned"}</option>`),
  ].join("");
  select.value = values.includes(current) ? current : "all";
}

function formatGeneratedAt(value) {
  if (!value) return "not saved";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function renderStatusLine() {
  const latest = latestIndices();
  const mode = apiState.available ? "Shared data" : "Local data";
  els.dataStatus.textContent = `${mode} · Updated: ${formatGeneratedAt(data.generatedAt)} · Argus latest ${latest.publicationDate}`;
}

function syncUrl() {
  const params = new URLSearchParams(window.location.search);
  params.delete("year");
  params.delete("month");
  params.set("view", state.view);
  const qs = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
}

function renderPageVisibility() {
  const isAnalytics = state.view === "analytics";
  const isForecast = state.view === "forecast";
  const isCdp = state.view === "cargoDetail";
  els.dashboardPage.hidden = isAnalytics || isForecast || isCdp;
  els.analyticsPage.hidden = !isAnalytics;
  els.forecastPage.hidden = !isForecast;
  if (els.cargoDetailPage) els.cargoDetailPage.hidden = !isCdp;
  els.viewTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  if (isAnalytics) {
    requestAnimationFrame(() => renderPortfolioSummary());
  } else if (isForecast) {
    requestAnimationFrame(renderForecastScenario);
  } else if (isCdp) {
    requestAnimationFrame(() => renderCargoDetailPage(state.cdpCargoId));
  }
}

function setView(view, options = {}) {
  state.view = ["analytics", "forecast", "cargoDetail"].includes(view) ? view : "dashboard";
  renderPageVisibility();
  if (!options.skipUrl) syncUrl();
  if (state.view === "dashboard") {
    requestAnimationFrame(drawChart);
  } else if (state.view === "forecast") {
    requestAnimationFrame(renderForecastScenario);
  } else if (state.view === "cargoDetail") {
    requestAnimationFrame(() => renderCargoDetailPage(state.cdpCargoId));
  }
}

function openPricingWorkbench(cargoId) {
  state.selectedId = cargoId;
  state.cdpCargoId = cargoId;
  setView("cargoDetail", { skipUrl: true });
  const dashboardParams = new URLSearchParams(window.location.search);
  dashboardParams.set("year", String(state.year));
  dashboardParams.set("month", state.month === TOTAL_MONTH ? "total" : String(state.month));
  dashboardParams.set("view", "dashboard");
  window.history.replaceState(null, "", `${window.location.pathname}?${dashboardParams.toString()}`);

  const params = new URLSearchParams(dashboardParams);
  params.set("view", "cargoDetail");
  const qs = params.toString();
  window.history.pushState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}#view=cargoDetail&id=${encodeURIComponent(cargoId)}`);
}

function changeYear(delta) {
  state.year += delta;
  state.selectedId = null;
  state.expandedCargoId = null;
  refreshPeriodViews();
}

function renderMonthTabs() {
  els.yearLabel.textContent = state.year;
  els.periodLabel.textContent = state.month === TOTAL_MONTH ? `${state.year} Total` : `${state.year} ${monthNames[state.month - 1]}`;
  const monthButtons = monthNames
    .map((name, index) => {
      const month = index + 1;
      return `<button class="tab ${state.month === month ? "is-active" : ""}" data-month="${month}" type="button">${name}</button>`;
    })
    .join("");
  els.monthTabs.innerHTML = `${monthButtons}<button class="tab total-tab ${state.month === TOTAL_MONTH ? "is-active" : ""}" data-month="${TOTAL_MONTH}" type="button">Total</button>`;
  document.querySelectorAll("[data-month]").forEach((button) => {
    button.addEventListener("click", () => {
      state.month = Number(button.dataset.month);
      state.selectedId = null;
      state.expandedCargoId = null;
      refreshPeriodViews();
    });
  });
}

function renderFilters() {
  const cargos = periodCargos();
  const mines = [...new Set(cargos.map((cargo) => cargo.mine).filter(Boolean))].sort();
  const buyers = [...new Set(cargos.map((cargo) => cargo.buyer || "").filter((buyer) => buyer !== ""))].sort();
  populateSelect(els.mineFilter, mines, "All Mines");
  populateSelect(els.buyerFilter, buyers, "All Buyers");
}

function renderKpis() {
  const cargos = periodCargos();
  const priorMonth = state.month > 1 ? state.month - 1 : null;
  const priorCargos =
    priorMonth && state.month !== TOTAL_MONTH ? data.cargos.filter((cargo) => cargo.year === state.year && cargo.month === priorMonth) : [];
  const priorLabel = priorMonth ? monthNames[priorMonth - 1] : "";
  const fixed = cargos.filter((cargo) => cargo.purchaseType === "fixed");
  const index = cargos.filter((cargo) => cargo.purchaseType === "index");
  const sold = cargos.filter((cargo) => cargo.status === "sold");
  const forsale = cargos.filter((cargo) => cargo.status === "forsale");
  const planned = cargos.filter((cargo) => cargo.status === "planned");
  const compare = (items, priorItems) =>
    state.month === TOTAL_MONTH
      ? { className: "neutral", text: "— annual total" }
      : deltaInfo(sumQty(items), sumQty(priorItems), priorLabel, {
          firstLabel: "— first month",
          noPrior: state.month === 1,
          absoluteFormatter: (value) => `${nf0.format(value)} MT`,
        });
  const cards = [
    { label: "Total Quantity", value: formatQuantity(sumQty(cargos)), delta: formatQuantitySub(sumQty(cargos), cargos.length), trend: compare(cargos, priorCargos) },
    { label: "Fixed Price", value: formatQuantity(sumQty(fixed)), delta: formatQuantitySub(sumQty(fixed), fixed.length), trend: compare(fixed, priorCargos.filter((cargo) => cargo.purchaseType === "fixed")) },
    { label: "Index Price", value: formatQuantity(sumQty(index)), delta: formatQuantitySub(sumQty(index), index.length), trend: compare(index, priorCargos.filter((cargo) => cargo.purchaseType === "index")) },
    { label: "Sold", value: formatQuantity(sumQty(sold)), delta: formatQuantitySub(sumQty(sold), sold.length), trend: compare(sold, priorCargos.filter((cargo) => cargo.status === "sold")) },
    { label: "For Sale", value: formatQuantity(sumQty(forsale)), delta: formatQuantitySub(sumQty(forsale), forsale.length), trend: compare(forsale, priorCargos.filter((cargo) => cargo.status === "forsale")) },
    { label: "Planned", value: formatQuantity(sumQty(planned)), delta: formatQuantitySub(sumQty(planned), planned.length) },
  ];

  els.kpiGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="kpi-card">
          <p>${card.label}</p>
          <strong>${card.value}</strong>
          <span class="delta">${card.delta}</span>
          ${renderDelta(card.trend)}
        </article>
      `,
    )
    .join("");
}

function renderPortfolioSummary() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const isCurrentYear = state.year === currentYear;

  const baseCargos = yearCargos();

  // YTD cutoff = highest month present in data (not system clock), fallback to current month
  const dataMonths = baseCargos.map((c) => c.month).filter(Number.isFinite);
  const ytdMonth = isCurrentYear
    ? (dataMonths.length ? Math.max(...dataMonths) : now.getMonth() + 1)
    : 12;

  // Prior-year slice: same M1–Mn for current year; full year for historical views
  const priorCutoff = isCurrentYear ? ytdMonth : 12;
  const ytdLabel = isCurrentYear ? `${state.year - 1} YTD` : `${state.year - 1} Full Year`;

  const cargos = applyAnalyticsFilters(baseCargos);
  const ytdCargos = applyAnalyticsFilters(baseCargos.filter((c) => c.month <= ytdMonth));
  const priorYtdCargos = applyAnalyticsFilters(
    data.cargos.filter((c) => c.year === state.year - 1 && c.month <= priorCutoff),
  );
  const total = sumQty(cargos);
  const mineRows = summarizeBy(cargos, (cargo) => cargo.mine);
  const typeRows = summarizeBy(cargos, (cargo) => labelForType(cargo.purchaseType));
  const statusRows = summarizeBy(cargos, (cargo) => labelForStatus(cargo.status));
  const heatRows = summarizeBy(cargos, (cargo) => heatLabelForSpec(cargo.spec)).sort((a, b) => heatSortValue(b.label) - heatSortValue(a.label));
  const buyerRows = summarizeBy(cargos, buyerLabel);

  const ytdNote = isCurrentYear ? ` · YTD M1–M${ytdMonth}` : "";
  els.summarySubtitle.textContent = `${state.year} full-year · ${nf0.format(total)} MT · ${cargos.length} cargos${ytdNote}`;
  els.analyticsYearLabel.textContent = state.year;
  renderAnalyticsFilterChips();
  renderCollapsibleTable(mineRows, "mine", "mines", els.mineSummaryRows, els.mineTableWrap, els.mineTableToggle);
  renderCollapsibleTable(buyerRows, "buyer", "buyers", els.buyerSummaryRows, els.buyerTableWrap, els.buyerTableToggle);
  els.typeSummaryRows.innerHTML = renderSummaryRows(typeRows);
  renderCollapsibleTable(heatRows, "heat", "heat rows", els.heatSummaryRows, els.heatTableWrap, els.heatTableToggle);
  renderAnalyticsKpis(ytdCargos, priorYtdCargos, ytdLabel, ytdMonth, isCurrentYear);
  renderTargetProgress(baseCargos);
  renderReexportTrade(baseCargos);
  renderHeatBuyerMatrix(cargos);
  renderFixedPriceTrend(cargos);

  drawAnalyticsCharts(cargos, mineRows, typeRows, statusRows, heatRows);
  bindAnalyticsTableFilters();
}

function quickPricingSnapshot(cargo) {
  if (cargo.purchaseType === "fixed") {
    return {
      formula: "Fixed price",
      period: "Fixed price contract",
      indexAvg: "N/A",
      forecast: cargo.priceFixed,
      latest: cargo.priceFixed,
    };
  }

  const labels = referencedIciLabels(cargo.priceFormula);
  const forecastAverages = forecastAveragesForCargo(cargo);
  const forecast = forecastSettlementForCargo(cargo, forecastAverages);
  return {
    formula: cargo.priceFormula || "Index formula",
    period: cargo.indexRule || "Index reference period",
    indexAvg: formatAverageSummary(forecastAverages, labels),
    forecast,
    latest: estimateIndexWithLatest(cargo),
  };
}

function indexReferenceSnapshot(cargo) {
  if (cargo.purchaseType !== "index") return { display: "—", warning: false, dated: "" };
  const labels = referencedIciLabels(cargo.priceFormula);
  const latest = latestIndices();
  if (!labels.length || !latest) return { display: "확인 필요", warning: true, dated: "" };
  const values = labels.map((label) => {
    const key = label.toLowerCase();
    const value = numericOrNull(latest[key]);
    return value == null ? `${label} —` : `${label} $${nf2.format(value)}`;
  });
  return { display: values.join(" · "), warning: false, dated: latest.publicationDate || "" };
}

function purchaseShareSummary(cargo) {
  const price = cargoPrice(cargo);
  const indexRef = indexReferenceSnapshot(cargo);
  const quantity = formatQuantity(cargo.quantityMt);
  const terms = cargo.specialTerms || "없음";
  const laycanStatus = cargo.laycanConfirmed ? "확정" : "미확정";
  const indexText = cargo.purchaseType === "index"
    ? `${indexRef.display}${indexRef.dated ? ` (${indexRef.dated})` : ""}`
    : "해당 없음";
  return `[구매조건 공유] ${cargo.mine} ${heatLabelForSpec(cargo.spec)} | 물량 ${quantity} | 가격 ${price.display || "확인 필요"} | 기준 인덱스 ${indexText} | 특이사항 ${terms} | Laycan ${laycanStatus} ${loadingWindow(cargo)}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

function renderCargoExpandedRow(cargo) {
  const snapshot = quickPricingSnapshot(cargo);
  const spec = heatLabelForSpec(cargo.spec);
  const latestLine = Number.isFinite(snapshot.latest)
    ? `<div class="quick-kv"><span>Latest Estimate</span><strong>${formatPricePerTon(snapshot.latest)}</strong></div>`
    : "";

  return `
    <tr class="cargo-expanded-row" data-expanded-row="${cargo.id}">
      <td colspan="11">
        <div class="quick-detail-grid">
          <section class="quick-detail-block quick-pricing">
            <h4>Pricing Snapshot</h4>
            <div class="quick-kv formula-line"><span>Formula</span><strong title="${escapeHtml(snapshot.formula)}">${escapeHtml(snapshot.formula)}</strong></div>
            <div class="quick-kv"><span>Pricing Period</span><strong>${escapeHtml(snapshot.period)}</strong></div>
            <div class="quick-kv"><span>Index Avg Used</span><strong>${escapeHtml(snapshot.indexAvg)}</strong></div>
            ${latestLine}
            <div class="quick-settlement"><span>Forecast Settlement</span><strong>${formatPricePerTon(snapshot.forecast)}</strong></div>
          </section>

          <section class="quick-detail-block">
            <h4>Contract Info</h4>
            <div class="quick-info-grid">
              <div><span>Buyer</span><strong>${escapeHtml(cargo.buyer || "Unassigned")}</strong></div>
              <div><span>Quantity</span><strong>${formatQuantity(cargo.quantityMt)}</strong></div>
              <div><span>Laycan</span><strong>${escapeHtml(loadingWindow(cargo))}</strong></div>
              <div><span>Laycan Status</span><strong class="laycan-state ${cargo.laycanConfirmed ? "confirmed" : "tentative"}">${cargo.laycanConfirmed ? "Confirmed" : "Tentative"}</strong></div>
              <div><span>Purchase Date</span><strong>${escapeHtml(formatDate(cargo.purchaseDate))}</strong></div>
              <div><span>Special Terms</span><strong>${escapeHtml(cargo.specialTerms || "—")}</strong></div>
              <div><span>Status</span><strong>${labelForStatus(cargo.status)}</strong></div>
              <div><span>Type</span><strong>${labelForType(cargo.purchaseType)}</strong></div>
            </div>
          </section>

          <section class="quick-detail-block quick-actions">
            <button class="tool-button dark compact-action" type="button" data-quick-workbench="${cargo.id}">Cargo Detail →</button>
            <button class="tool-button compact-action" type="button" data-quick-edit="${cargo.id}">Edit Cargo</button>
            <button class="tool-button compact-action share-copy-button" type="button" data-copy-share="${cargo.id}">Copy Share Summary</button>
            <div class="quick-status-actions">
              ${["sold", "forsale", "planned"]
                .map(
                  (status) =>
                    `<button class="tool-button compact-action" type="button" data-quick-status="${status}" data-quick-status-id="${cargo.id}">${labelForStatus(status)}</button>`,
                )
                .join("")}
            </div>
          </section>
        </div>
      </td>
    </tr>
  `;
}

function renderCargoRows() {
  const rows = filteredCargos();
  els.tableCount.textContent = `${rows.length} cargos`;
  els.tableSubtitle.textContent = `${labelForStatus(state.status)} · ${labelForType(state.type)} · ${state.mine === "all" ? "All Mines" : state.mine}`;

  if (!rows.some((cargo) => cargo.id === state.selectedId)) {
    state.selectedId = rows[0]?.id ?? periodCargos()[0]?.id ?? null;
  }
  if (!rows.some((cargo) => cargo.id === state.expandedCargoId)) {
    state.expandedCargoId = null;
  }

  els.cargoRows.innerHTML = rows
    .map((cargo, index) => {
      const price = cargoPrice(cargo);
      const indexRef = indexReferenceSnapshot(cargo);
      const spec = heatLabelForSpec(cargo.spec);
      const isExpanded = cargo.id === state.expandedCargoId;
      const rowClasses = [cargo.id === state.selectedId ? "is-selected" : "", isExpanded ? "is-expanded" : "", `status-row-${cargo.status}`]
        .filter(Boolean)
        .join(" ");
      const j = cargo.judgment;
      const jBadge = j?.direction
        ? `<div class="judgment-badge">
             <span class="jb-dir ${j.direction}">${j.direction === "bull" ? "Bull" : j.direction === "bear" ? "Bear" : "Neutral"}</span>
             ${j.action ? `<span>·</span><span>${j.action.replace("_", " ")}</span>` : ""}
             ${j.targetSettlement != null ? `<span>·</span><span>$${nf2.format(j.targetSettlement)}/t</span>` : ""}
           </div>`
        : "";
      const mainRow = `
        <tr data-cargo-id="${cargo.id}" class="${rowClasses}">
          <td><span class="row-arrow" aria-hidden="true">${isExpanded ? "▾" : "▸"}</span>${index + 1}</td>
          <td><span class="status-pill ${cargo.status}">${labelForStatus(cargo.status)}</span></td>
          <td><strong class="mine-cell">${escapeHtml(cargo.mine)}</strong>${jBadge}</td>
          <td>${escapeHtml(spec)}</td>
          <td class="numeric qty-cell">${formatQuantity(cargo.quantityMt)}${cargo.quantityMt !== 80000 ? `<span class="qty-attention">≠80K</span>` : ""}</td>
          <td><span class="price-cell" title="${escapeHtml(price.display)}">${escapeHtml(price.display)}</span></td>
          <td><span class="type-pill ${cargo.purchaseType}">${labelForType(cargo.purchaseType)}</span></td>
          <td><span class="index-ref ${indexRef.warning ? "needs-review" : ""}" title="${escapeHtml(indexRef.dated ? `Latest: ${indexRef.dated}` : "")}">${escapeHtml(indexRef.display)}</span></td>
          <td>${escapeHtml(cargo.buyer || "")}</td>
          <td><span class="terms-cell">${escapeHtml(cargo.specialTerms || "—")}</span></td>
          <td><span class="laycan-badge ${cargo.laycanConfirmed ? "confirmed" : "tentative"}">${cargo.laycanConfirmed ? "확정" : "미확정"}</span><span class="laycan-window">${escapeHtml(loadingWindow(cargo))}</span></td>
        </tr>
      `;
      return isExpanded ? `${mainRow}${renderCargoExpandedRow(cargo)}` : mainRow;
    })
    .join("");

  document.querySelectorAll("[data-cargo-id]").forEach((row) => {
    row.addEventListener("click", () => {
      const cargoId = row.dataset.cargoId;
      state.selectedId = cargoId;
      state.cdpCargoId = cargoId;
      state.expandedCargoId = state.expandedCargoId === cargoId ? null : cargoId;
      renderCargoRows();
      renderDetail();
    });
  });

  document.querySelectorAll(".cargo-expanded-row").forEach((row) => {
    row.addEventListener("click", (event) => event.stopPropagation());
  });
  document.querySelectorAll("[data-quick-workbench]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openPricingWorkbench(button.dataset.quickWorkbench);
    });
  });
  document.querySelectorAll("[data-quick-edit]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const cargo = data.cargos.find((item) => item.id === button.dataset.quickEdit);
      if (cargo) openCargoForm(cargo);
    });
  });
  document.querySelectorAll("[data-copy-share]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      const cargo = data.cargos.find((item) => item.id === button.dataset.copyShare);
      if (!cargo) return;
      try {
        const copied = await copyText(purchaseShareSummary(cargo));
        if (!copied) throw new Error("Copy unavailable");
        const previous = button.textContent;
        button.textContent = "Copied ✓";
        window.setTimeout(() => { button.textContent = previous; }, 1600);
      } catch {
        button.textContent = "Copy failed";
      }
    });
  });
  document.querySelectorAll("[data-quick-status]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      const nextStatus = button.dataset.quickStatus;
      const updates = { status: nextStatus };
      if (nextStatus !== "sold") updates.buyer = "";
      await updateCargo(button.dataset.quickStatusId, updates);
    });
  });
}

function renderDetail() {
  if (!els.cargoDetail || els.cargoDetail.closest("[hidden]")) return;
  const cargo = data.cargos.find((item) => item.id === state.selectedId) ?? periodCargos()[0];
  if (!cargo) {
    els.cargoDetail.innerHTML = `<p>No cargo in this period.</p>`;
    els.detailSubhead.textContent = "No cargo selected";
    return;
  }

  const price = cargoPrice(cargo);
  els.detailSubhead.textContent = `ID: ${cargo.id}`;

  const priceBlock =
    cargo.purchaseType === "fixed"
      ? `
        <div class="price-number">
          <strong>${formatPricePerTon(cargo.priceFixed)}</strong>
          <span>Fixed Price</span>
        </div>
      `
      : `
        <div class="formula-box">${escapeHtml(cargo.priceFormula)}
${escapeHtml(cargo.indexRule || "")}</div>
        <div class="breakdown">${escapeHtml(price.detail.breakdown)}</div>
        <div class="price-number">
          <strong>${price.detail.estimatedPrice == null ? "N/A" : formatPricePerTon(price.detail.estimatedPrice)}</strong>
          <span>Estimated Settlement</span>
        </div>
      `;

  els.cargoDetail.innerHTML = `
    <div class="detail-hero">
      <span class="status-pill ${cargo.status}">${labelForStatus(cargo.status)}</span>
      <span class="type-pill ${cargo.purchaseType}">${labelForType(cargo.purchaseType)}</span>
      <h3>${escapeHtml(cargo.mine)} · ${escapeHtml(heatLabelForSpec(cargo.spec))}</h3>
      <div class="meta">${cargo.year} ${monthNames[cargo.month - 1]} · ${loadingWindow(cargo)}</div>
      ${priceBlock}
    </div>

    <div class="detail-grid">
      <div class="mini-stat">
        <span>Quantity</span>
        <strong>${formatQuantity(cargo.quantityMt)}</strong>
      </div>
      <div class="mini-stat">
        <span>Buyer</span>
        <strong>${cargo.buyer || "Unassigned"}</strong>
      </div>
      <div class="mini-stat">
        <span>Purchase Date</span>
        <strong>${formatDate(cargo.purchaseDate)}</strong>
      </div>
      <div class="mini-stat">
        <span>Laycan</span>
        <strong>${loadingWindow(cargo)}</strong>
      </div>
    </div>

    ${cargo.notes ? `<div class="notes">${cargo.notes}</div>` : ""}

    <div class="detail-actions">
      <button class="tool-button" type="button" data-edit-selected="${cargo.id}">Edit Cargo</button>
      <button class="tool-button" type="button" data-status-update="sold">Mark as Sold</button>
      <button class="tool-button" type="button" data-status-update="forsale">Mark as For Sale</button>
      <button class="tool-button" type="button" data-status-update="planned">Mark as Planned</button>
      <button class="tool-button dark" type="button" data-open-workbench="${cargo.id}">Cargo Detail →</button>
    </div>
  `;

  document.querySelector(`[data-edit-selected="${cargo.id}"]`)?.addEventListener("click", () => openCargoForm(cargo));
  document.querySelector(`[data-open-workbench="${cargo.id}"]`)?.addEventListener("click", () => {
    openPricingWorkbench(cargo.id);
  });
  document.querySelectorAll("[data-status-update]").forEach((button) => {
    button.addEventListener("click", async () => {
      const nextStatus = button.dataset.statusUpdate;
      const updates = { status: nextStatus };
      if (nextStatus !== "sold") updates.buyer = "";
      await updateCargo(cargo.id, updates);
    });
  });
}

function movementClass(value) {
  if (value > 0.005) return "up";
  if (value < -0.005) return "down";
  return "flat";
}

function renderMarketCards() {
  const latest = latestIndices();
  const previous = previousIndices(1);
  els.marketCards.innerHTML = ["ici2", "ici3", "ici4", "ici5"]
    .map((key) => {
      const label = key.toUpperCase();
      const delta = latest[key] - previous[key];
      return `
        <article class="market-card">
          <div class="row">
            <h3>${label}</h3>
            <span class="movement ${movementClass(delta)}">${delta >= 0 ? "+" : ""}${nf2.format(delta)}</span>
          </div>
          <strong>${formatPricePerTon(latest[key])}</strong>
          <div class="row">
            <small>${latest.publicationDate}</small>
            <small>${latest.weekStart} - ${latest.weekEnd}</small>
          </div>
        </article>
      `;
    })
    .join("");
  els.marketSubtitle.textContent = `${state.chartIndex.toUpperCase()} weekly history`;
}

function drawChart() {
  const canvas = els.chart;
  const parent = canvas.parentElement;
  const rect = parent.getBoundingClientRect();
  if (rect.width < 20 || rect.height < 20) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(320, Math.floor(rect.width * dpr));
  canvas.height = Math.max(220, Math.floor(rect.height * dpr));
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const width = rect.width;
  const height = rect.height;
  const pad = { top: 18, right: 18, bottom: 34, left: 50 };
  const rows = data.indices.slice(-180);
  const values = rows.map((row) => row[state.chartIndex]);
  const min = Math.floor(Math.min(...values) / 5) * 5;
  const max = Math.ceil(Math.max(...values) / 5) * 5;
  const x = (idx) => pad.left + (idx / Math.max(rows.length - 1, 1)) * (width - pad.left - pad.right);
  const y = (value) => pad.top + ((max - value) / Math.max(max - min, 1)) * (height - pad.top - pad.bottom);
  const colors = { ici2: "#0f172a", ici3: "#0891b2", ici4: "#ea580c", ici5: "#2563eb" };

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fbfcfd";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;
  ctx.font = "12px Inter, Microsoft YaHei, sans-serif";
  ctx.fillStyle = "#64748b";

  for (let i = 0; i <= 4; i += 1) {
    const value = min + ((max - min) / 4) * i;
    const yy = y(value);
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(width - pad.right, yy);
    ctx.stroke();
    ctx.fillText(nf0.format(value), 8, yy + 4);
  }

  ctx.strokeStyle = colors[state.chartIndex];
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  rows.forEach((row, idx) => {
    const xx = x(idx);
    const yy = y(row[state.chartIndex]);
    if (idx === 0) ctx.moveTo(xx, yy);
    else ctx.lineTo(xx, yy);
  });
  ctx.stroke();

  const last = rows[rows.length - 1];
  ctx.fillStyle = colors[state.chartIndex];
  ctx.beginPath();
  ctx.arc(x(rows.length - 1), y(last[state.chartIndex]), 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#64748b";
  ctx.fillText(rows[0]?.publicationDate ?? "", pad.left, height - 10);
  ctx.textAlign = "right";
  ctx.fillText(last?.publicationDate ?? "", width - pad.right, height - 10);
  ctx.textAlign = "left";
}

function numericOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function defaultForecastRows() {
  const latest = latestIndices();
  if (!latest) return [];
  const latestDate = dateFromISO(latest.publicationDate);
  const weeklyDelta = { flat: 0, up1: 1, dn1: -1, up2: 2, dn2: -2 }[state.trendMode] ?? 0;
  return Array.from({ length: 20 }, (_, index) => {
    const delta = weeklyDelta * (index + 1);
    return {
      date: toISO(addDays(latestDate, 7 * (index + 1))),
      ici2: Math.round((latest.ici2 + delta) * 100) / 100,
      ici3: Math.round((latest.ici3 + delta) * 100) / 100,
      ici4: Math.round((latest.ici4 + delta) * 100) / 100,
      ici5: Math.round((latest.ici5 + delta) * 100) / 100,
    };
  });
}

function normalizeForecastRows(rows) {
  const source = Array.isArray(rows) && rows.length ? rows : data.contractForecast?.rows || data.ici3Forecasts?.rows || defaultForecastRows();
  const latest = latestIndices();
  return source
    .map((row) => ({
      date: row.date,
      ici2: numericOrNull(row.ici2) ?? latest?.ici2 ?? null,
      ici3: numericOrNull(row.ici3) ?? numericOrNull(row.base) ?? latest?.ici3 ?? null,
      ici4: numericOrNull(row.ici4) ?? latest?.ici4 ?? null,
      ici5: numericOrNull(row.ici5) ?? latest?.ici5 ?? null,
      note: row.note || "",
    }))
    .filter((row) => row.date)
    .sort((a, b) => dateFromISO(a.date) - dateFromISO(b.date));
}

function forecastRows() {
  if (!state.ici3ForecastRows) {
    const scenarioRows = state.trendMode === "flat" ? data.contractForecast?.rows || data.ici3Forecasts?.rows : defaultForecastRows();
    state.ici3ForecastRows = normalizeForecastRows(scenarioRows);
  }
  return state.ici3ForecastRows;
}

function buildFcRows() {
  const latest = latestIndices();
  if (!latest) return [];
  const latestDate = dateFromISO(latest.publicationDate);
  const currentYear = latestDate.getUTCFullYear();

  // Display start: beginning of current calendar month (unless showing history)
  const now = new Date();
  const displayStart = state.showFcHistory
    ? new Date(Date.UTC(currentYear, 0, 1))
    : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

  // Actual rows: current-year ICI data from display start
  const actualRows = data.indices
    .filter((row) => {
      const d = dateFromISO(row.publicationDate);
      return d >= displayStart;
    })
    .map((row) => ({
      date: row.publicationDate,
      ici2: row.ici2,
      ici3: row.ici3,
      ici4: row.ici4,
      ici5: row.ici5,
      note: "",
      isActual: true,
    }));

  const actualDateSet = new Set(actualRows.map((r) => r.date));

  // Forecast rows: exclude any dates already covered by actual
  const fRows = forecastRows()
    .filter((r) => !actualDateSet.has(r.date))
    .map((r) => ({ ...r, isActual: false }));

  return [...actualRows, ...fRows].sort((a, b) => dateFromISO(a.date) - dateFromISO(b.date));
}

function formatLaycan(start, end) {
  if (!start) return "—";
  const s = dateFromISO(start);
  const sDay = s.getUTCDate();
  const sMon = monthNames[s.getUTCMonth()];
  const sYear = s.getUTCFullYear();
  if (!end) return `${sDay} ${sMon}`;
  const e = dateFromISO(end);
  const eDay = e.getUTCDate();
  const eMon = monthNames[e.getUTCMonth()];
  const eYear = e.getUTCFullYear();
  if (s.getUTCMonth() === e.getUTCMonth() && sYear === eYear) {
    return `${sDay}–${eDay} ${sMon}`;
  }
  if (sYear === eYear) {
    return `${sDay} ${sMon} – ${eDay} ${eMon}`;
  }
  return `${sDay} ${sMon} ${sYear} – ${eDay} ${eMon} ${eYear}`;
}

function pricingPeriodLabel(cargo) {
  const { indexRule, laycanStart } = cargo;
  if (!indexRule || !laycanStart) return "—";
  const startDate = dateFromISO(laycanStart);
  if (indexRule === "1 month before laycan") {
    const ref = addMonths(startDate, -1);
    return `${monthNames[ref.getUTCMonth()]} ${ref.getUTCFullYear()} avg`;
  }
  const weeks = indexRule === "3 weeks before laycan" ? 3 : 4;
  const ws = startOfWeekMonday(addDays(startDate, -7 * weeks));
  const we = endOfWeekMonday(addDays(startDate, -7));
  return `${toISO(ws)} – ${toISO(we)}`;
}

function averageValues(values) {
  const usable = values.filter((value) => Number.isFinite(value));
  return usable.length ? usable.reduce((sum, value) => sum + value, 0) / usable.length : null;
}

function forecastAverageForMonth(year, month, indexKey) {
  return averageValues(
    forecastRows()
      .filter((row) => {
        const date = dateFromISO(row.date);
        return date.getUTCFullYear() === year && date.getUTCMonth() + 1 === month;
      })
      .map((row) => numericOrNull(row[indexKey])),
  );
}

function nextForecastMonths() {
  const latest = latestIndices();
  const start = latest ? addMonths(dateFromISO(latest.publicationDate), 1) : new Date();
  return [0, 1].map((offset) => {
    const date = addMonths(startOfMonth(start), offset);
    return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, label: `${monthNames[date.getUTCMonth()]} Forecast Avg` };
  });
}

function drawIci3ForecastChart() {
  const canvas = els.forecastChart;
  if (!canvas) return;
  const box = canvasContext(canvas, 300);
  if (!box) return;
  const { ctx, width, height } = box;
  const indexKeys = ["ici2", "ici3", "ici4", "ici5"];
  const colors = { ici2: "#1e40af", ici3: "#0891b2", ici4: "#f59e0b", ici5: "#64748b" };
  const actualRows = data.indices.slice(-28);
  const forecasts = forecastRows()
    .filter((row) => indexKeys.some((key) => Number.isFinite(numericOrNull(row[key]))));
  const values = [...actualRows.flatMap((row) => indexKeys.map((key) => row[key])), ...forecasts.flatMap((row) => indexKeys.map((key) => row[key]))].filter(
    (value) => Number.isFinite(value),
  );
  if (!values.length) {
    drawEmptyChart(canvas, "No contract forecast data");
    return;
  }

  const pad = { top: 42, right: 24, bottom: 42, left: 58 };
  const min = Math.floor((Math.min(...values) - 2) / 5) * 5;
  const max = Math.ceil((Math.max(...values) + 2) / 5) * 5;
  const timeline = [...actualRows.map((row) => row.publicationDate), ...forecasts.map((row) => row.date)]
    .filter((date, index, rows) => rows.indexOf(date) === index)
    .sort((a, b) => dateFromISO(a) - dateFromISO(b));
  const x = (date) => pad.left + (timeline.indexOf(date) / Math.max(timeline.length - 1, 1)) * (width - pad.left - pad.right);
  const y = (value) => pad.top + ((max - value) / Math.max(max - min, 1)) * (height - pad.top - pad.bottom);

  ctx.strokeStyle = "#dbe8f0";
  ctx.fillStyle = "#64748b";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i += 1) {
    const value = min + ((max - min) / 4) * i;
    const yy = y(value);
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(width - pad.right, yy);
    ctx.stroke();
    ctx.fillText(`$${nf0.format(value)}`, 10, yy + 4);
  }

  const drawSeries = (seriesPoints, color, dashed = false) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    ctx.setLineDash(dashed ? [7, 5] : []);
    ctx.lineDashOffset = 0;
    ctx.beginPath();
    seriesPoints.forEach((point, index) => {
      const xx = x(point.date);
      const yy = y(point.value);
      if (index === 0) ctx.moveTo(xx, yy);
      else ctx.lineTo(xx, yy);
    });
    ctx.stroke();
    ctx.setLineDash([]);
  };

  indexKeys.forEach((key) => {
    const actual = actualRows.map((row) => ({ date: row.publicationDate, value: row[key] })).filter((point) => Number.isFinite(point.value));
    const lastActual = actual[actual.length - 1];
    const forecast = [
      ...(lastActual ? [lastActual] : []),
      ...forecasts.map((row) => ({ date: row.date, value: numericOrNull(row[key]) })).filter((point) => Number.isFinite(point.value)),
    ];
    drawSeries(actual, colors[key], false);
    drawSeries(forecast, colors[key], true);
  });

  if (actualRows.length) {
    const xx = x(actualRows[actualRows.length - 1].publicationDate);
    ctx.strokeStyle = "#94a3b8";
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.moveTo(xx, pad.top);
    ctx.lineTo(xx, height - pad.bottom);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  const legends = [
    ["ICI2", colors.ici2, 62],
    ["ICI3", colors.ici3, 62],
    ["ICI4", colors.ici4, 62],
    ["ICI5", colors.ici5, 62],
    ["solid = actual, dashed = forecast", "#94a3b8", 220],
  ];
  let lx = pad.left;
  let ly = 13;
  legends.forEach(([label, color, preferredWidth]) => {
    const itemWidth = preferredWidth || Math.min(label.length * 7 + 34, 220);
    if (lx + itemWidth > width - pad.right) {
      lx = pad.left;
      ly += 18;
    }
    ctx.fillStyle = color;
    ctx.fillRect(lx, ly, 10, 10);
    ctx.fillStyle = "#526b82";
    ctx.fillText(label, lx + 15, ly + 9);
    lx += itemWidth;
  });
  ctx.fillStyle = "#64748b";
  ctx.fillText(timeline[0] ?? "", pad.left, height - 12);
  ctx.textAlign = "right";
  ctx.fillText(timeline[timeline.length - 1] ?? "", width - pad.right, height - 12);
  ctx.textAlign = "left";
}

function referenceForecastRowsForCargo(cargo) {
  const rows = buildFcRows();
  if (!rows.length) return [];
  const startDate = dateFromISO(cargo.laycanStart);
  let start;
  let end;
  if (cargo.indexRule === "1 month before laycan") {
    const referenceMonth = addMonths(startDate, -1);
    start = startOfMonth(referenceMonth);
    end = endOfMonth(referenceMonth);
  } else {
    const weeks = cargo.indexRule === "3 weeks before laycan" ? 3 : 4;
    start = startOfWeekMonday(addDays(startDate, -7 * weeks));
    end = endOfWeekMonday(addDays(startDate, -7));
  }
  const matched = rows.filter((row) => sameOrBetween(dateFromISO(row.date), start, end));
  if (matched.length) return matched;
  const firstMonth = dateFromISO(rows[0].date);
  return rows.filter((row) => {
    const date = dateFromISO(row.date);
    return date.getUTCFullYear() === firstMonth.getUTCFullYear() && date.getUTCMonth() === firstMonth.getUTCMonth();
  });
}

function forecastAveragesForCargo(cargo) {
  const rows = referenceForecastRowsForCargo(cargo);
  const latest = latestIndices();
  return {
    avgIci2: averageValues(rows.map((row) => numericOrNull(row.ici2))) ?? latest?.ici2 ?? 0,
    avgIci3: averageValues(rows.map((row) => numericOrNull(row.ici3))) ?? latest?.ici3 ?? 0,
    avgIci4: averageValues(rows.map((row) => numericOrNull(row.ici4))) ?? latest?.ici4 ?? 0,
    avgIci5: averageValues(rows.map((row) => numericOrNull(row.ici5))) ?? latest?.ici5 ?? 0,
  };
}

function forecastSettlementForCargo(cargo, averages) {
  const parsed = parseFormula(cargo.priceFormula || "");
  if (!parsed || !averages) return null;
  return estimateIndexWithAverages(cargo, parsed, averages);
}

function referencedIciLabels(formula) {
  const labels = [...String(formula || "").toUpperCase().matchAll(/ICI\s*([2-5])/g)].map((match) => `ICI${match[1]}`);
  return [...new Set(labels)];
}

function formatAverageSummary(averages, labels) {
  const keys = { ICI2: "avgIci2", ICI3: "avgIci3", ICI4: "avgIci4", ICI5: "avgIci5" };
  const selected = labels.length ? labels : ["ICI2", "ICI3", "ICI4", "ICI5"];
  return selected.map((label) => `${label} ${nf2.format(averages[keys[label]] ?? 0)}`).join(" · ");
}

function renderForecastScenario() {
  // Base label
  const latest = latestIndices();
  if (els.fcBaseLabel) {
    els.fcBaseLabel.textContent = latest ? `Base: ${latest.publicationDate} · ICI3 $${nf2.format(latest.ici3)}/t` : "No data";
  }

  // Trend selector
  if (els.trendSelector) {
    const trendModes = [
      { key: "flat", label: "Flat" },
      { key: "up1", label: "+$1/wk" },
      { key: "dn1", label: "−$1/wk" },
      { key: "up2", label: "+$2/wk" },
      { key: "dn2", label: "−$2/wk" },
    ];
    els.trendSelector.innerHTML = trendModes
      .map(
        (m) =>
          `<button class="tab${state.trendMode === m.key ? " is-active" : ""}" data-trend="${m.key}" type="button">${m.label}</button>`,
      )
      .join("");
  }

  // Period label
  if (els.fcPeriodLabel) {
    const allRows = buildFcRows();
    if (allRows.length >= 2) {
      const first = dateFromISO(allRows[0].date);
      const last = dateFromISO(allRows[allRows.length - 1].date);
      const firstLabel = `${monthNames[first.getUTCMonth()]} ${first.getUTCFullYear()}`;
      const lastLabel = `${monthNames[last.getUTCMonth()]} ${last.getUTCFullYear()}`;
      els.fcPeriodLabel.textContent =
        firstLabel === lastLabel
          ? `${firstLabel} · Weekly ICI Forecast`
          : `${firstLabel} – ${lastLabel} · Weekly ICI Forecast`;
    } else {
      els.fcPeriodLabel.textContent = "Weekly ICI Forecast";
    }
  }

  // Update history toggle label
  const histToggle = document.querySelector("#fcHistoryToggle");
  if (histToggle) histToggle.textContent = state.showFcHistory ? "Hide history" : "Show history";

  // Shift selector
  if (els.fcShiftSelector) {
    const shifts = [
      { v: 2, label: "+$2/t", cls: "positive" },
      { v: 1, label: "+$1/t", cls: "positive" },
      { v: 0, label: "Base", cls: "base" },
      { v: -1, label: "−$1/t", cls: "negative" },
      { v: -2, label: "−$2/t", cls: "negative" },
    ];
    els.fcShiftSelector.innerHTML = shifts
      .map(
        (s) =>
          `<button class="tab ${s.cls}${state.priceShift === s.v ? " is-active" : ""}" data-shift="${s.v}" type="button">${s.label}</button>`,
      )
      .join("");
  }

  // Forecast column header label
  if (els.fcForecastColHeader) {
    const sh = state.priceShift;
    els.fcForecastColHeader.textContent =
      sh === 0 ? "Forecast $/t" : `Forecast $/t (${sh > 0 ? "+" : ""}$${Math.abs(sh)})`;
  }

  renderFcMatrix();
  renderFcAverages();
  renderFcSettlement();
}

function renderFcMatrix() {
  if (!els.fcMatrixBody) return;
  const allRows = buildFcRows();

  // Group rows by year-month
  const groups = [];
  let currentKey = null;
  allRows.forEach((row) => {
    const d = dateFromISO(row.date);
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
    if (key !== currentKey) {
      currentKey = key;
      groups.push({ year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, rows: [] });
    }
    groups[groups.length - 1].rows.push(row);
  });

  let html = "";
  groups.forEach(({ year, month, rows: groupRows }) => {
    // Month section header
    html += `<tr class="fc-month-row">
      <td class="fc-td" colspan="8">${monthNamesLong[month - 1]} ${year}</td>
    </tr>`;

    groupRows.forEach((row, idx) => {
      const wk = idx + 1;
      const rowClass = row.isActual ? "fc-row-actual" : "fc-row-forecast";
      if (row.isActual) {
        html += `<tr class="${rowClass}">
          <td class="fc-td fc-col-month"></td>
          <td class="fc-td fc-col-wk">${wk}</td>
          <td class="fc-td fc-col-date">${row.date}</td>
          <td class="fc-td numeric">${row.ici2 != null ? nf2.format(row.ici2) : "—"}</td>
          <td class="fc-td numeric">${row.ici3 != null ? nf2.format(row.ici3) : "—"}</td>
          <td class="fc-td numeric">${row.ici4 != null ? nf2.format(row.ici4) : "—"}</td>
          <td class="fc-td numeric">${row.ici5 != null ? nf2.format(row.ici5) : "—"}</td>
          <td class="fc-td" style="color:var(--muted);font-size:11px;">actual</td>
        </tr>`;
      } else {
        html += `<tr class="${rowClass}">
          <td class="fc-td fc-col-month"></td>
          <td class="fc-td fc-col-wk">${wk}</td>
          <td class="fc-td fc-col-date">${row.date}</td>
          <td class="fc-td numeric"><input class="fc-input" data-fc-date="${row.date}" data-fc-field="ici2" type="number" step="0.01" value="${row.ici2 != null ? row.ici2 : ""}"></td>
          <td class="fc-td numeric"><input class="fc-input" data-fc-date="${row.date}" data-fc-field="ici3" type="number" step="0.01" value="${row.ici3 != null ? row.ici3 : ""}"></td>
          <td class="fc-td numeric"><input class="fc-input" data-fc-date="${row.date}" data-fc-field="ici4" type="number" step="0.01" value="${row.ici4 != null ? row.ici4 : ""}"></td>
          <td class="fc-td numeric"><input class="fc-input" data-fc-date="${row.date}" data-fc-field="ici5" type="number" step="0.01" value="${row.ici5 != null ? row.ici5 : ""}"></td>
          <td class="fc-td"><input class="fc-input fc-note-input" data-fc-date="${row.date}" data-fc-field="note" type="text" placeholder="note…" value="${escapeHtml(row.note || "")}"></td>
        </tr>`;
      }
    });
  });

  els.fcMatrixBody.innerHTML = html || `<tr><td colspan="8" class="empty-cell">No data</td></tr>`;
}

function renderFcAverages() {
  if (!els.fcAvgBody) return;
  const allRows = buildFcRows();

  // Group by year-month
  const groups = [];
  let currentKey = null;
  allRows.forEach((row) => {
    const d = dateFromISO(row.date);
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
    if (key !== currentKey) {
      currentKey = key;
      groups.push({ year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, rows: [] });
    }
    groups[groups.length - 1].rows.push(row);
  });

  const fmt = (v) => (v != null ? nf2.format(v) : "—");

  els.fcAvgBody.innerHTML = groups
    .map(({ year, month, rows: groupRows }) => {
      const avg2 = averageValues(groupRows.map((r) => numericOrNull(r.ici2)));
      const avg3 = averageValues(groupRows.map((r) => numericOrNull(r.ici3)));
      const avg4 = averageValues(groupRows.map((r) => numericOrNull(r.ici4)));
      const avg5 = averageValues(groupRows.map((r) => numericOrNull(r.ici5)));
      const hasActual = groupRows.some((r) => r.isActual);
      const hasForecast = groupRows.some((r) => !r.isActual);
      const tag = hasActual && hasForecast ? "partial" : hasActual ? "actual" : "forecast";
      return `<tr class="fc-avg-row">
        <td class="fc-td">${monthNames[month - 1]} ${year} <span style="color:var(--muted);font-size:11px;font-weight:400">(${tag})</span></td>
        <td class="fc-td numeric">${fmt(avg2)}</td>
        <td class="fc-td numeric">${fmt(avg3)}</td>
        <td class="fc-td numeric">${fmt(avg4)}</td>
        <td class="fc-td numeric">${fmt(avg5)}</td>
        <td class="fc-td numeric" style="color:var(--muted)">${groupRows.length}</td>
      </tr>`;
    })
    .join("") || `<tr><td colspan="6" class="empty-cell">No data</td></tr>`;
}

function renderFcSettlement() {
  if (!els.fcSettlementBody) return;
  const indexCargos = data.cargos
    .filter((c) => c.purchaseType === "index" && c.year === state.year && c.status !== "sold")
    .sort((a, b) => (a.month || 0) - (b.month || 0) || (a.id || "").localeCompare(b.id || ""));

  if (!indexCargos.length) {
    els.fcSettlementBody.innerHTML = `<tr><td colspan="11" class="empty-cell">No unsold index-linked cargo for ${state.year}</td></tr>`;
    return;
  }

  els.fcSettlementBody.innerHTML = indexCargos
    .map((cargo) => {
      const averages = forecastAveragesForCargo(cargo);
      const sh = state.priceShift;
      const shiftedAverages = sh === 0 ? averages : {
        avgIci2: averages.avgIci2 + sh,
        avgIci3: averages.avgIci3 + sh,
        avgIci4: averages.avgIci4 + sh,
        avgIci5: averages.avgIci5 + sh,
      };
      const settlement = forecastSettlementForCargo(cargo, shiftedAverages);
      const latestEstimate = estimateIndexWithLatest(cargo);
      const change =
        Number.isFinite(settlement) && Number.isFinite(latestEstimate) ? settlement - latestEstimate : null;
      const changeClass = change > 0 ? "positive-text" : change < 0 ? "negative-text" : "";
      const labels = referencedIciLabels(cargo.priceFormula);
      const laycan = formatLaycan(cargo.laycanStart, cargo.laycanEnd);
      return `<tr>
        <td class="fc-td">${escapeHtml(cargo.id || "")}</td>
        <td class="fc-td">${escapeHtml(cargo.mine || "—")}</td>
        <td class="fc-td numeric">${escapeHtml(heatLabelForSpec(cargo.spec))}</td>
        <td class="fc-td" style="white-space:nowrap">${laycan}</td>
        <td class="fc-td">${escapeHtml(pricingPeriodLabel(cargo))}</td>
        <td class="fc-td"><span class="price-cell" title="${escapeHtml(cargo.priceFormula || "")}">${escapeHtml(cargo.priceFormula || "—")}</span></td>
        <td class="fc-td numeric">${formatQuantity(cargo.quantityMt)}</td>
        <td class="fc-td"><span class="price-cell" title="${escapeHtml(formatAverageSummary(averages, labels))}">${escapeHtml(formatAverageSummary(averages, labels))}</span></td>
        <td class="fc-td numeric">${latestEstimate == null ? "—" : `$${nf2.format(latestEstimate)}`}</td>
        <td class="fc-td numeric"><strong>${settlement == null ? "—" : `$${nf2.format(settlement)}`}</strong></td>
        <td class="fc-td numeric ${changeClass}">${change == null ? "—" : (change >= 0 ? "+" : "") + nf2.format(change)}</td>
      </tr>`;
    })
    .join("");
}

function addForecastWeek() {
  const rows = forecastRows();
  const last = rows[rows.length - 1];
  const latest = latestIndices();
  const nextDate = last ? addDays(dateFromISO(last.date), 7) : addDays(dateFromISO(latest.publicationDate), 7);
  rows.push({
    date: toISO(nextDate),
    ici2: last?.ici2 ?? latest.ici2,
    ici3: last?.ici3 ?? latest.ici3,
    ici4: last?.ici4 ?? latest.ici4,
    ici5: last?.ici5 ?? latest.ici5,
    note: "",
  });
  state.ici3ForecastRows = normalizeForecastRows(rows);
  renderFcMatrix();
  renderFcAverages();
  renderFcSettlement();
}

async function saveForecastScenario() {
  data.contractForecast = {
    updatedAt: new Date().toISOString(),
    rows: forecastRows(),
  };
  els.forecastStatus.textContent = "Saving forecast...";
  try {
    const result = await persistData();
    els.forecastStatus.textContent = result.mode === "shared" ? "Forecast saved" : "Forecast saved locally";
    renderStatusLine();
  } catch (error) {
    els.forecastStatus.textContent = error.message;
  }
}

function forSaleCurrentBenchmarkPrice(cargo) {
  if (cargo.purchaseType === "fixed") return Number.isFinite(cargo.priceFixed) ? cargo.priceFixed : null;
  return estimateIndexWithLatest(cargo);
}

function heatTierForSpec(spec) {
  const normalized = String(spec || "").toUpperCase();
  const heat = extractHeatValue(normalized);
  if (!Number.isFinite(heat)) return { key: "unknown", label: "Unclassified Heat Value", order: 9 };
  const basis = normalized.includes("GAR") ? "GAR" : normalized.includes("NAR") ? "NAR" : "";
  const narEquivalent = basis === "GAR" ? heat - 400 : heat;
  if (narEquivalent > 5500) return { key: "high", label: "High Heat Value (> NAR5500)", order: 1 };
  if (narEquivalent >= 5000) return { key: "medium", label: "Medium Heat Value (NAR5000-NAR5500)", order: 2 };
  return { key: "low", label: "Low Heat Value (< NAR5000)", order: 3 };
}

function isThirdCountryTradePlan(cargo) {
  const mine = String(cargo.mine || "").toLowerCase();
  const spec = heatLabelForSpec(cargo.spec);
  if (mine === "bayan" && spec === "GAR3800") return true;
  if (cargo.month === 6 && mine.includes("diza")) return true;
  if (cargo.month === 6 && mine === "mbl") return true;
  if (cargo.month === 6 && mine === "ptba") return true;
  return false;
}

function forSalePlanRows() {
  const yearCargos = data.cargos.filter((cargo) => cargo.year === state.year);
  const forSaleMonths = yearCargos.filter((cargo) => cargo.status === "forsale").map((cargo) => cargo.month);
  const planHorizonStart = forSaleMonths.length ? Math.min(...forSaleMonths) : 1;
  const statusOrder = { forsale: 0, sold: 1 };
  return yearCargos
    .filter(
      (cargo) =>
        cargo.status === "forsale" ||
        (cargo.status === "sold" && cargo.month >= planHorizonStart),
    )
    .sort((a, b) => {
      const aHeat = heatTierForSpec(a.spec);
      const bHeat = heatTierForSpec(b.spec);
      return (
        a.month - b.month ||
        (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9) ||
        bHeat.order - aHeat.order ||
        dateFromISO(a.laycanStart) - dateFromISO(b.laycanStart) ||
        a.mine.localeCompare(b.mine)
      );
    })
    .map((cargo) => {
      const settlement = forSaleCurrentBenchmarkPrice(cargo);
      const heatTier = heatTierForSpec(cargo.spec);
      return {
        id: cargo.id,
        year: cargo.year,
        month: cargo.month,
        groupYear: cargo.year,
        groupMonth: cargo.month,
        status: cargo.status,
        statusLabel: labelForStatus(cargo.status),
        mine: cargo.mine,
        spec: heatLabelForSpec(cargo.spec),
        heatTierKey: heatTier.key,
        heatTierLabel: heatTier.label,
        heatTierOrder: heatTier.order,
        tradeTag: isThirdCountryTradePlan(cargo) ? "3국" : "",
        quantityMt: cargo.quantityMt,
        type: labelForType(cargo.purchaseType),
        priceOrFormula: cargo.purchaseType === "fixed" ? formatPricePerTon(cargo.priceFixed) : cargo.priceFormula || "",
        indexReference: indexReferenceSnapshot(cargo).display,
        currentBenchmarkPrice: Number.isFinite(settlement) ? formatPricePerTon(settlement) : "",
        specialTerms: cargo.specialTerms || "",
        salesRemark: cargo.salesRemark || cargo.saleRemark || "",
        laycanStatus: cargo.laycanConfirmed ? "Confirmed" : "Tentative",
        laycan: loadingWindow(cargo),
      };
    });
}

function csvText(rows) {
  const headers = ["Month", "Status", "Heat Value Tier", "Mine", "Trade", "Spec", "Qty MT", "Type", "Price or Formula", "Latest Index Reference", "Current Benchmark Price $/t", "Sales Remark", "Special Terms", "Laycan Status", "Laycan"];
  const csvRows = [
    headers,
    ...rows.map((row) => [
      `${monthNamesLong[row.groupMonth - 1]} ${row.groupYear}`,
      row.statusLabel,
      row.heatTierLabel,
      row.mine,
      row.tradeTag,
      row.spec,
      row.quantityMt,
      row.type,
      row.priceOrFormula,
      row.indexReference,
      row.currentBenchmarkPrice,
      row.salesRemark,
      row.specialTerms,
      row.laycanStatus,
      row.laycan,
    ]),
  ];
  return csvRows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\n");
}

function groupForSaleRows(rows) {
  const groups = [];
  rows.forEach((row) => {
    const key = `${row.groupYear}-${String(row.groupMonth).padStart(2, "0")}`;
    if (groups.at(-1)?.key !== key) {
      groups.push({ key, year: row.groupYear, month: row.groupMonth, rows: [] });
    }
    groups.at(-1).rows.push(row);
  });
  return groups;
}

function groupByHeatTier(rows) {
  const groups = new Map();
  rows.forEach((row) => {
    if (!groups.has(row.heatTierKey)) {
      groups.set(row.heatTierKey, { key: row.heatTierKey, label: row.heatTierLabel, order: row.heatTierOrder, rows: [] });
    }
    groups.get(row.heatTierKey).rows.push(row);
  });
  return [...groups.values()].sort((a, b) => a.order - b.order);
}

function compactQuantity(value) {
  return `${nf0.format((value || 0) / 1000)}k`;
}

function compactLaycan(cargo) {
  const fromDate = (value) => {
    const date = dateFromISO(value);
    return `${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  };
  const raw = cargo.notes || "";
  if (/^\d{1,2}[./-]\d{1,2}\s*[-~]\s*\d{1,2}[./-]\d{1,2}$/.test(raw)) {
    return raw.replace(/\./g, "/").replace(/\s+/g, "");
  }
  return `${fromDate(cargo.laycanStart)}-${fromDate(cargo.laycanEnd)}`;
}

function compactPriceOrFormula(cargo) {
  if (cargo.purchaseType === "fixed") return formatPricePerTon(cargo.priceFixed);
  const formula = String(cargo.priceFormula || "")
    .replace(/\s+/g, " ")
    .replace(/Prorate/gi, "Pro")
    .trim();
  const alreadyShowsPeriod = /(?:\d+\s*weeks?|\d+\s*month)\s+before\s+laycan/i.test(formula);
  const period = String(cargo.indexRule || "").trim();
  return period && !alreadyShowsPeriod ? `${formula} (${period})` : formula;
}

function exportSummaryMonthGroups(rows) {
  const groups = new Map();
  rows.forEach((row) => {
    const key = `${row.groupYear}-${String(row.groupMonth).padStart(2, "0")}`;
    if (!groups.has(key)) groups.set(key, { key, year: row.groupYear, month: row.groupMonth, rows: [] });
    groups.get(key).rows.push(row);
  });
  return [...groups.values()].sort((a, b) => a.year - b.year || a.month - b.month);
}

function exportForSalePlanSummary() {
  const rows = forSalePlanRows().map((row) => {
    const cargo = data.cargos.find((item) => item.id === row.id);
    return {
      ...row,
      compactQty: compactQuantity(row.quantityMt),
      compactPrice: cargo ? compactPriceOrFormula(cargo) : row.priceOrFormula,
      compactLaycan: cargo ? compactLaycan(cargo) : row.laycan,
      isFixed: row.type === "Fixed",
    };
  });
  const monthGroups = exportSummaryMonthGroups(rows);
  const maxRows = Math.max(0, ...monthGroups.map((group) => group.rows.length));
  const latest = latestIndices();
  const updated = formatGeneratedAt(data.generatedAt);
  const totalQty = sumQty(rows);
  const soldRows = rows.filter((row) => row.status === "sold");
  const availableRows = rows.filter((row) => row.status === "forsale");
  const soldQty = sumQty(soldRows);
  const availableQty = sumQty(availableRows);
  const reportHtml = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>KCH Sale Plan Summary ${state.year}</title>
  <style>
    :root { --navy:#08233f; --line:#bfd7e8; --head:#eaf5fb; --high:#f1edff; --medium:#e8f7ff; --low:#e9fbf4; --muted:#526b82; }
    * { box-sizing:border-box; }
    body { margin:0; background:#eef7fb; color:var(--navy); font-family:Arial, "Microsoft YaHei", sans-serif; }
    .page { margin:0 auto; max-width:1480px; padding:14px; }
    .sheet { background:#fff; border:1px solid var(--line); box-shadow:0 8px 22px rgba(8,35,63,.08); padding:14px; }
    header { align-items:flex-end; display:flex; justify-content:space-between; gap:12px; margin-bottom:10px; }
    h1 { font-size:20px; margin:0 0 4px; }
    p { color:var(--muted); font-size:12px; margin:0; }
    .actions { display:flex; gap:6px; }
    button { background:#fff; border:1px solid var(--line); border-radius:6px; color:var(--navy); cursor:pointer; height:30px; padding:0 10px; }
    button.primary { background:#0077b6; border-color:#0077b6; color:#fff; }
    .legend { align-items:center; display:flex; flex-wrap:wrap; gap:6px; margin:8px 0 10px; }
    .legend span { border:1px solid var(--line); border-radius:999px; color:#315a76; font-size:10px; font-weight:700; padding:3px 8px; }
    .legend .high { background:var(--high); }
    .legend .medium { background:var(--medium); }
    .legend .low { background:var(--low); }
    .legend .fix { background:#fff; }
    .remark { color:#8a4b00; display:block; font-size:10px; font-weight:800; margin-top:2px; overflow-wrap:anywhere; }
    table { border-collapse:collapse; table-layout:fixed; width:100%; }
    th, td { border:1px solid var(--line); padding:5px 6px; vertical-align:top; }
    th { background:var(--head); color:#315a76; font-size:12px; text-align:center; }
    th.no, td.no { width:42px; text-align:center; }
    td { font-size:11px; height:54px; }
    .cargo-cell { line-height:1.28; }
    .cargo-cell.high { background:var(--high); }
    .cargo-cell.medium { background:var(--medium); }
    .cargo-cell.low { background:var(--low); }
    .line1 { font-weight:800; }
    .line2 { font-family:"Cascadia Code", Consolas, monospace; overflow-wrap:anywhere; }
    .line3 { color:var(--muted); }
    .badge { background:#dff4ff; border:1px solid #a8def8; border-radius:999px; color:#0369a1; display:inline-block; font-size:9px; font-weight:800; margin-left:4px; padding:1px 5px; }
    .fix-badge { background:#fff7ed; border-color:#fed7aa; color:#c2410c; }
    .status-sold { background:#dcfce7; border-color:#86efac; color:#166534; }
    .status-forsale { background:#fff7ed; border-color:#fdba74; color:#9a3412; }
    .cv-label { color:#315a76; display:block; font-size:10px; font-weight:800; margin-top:2px; }
    body.screenshot-mode { background:#fff; }
    body.screenshot-mode .page { max-width:none; padding:0; }
    body.screenshot-mode .sheet { border:0; box-shadow:none; }
    body.screenshot-mode .actions { display:none; }
    body.screenshot-mode header { align-items:flex-start; }
    @media print {
      body { background:#fff; }
      .page { max-width:none; padding:0; }
      .sheet { border:0; box-shadow:none; }
      .actions { display:none; }
    }
  </style>
</head>
<body>
  <main class="page">
    <section class="sheet">
      <header>
        <div>
          <h1>KCH Sale Plan · Updated ${escapeHtml(updated)}</h1>
          <p>Total: ${formatQuantity(totalQty)} · Sold ${formatQuantity(soldQty)} (${soldRows.length}c) · For Sale ${formatQuantity(availableQty)} (${availableRows.length}c) · Argus latest ${escapeHtml(latest?.publicationDate || "N/A")}</p>
          <div class="legend" aria-label="Legend">
            <span class="high">High CV &gt; NAR5500</span>
            <span class="medium">Medium CV NAR5000-NAR5500</span>
            <span class="low">Low CV &lt; NAR5000</span>
            <span class="fix">FIX = Fixed price</span>
            <span class="status-sold">SOLD</span>
            <span class="status-forsale">FOR SALE</span>
          </div>
        </div>
        <div class="actions">
          <button class="primary" id="downloadPngButton">Download PNG</button>
          <button id="screenshotModeButton">Screenshot View</button>
          <button id="detailViewButton">Detail View</button>
          <button onclick="window.close()">Back</button>
          <span id="copyStatus" style="color:#526b82;font-size:11px;align-self:center"></span>
        </div>
      </header>
      ${
        monthGroups.length
          ? `<table>
              <thead>
                <tr>
                  <th class="no">No</th>
                  ${monthGroups.map((group) => `<th>${monthNames[group.month - 1]} ${group.year}<br>${formatQuantity(sumQty(group.rows))} · ${group.rows.length}c</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${Array.from({ length: maxRows }, (_, index) => `
                  <tr>
                    <td class="no">${index + 1}</td>
                    ${monthGroups
                      .map((group) => {
                        const row = group.rows[index];
                        if (!row) return "<td></td>";
                        const cls = row.heatTierKey;
                        return `<td class="cargo-cell ${cls}" data-mine="${escapeHtml(row.mine)}" data-spec="${escapeHtml(row.spec)}" data-fixed="${row.isFixed ? "1" : ""}" data-trade="${escapeHtml(row.tradeTag || "")}">
                          <div class="line1">${escapeHtml(row.mine)} ${escapeHtml(row.spec)}<span class="badge status-${escapeHtml(row.status)}">${escapeHtml(row.statusLabel.toUpperCase())}</span>${row.isFixed ? `<span class="badge fix-badge">FIX</span>` : ""}${row.tradeTag ? `<span class="badge">${escapeHtml(row.tradeTag)}</span>` : ""}</div>
                          <div class="line2">${escapeHtml(row.compactQty)} · ${escapeHtml(row.compactPrice)}</div>
                          <div class="line3">${escapeHtml(row.laycanStatus)} ${escapeHtml(row.compactLaycan)}${row.specialTerms ? ` · ${escapeHtml(row.specialTerms)}` : ""}</div>
                          ${row.salesRemark ? `<span class="remark">${escapeHtml(row.salesRemark)}</span>` : ""}
                          <span class="cv-label">${row.heatTierKey === "high" ? "High CV" : row.heatTierKey === "medium" ? "Medium CV" : row.heatTierKey === "low" ? "Low CV" : "CV"}</span>
                        </td>`;
                      })
                      .join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>`
          : `<p>No Sold or For Sale cargos in the active plan horizon for ${state.year}.</p>`
      }
    </section>
  </main>
  <script>
    async function renderScreenshotPng() {
      const table = document.querySelector("table");
      if (!table) throw new Error("No table to render");
      const headerTitle = document.querySelector("h1")?.textContent || "KCH Sale Plan";
      const headerMeta = document.querySelector("header p")?.textContent || "";
      const headerCells = Array.from(table.querySelectorAll("thead th")).map((th) => th.innerText.trim());
      const bodyRows = Array.from(table.querySelectorAll("tbody tr"));
      const monthCount = Math.max(headerCells.length - 1, 1);
      const noW = 44;
      const colW = 295;
      const rowH = 74;
      const headH = 108;
      const tableHeadH = 40;
      const width = noW + monthCount * colW + 28;
      const height = headH + tableHeadH + bodyRows.length * rowH + 28;
      const canvas = document.createElement("canvas");
      const scale = 2;
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      const colors = {
        line: "#bfd7e8",
        navy: "#08233f",
        muted: "#526b82",
        head: "#eaf5fb",
        high: "#f1edff",
        medium: "#e8f7ff",
        low: "#e9fbf4",
      };
      function text(value, x, y, opts) {
        opts = opts || {};
        ctx.fillStyle = opts.color || colors.navy;
        ctx.font = (opts.weight || "400") + " " + (opts.size || 12) + "px Arial, sans-serif";
        ctx.textAlign = opts.align || "left";
        ctx.textBaseline = "top";
        ctx.fillText(value, x, y);
      }
      function wrap(value, x, y, maxW, lineH, maxLines, opts) {
        const words = String(value || "").split(/\\s+/);
        let line = "";
        let lines = [];
        words.forEach((word) => {
          const test = line ? line + " " + word : word;
          if (ctx.measureText(test).width > maxW && line) {
            lines.push(line);
            line = word;
          } else {
            line = test;
          }
        });
        if (line) lines.push(line);
        lines.slice(0, maxLines).forEach((item, index) => text(item, x, y + index * lineH, opts));
      }
      function rect(x, y, w, h, fill) {
        ctx.fillStyle = fill;
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = colors.line;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, w, h);
      }
      function badge(label, x, y, opts) {
        opts = opts || {};
        ctx.font = "800 9px Arial, sans-serif";
        const w = Math.ceil(ctx.measureText(label).width) + 10;
        ctx.fillStyle = opts.fill || "#dff4ff";
        ctx.strokeStyle = opts.stroke || "#a8def8";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x, y, w, 13, 6);
        ctx.fill();
        ctx.stroke();
        text(label, x + 5, y + 2, { size: 9, weight: "800", color: opts.color || "#0369a1" });
        return w;
      }

      text(headerTitle, 14, 14, { size: 20, weight: "800" });
      text(headerMeta, 14, 42, { size: 12, color: colors.muted });
      const legends = [
        ["High CV > NAR5500", colors.high],
        ["Medium CV NAR5000-NAR5500", colors.medium],
        ["Low CV < NAR5000", colors.low],
        ["FIX = Fixed price", "#ffffff"],
      ];
      let lx = 14;
      legends.forEach((item) => {
        const w = ctx.measureText(item[0]).width + 18;
        rect(lx, 64, w, 18, item[1]);
        text(item[0], lx + 9, 68, { size: 10, weight: "700", color: "#315a76" });
        lx += w + 6;
      });

      let x = 14;
      const y0 = headH;
      rect(x, y0, noW, tableHeadH, colors.head);
      text(headerCells[0] || "No", x + noW / 2, y0 + 13, { size: 12, weight: "700", align: "center", color: "#315a76" });
      x += noW;
      headerCells.slice(1).forEach((cell) => {
        rect(x, y0, colW, tableHeadH, colors.head);
        const parts = cell.split("\\n");
        text(parts[0] || "", x + colW / 2, y0 + 7, { size: 12, weight: "700", align: "center", color: "#315a76" });
        text(parts[1] || "", x + colW / 2, y0 + 22, { size: 11, weight: "700", align: "center", color: "#08233f" });
        x += colW;
      });

      bodyRows.forEach((tr, rowIndex) => {
        const y = y0 + tableHeadH + rowIndex * rowH;
        const cells = Array.from(tr.children);
        rect(14, y, noW, rowH, "#ffffff");
        text(cells[0]?.innerText.trim() || String(rowIndex + 1), 14 + noW / 2, y + 8, { size: 11, align: "center" });
        let cx = 14 + noW;
        cells.slice(1).forEach((td) => {
          const bg = td.classList.contains("high") ? colors.high : td.classList.contains("medium") ? colors.medium : td.classList.contains("low") ? colors.low : "#ffffff";
          rect(cx, y, colW, rowH, bg);
          const mineSpec = ((td.dataset.mine || "") + " " + (td.dataset.spec || "")).trim();
          const line2 = td.querySelector(".line2")?.innerText.trim() || "";
          const line3 = td.querySelector(".line3")?.innerText.trim() || "";
          const cv = td.querySelector(".cv-label")?.innerText.trim() || "";
          text(mineSpec, cx + 7, y + 7, { size: 11, weight: "800" });
          let badgeX = cx + 7 + ctx.measureText(mineSpec).width + 8;
          if (td.dataset.fixed) badgeX += badge("FIX", badgeX, y + 7, { fill: "#fff7ed", stroke: "#fed7aa", color: "#c2410c" }) + 4;
          if (td.dataset.trade) badge(td.dataset.trade, badgeX, y + 7);
          wrap(line2, cx + 7, y + 22, colW - 14, 12, 2, { size: 10, weight: "700" });
          text(line3, cx + 7, y + 47, { size: 10, color: colors.muted });
          text(cv, cx + 7, y + 60, { size: 10, weight: "800", color: "#315a76" });
          cx += colW;
        });
      });
      return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    }
    function downloadPngFallback(pngBlob) {
      const url = URL.createObjectURL(pngBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "KCH_For_Sale_Plan_Summary.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    async function copyScreenshotView() {
      const status = document.getElementById("copyStatus");
      const oldStatus = status.textContent;
      status.textContent = "Rendering...";
      let pngBlob = null;
      try {
        pngBlob = await renderScreenshotPng();
        status.textContent = "Copying...";
        if (!navigator.clipboard || !window.ClipboardItem) {
          throw new Error("Image clipboard is not available in this browser");
        }
        await navigator.clipboard.write([new ClipboardItem({ "image/png": pngBlob })]);
        status.textContent = "Copied. Paste into Telegram.";
      } catch (error) {
        if (pngBlob) {
          downloadPngFallback(pngBlob);
          status.textContent = "Clipboard blocked. PNG downloaded.";
        } else {
          status.textContent = "Clipboard blocked. Use Download PNG.";
        }
      }
      setTimeout(() => {
        if (status.textContent) status.textContent = oldStatus || "";
      }, 4500);
    }
    async function downloadScreenshotView() {
      const status = document.getElementById("copyStatus");
      const oldStatus = status.textContent;
      status.textContent = "Rendering PNG...";
      try {
        const pngBlob = await renderScreenshotPng();
        downloadPngFallback(pngBlob);
        status.textContent = "PNG downloaded.";
      } catch (error) {
        status.textContent = "PNG download failed. Use browser screenshot.";
      }
      setTimeout(() => {
        if (status.textContent) status.textContent = oldStatus || "";
      }, 4500);
    }
    document.getElementById("detailViewButton")?.addEventListener("click", function () {
      if (window.opener) {
        window.opener.postMessage({ type: "kch-export-for-sale-detail" }, "*");
        return;
      }
      const status = document.getElementById("copyStatus");
      status.textContent = "Open Detail from the Export menu.";
    });
    document.getElementById("screenshotModeButton")?.addEventListener("click", function () {
      document.body.classList.add("screenshot-mode");
    });
    document.getElementById("downloadPngButton")?.addEventListener("click", downloadScreenshotView);
  </script>
</body>
</html>`;

  const blob = new Blob([reportHtml], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}

function exportForSalePlan(mode = "detail", targetWindow = null) {
  if (mode === "summary") {
    exportForSalePlanSummary();
    return;
  }
  const rows = forSalePlanRows();
  const groups = groupForSaleRows(rows);
  const latest = latestIndices();
  const updated = formatGeneratedAt(data.generatedAt);
  const csv = csvText(rows);
  const csvLiteral = JSON.stringify(`\ufeff${csv}`);
  const fileName = `KCH_Sale_Plan_${state.year}.csv`;
  const totalQty = sumQty(rows);
  const soldRows = rows.filter((row) => row.status === "sold");
  const availableRows = rows.filter((row) => row.status === "forsale");
  const soldQty = sumQty(soldRows);
  const availableQty = sumQty(availableRows);
  const reportHtml = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>KCH Sale Plan ${state.year}</title>
  <style>
    :root { --navy:#08233f; --blue:#0077b6; --line:#d7e7f0; --soft:#f3f8fc; --muted:#526b82; }
    * { box-sizing:border-box; }
    body { margin:0; background:#edf6fa; color:var(--navy); font-family:Inter, Arial, sans-serif; }
    .page { max-width:1180px; margin:0 auto; padding:18px; }
    .report { background:#fff; border:1px solid var(--line); border-radius:10px; box-shadow:0 12px 32px rgba(8,35,63,.08); padding:24px; }
    header { align-items:center; border-bottom:2px solid var(--line); display:flex; gap:16px; justify-content:space-between; padding-bottom:16px; }
    .brand { align-items:center; display:flex; gap:14px; }
    .brand img { width:86px; height:auto; }
    h1 { font-size:30px; line-height:1; margin:0 0 7px; }
    p { color:var(--muted); font-size:13px; margin:0; }
    .actions { display:flex; gap:8px; }
    button { background:#fff; border:1px solid var(--line); border-radius:7px; color:var(--navy); cursor:pointer; height:34px; padding:0 12px; }
    button.primary { background:var(--blue); border-color:var(--blue); color:#fff; }
    body.screenshot-mode { background:#fff; }
    body.screenshot-mode .page { max-width:1180px; padding:0; }
    body.screenshot-mode .report { border:0; border-radius:0; box-shadow:none; }
    body.screenshot-mode .actions { display:none; }
    .summary { display:grid; gap:10px; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); margin:16px 0 18px; }
    .summary-card { background:var(--soft); border:1px solid var(--line); border-radius:8px; padding:12px; }
    .summary-card span { color:var(--muted); display:block; font-size:12px; margin-bottom:5px; }
    .summary-card strong { font-size:22px; }
    section { margin-top:18px; page-break-inside:avoid; }
    .month-head { align-items:end; display:flex; justify-content:space-between; margin-bottom:8px; }
    h2 { font-size:18px; margin:0; }
    .month-head span { color:var(--muted); font-size:13px; }
    .heat-section { margin-top:10px; }
    .heat-head { align-items:center; background:#eef7fc; border:1px solid var(--line); border-bottom:0; border-radius:8px 8px 0 0; display:flex; justify-content:space-between; padding:7px 9px; }
    .heat-head strong { font-size:13px; }
    .heat-head span { color:var(--muted); font-size:12px; }
    table { border-collapse:collapse; width:100%; }
    th, td { border-bottom:1px solid var(--line); padding:8px 9px; text-align:left; vertical-align:top; }
    th { background:var(--soft); color:#5f7e96; font-size:11px; font-weight:800; }
    td { font-size:12px; }
    .numeric { text-align:right; white-space:nowrap; }
    .mono { font-family:'Cascadia Code', Consolas, monospace; font-size:11px; }
    .mine { font-weight:800; }
    .tag { background:#e0f2fe; border:1px solid #bae6fd; border-radius:999px; color:#0369a1; display:inline-block; font-size:10px; font-weight:800; margin-left:6px; padding:2px 6px; vertical-align:middle; }
    .status-tag { border:1px solid; border-radius:999px; display:inline-block; font-size:10px; font-weight:800; padding:2px 7px; white-space:nowrap; }
    .status-tag.sold { background:#dcfce7; border-color:#86efac; color:#166534; }
    .status-tag.forsale { background:#fff7ed; border-color:#fdba74; color:#9a3412; }
    .empty { border:1px dashed var(--line); border-radius:8px; color:var(--muted); padding:28px; text-align:center; }
    @media print {
      body { background:#fff; }
      .page { max-width:none; padding:0; }
      .report { border:0; box-shadow:none; padding:0; }
      .actions { display:none; }
      section { break-inside:avoid; }
    }
  </style>
</head>
<body>
  <main class="page">
    <article class="report">
      <header>
        <div class="brand">
          <img src="${new URL("./kch-logo.png", window.location.href).href}" alt="KCH" />
          <div>
            <h1>KCH Sale Plan</h1>
            <p>Sold and available cargo plan · Updated ${escapeHtml(updated)} · Argus latest ${escapeHtml(latest?.publicationDate || "N/A")}</p>
          </div>
        </div>
        <div class="actions">
          <button onclick="document.body.classList.toggle('screenshot-mode')" class="primary">Long Screenshot View</button>
          <button onclick="window.print()">Print / Save as PDF</button>
          <button id="csvButton">Export CSV</button>
        </div>
      </header>
      <div class="summary">
        <div class="summary-card"><span>Total Plan Quantity</span><strong>${formatQuantity(totalQty)}</strong></div>
        <div class="summary-card"><span>Sold</span><strong>${formatQuantity(soldQty)}</strong></div>
        <div class="summary-card"><span>For Sale</span><strong>${formatQuantity(availableQty)}</strong></div>
        <div class="summary-card"><span>Cargos</span><strong>${nf0.format(rows.length)} (${soldRows.length} sold / ${availableRows.length} for sale)</strong></div>
        <div class="summary-card"><span>Plan Year</span><strong>${state.year}</strong></div>
      </div>
      ${
        groups.length
          ? groups
              .map((group) => {
                const qty = sumQty(group.rows);
                const heatGroups = groupByHeatTier(group.rows);
                return `
                  <section>
                    <div class="month-head">
                      <h2>${monthNamesLong[group.month - 1]} ${group.year}</h2>
                      <span>${formatQuantity(qty)} · ${group.rows.length} cargo${group.rows.length === 1 ? "" : "s"}</span>
                    </div>
                    ${heatGroups
                      .map(
                        (heatGroup) => `
                          <div class="heat-section">
                            <div class="heat-head">
                              <strong>${escapeHtml(heatGroup.label)}</strong>
                              <span>${formatQuantity(sumQty(heatGroup.rows))} · ${heatGroup.rows.length} cargo${heatGroup.rows.length === 1 ? "" : "s"}</span>
                            </div>
                            <table>
                              <thead>
                                <tr>
                                  <th>Status</th>
                                  <th>Mine</th>
                                  <th>Spec</th>
                                  <th class="numeric">Qty</th>
                                  <th>Type</th>
                                  <th>Price or Formula</th>
                                  <th class="numeric">Current Benchmark Price</th>
                                  <th>Sales Remark</th>
                                  <th>Laycan</th>
                                </tr>
                              </thead>
                              <tbody>
                                ${heatGroup.rows
                                  .map(
                                    (row) => `
                                      <tr>
                                        <td><span class="status-tag ${escapeHtml(row.status)}">${escapeHtml(row.statusLabel)}</span></td>
                                        <td class="mine">${escapeHtml(row.mine)}${row.tradeTag ? `<span class="tag">${escapeHtml(row.tradeTag)}</span>` : ""}</td>
                                        <td>${escapeHtml(row.spec)}</td>
                                        <td class="numeric">${formatQuantity(row.quantityMt)}</td>
                                        <td>${escapeHtml(row.type)}</td>
                                        <td class="mono">${escapeHtml(row.priceOrFormula)}</td>
                                        <td class="numeric">${escapeHtml(row.currentBenchmarkPrice || "-")}</td>
                                        <td>${escapeHtml(row.salesRemark || "-")}</td>
                                        <td>${escapeHtml(row.laycan)}</td>
                                      </tr>
                                    `,
                                  )
                                  .join("")}
                              </tbody>
                            </table>
                          </div>
                        `,
                      )
                      .join("")}
                  </section>
                `;
              })
              .join("")
          : `<div class="empty">No Sold or For Sale cargos in the active plan horizon for ${state.year}.</div>`
      }
    </article>
  </main>
  <script>
    document.getElementById("csvButton").addEventListener("click", function () {
      const blob = new Blob([${csvLiteral}], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = ${JSON.stringify(fileName)};
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    });
  </script>
</body>
</html>`;

  const blob = new Blob([reportHtml], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  if (targetWindow) {
    targetWindow.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function closeExportMenu() {
  document.querySelector(".export-menu")?.remove();
}

function toggleExportMenu() {
  const existing = document.querySelector(".export-menu");
  if (existing) {
    existing.remove();
    return;
  }
  const menu = document.createElement("div");
  menu.className = "export-menu";
  menu.innerHTML = `
    <button type="button" data-export-mode="summary">Export Sale Plan (Sold + For Sale) - Summary</button>
    <button type="button" data-export-mode="detail">Export Sale Plan (Sold + For Sale) - Detail</button>
  `;
  els.exportButton.insertAdjacentElement("afterend", menu);
  const containerRect = els.exportButton.parentElement.getBoundingClientRect();
  const buttonRect = els.exportButton.getBoundingClientRect();
  menu.style.left = `${buttonRect.left - containerRect.left}px`;
  menu.style.top = `${buttonRect.bottom - containerRect.top + 6}px`;
  menu.querySelectorAll("[data-export-mode]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      closeExportMenu();
      exportForSalePlan(button.dataset.exportMode);
    });
  });
}

function openIciForm() {
  const latest = latestIndices();
  els.ici.date.value = latest.publicationDate;
  els.ici.ici1.value = latest.ici1;
  els.ici.ici2.value = latest.ici2;
  els.ici.ici3.value = latest.ici3;
  els.ici.ici4.value = latest.ici4;
  els.ici.ici5.value = latest.ici5;
  els.iciSaveStatus.textContent = formSaveModeText();
  els.iciModal.hidden = false;
  els.ici.date.focus();
}

function closeIciForm() {
  els.iciModal.hidden = true;
  els.iciForm.reset();
  els.iciSaveStatus.textContent = "";
}

async function saveIciForm(event) {
  event.preventDefault();
  const publicationDate = els.ici.date.value;
  const date = dateFromISO(publicationDate);
  const entry = {
    id: `ici_${publicationDate}`,
    weekStart: toISO(startOfWeekMonday(date)),
    weekEnd: toISO(endOfWeekMonday(date)),
    ici1: Number(els.ici.ici1.value),
    ici2: Number(els.ici.ici2.value),
    ici3: Number(els.ici.ici3.value),
    ici4: Number(els.ici.ici4.value),
    ici5: Number(els.ici.ici5.value),
    publicationDate,
  };

  if ([entry.ici1, entry.ici2, entry.ici3, entry.ici4, entry.ici5].some((value) => !Number.isFinite(value))) {
    els.iciSaveStatus.textContent = "Enter all ICI values";
    return;
  }

  data.indices = data.indices.filter((item) => item.publicationDate !== publicationDate);
  data.indices.push(entry);
  data.indices.sort((a, b) => dateFromISO(a.publicationDate) - dateFromISO(b.publicationDate));

  try {
    const result = await persistData();
    closeIciForm();
    renderAll();
    els.importStatus.textContent = result.mode === "shared" ? "ICI updated" : "ICI updated locally";
  } catch (error) {
    els.iciSaveStatus.textContent = error.message;
  }
}

function setupFormOptions() {
  els.form.month.innerHTML = monthNames
    .map((name, index) => `<option value="${index + 1}">${name}</option>`)
    .join("");
}

function newCargoId() {
  return `u${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

function monthStartIso(year, month) {
  return `${year}-${String(month).padStart(2, "0")}-01`;
}

function openCargoForm(cargo = null) {
  const form = els.form;
  const isEdit = Boolean(cargo);
  const year = cargo?.year ?? state.year;
  const month = cargo?.month ?? (state.month === TOTAL_MONTH ? new Date().getMonth() + 1 : state.month);
  els.modalTitle.textContent = isEdit ? "Edit Cargo" : "Add Cargo";
  els.saveStatus.textContent = formSaveModeText();
  form.id.value = cargo?.id ?? "";
  form.year.value = year;
  form.month.value = month;
  form.status.value = cargo?.status ?? "forsale";
  form.type.value = cargo?.purchaseType ?? "fixed";
  form.mine.value = cargo?.mine ?? "";
  form.spec.value = cargo?.spec ?? "";
  form.quantity.value = cargo?.quantityMt ?? 80000;
  form.fixedPrice.value = cargo?.priceFixed ?? "";
  form.formula.value = cargo?.priceFormula ?? "";
  form.indexRule.value = cargo?.indexRule ?? "1 month before laycan";
  form.buyer.value = cargo?.buyer ?? "";
  form.laycanStart.value = cargo?.laycanStart ?? monthStartIso(year, month);
  form.laycanEnd.value = cargo?.laycanEnd ?? monthEndIso(year, month);
  form.laycanConfirmed.value = cargo?.laycanConfirmed ? "true" : "false";
  form.purchaseDate.value = cargo?.purchaseDate ?? toISO(new Date());
  form.specialTerms.value = cargo?.specialTerms ?? "";
  form.salesRemark.value = cargo?.salesRemark ?? cargo?.saleRemark ?? "";
  form.notes.value = cargo?.notes ?? "";
  els.deleteCargoButton.hidden = !isEdit;
  els.cargoModal.hidden = false;
  form.mine.focus();
}

function closeCargoForm() {
  els.cargoModal.hidden = true;
  els.cargoForm.reset();
  els.saveStatus.textContent = "";
}

function readCargoForm() {
  const form = els.form;
  const purchaseType = form.type.value;
  const cargo = {
    id: form.id.value || newCargoId(),
    year: Number(form.year.value),
    month: Number(form.month.value),
    laycanStart: form.laycanStart.value,
    laycanEnd: form.laycanEnd.value,
    laycanConfirmed: form.laycanConfirmed.value === "true",
    purchaseType,
    mine: form.mine.value.trim(),
    spec: form.spec.value.trim(),
    quantityMt: Number(form.quantity.value) || 0,
    status: form.status.value,
    buyer: form.status.value === "sold" ? form.buyer.value.trim() : "",
    purchaseDate: form.purchaseDate.value,
  };

  if (form.specialTerms.value.trim()) cargo.specialTerms = form.specialTerms.value.trim();
  if (form.salesRemark.value.trim()) cargo.salesRemark = form.salesRemark.value.trim();
  if (form.notes.value.trim()) cargo.notes = form.notes.value.trim();
  if (purchaseType === "fixed") {
    cargo.priceFixed = Number(form.fixedPrice.value) || 0;
  } else {
    cargo.priceFormula = form.formula.value.trim();
    cargo.indexRule = form.indexRule.value;
  }
  return cargo;
}

async function updateCargo(id, updates) {
  const index = data.cargos.findIndex((cargo) => cargo.id === id);
  if (index === -1) return;
  data.cargos[index] = { ...data.cargos[index], ...updates };
  await persistData();
  state.selectedId = id;
  refreshPeriodViews();
  renderStatusLine();
}

async function saveCargoFromForm(event) {
  event.preventDefault();
  const cargo = readCargoForm();
  const index = data.cargos.findIndex((item) => item.id === cargo.id);
  if (index >= 0) data.cargos[index] = cargo;
  else data.cargos.push(cargo);

  try {
    const result = await persistData();
    state.year = cargo.year;
    state.month = cargo.month;
    state.selectedId = cargo.id;
    closeCargoForm();
    refreshPeriodViews();
    renderMarketCards();
    renderStatusLine();
    els.saveStatus.textContent = result.mode === "shared" ? "Saved to shared data" : "Saved locally";
  } catch (error) {
    els.saveStatus.textContent = error.message;
  }
}

async function deleteCurrentCargo() {
  const id = els.form.id.value;
  if (!id) return;
  data.cargos = data.cargos.filter((cargo) => cargo.id !== id);
  try {
    await persistData();
    state.selectedId = null;
    closeCargoForm();
    refreshPeriodViews();
    renderStatusLine();
  } catch (error) {
    els.saveStatus.textContent = error.message;
  }
}

/* ── Cargo Detail Page (Procurement Pricing Workbench) ───────── */

function allReferenceRowsForCargo(cargo) {
  if (!cargo.laycanStart || !cargo.indexRule) return { rows: [], start: null, end: null };
  const startDate = dateFromISO(cargo.laycanStart);
  let start;
  let end;
  if (cargo.indexRule === "1 month before laycan") {
    const refMonth = addMonths(startDate, -1);
    start = startOfMonth(refMonth);
    end = endOfMonth(refMonth);
  } else {
    const weeks = cargo.indexRule === "3 weeks before laycan" ? 3 : 4;
    start = startOfWeekMonday(addDays(startDate, -7 * weeks));
    end = endOfWeekMonday(addDays(startDate, -7));
  }
  // Published actual ICI rows inside the pricing period
  const actualRows = (data.indices || [])
    .filter((r) => sameOrBetween(dateFromISO(r.publicationDate), start, end))
    .map((r) => ({ date: r.publicationDate, ici2: r.ici2, ici3: r.ici3, ici4: r.ici4, ici5: r.ici5, isActual: true }));
  const actualDates = new Set(actualRows.map((r) => r.date));
  // Forecast rows that fill in un-published dates
  const forecastRws = forecastRows()
    .filter((r) => sameOrBetween(dateFromISO(r.date), start, end) && !actualDates.has(r.date))
    .map((r) => ({ date: r.date, ici2: numericOrNull(r.ici2), ici3: numericOrNull(r.ici3), ici4: numericOrNull(r.ici4), ici5: numericOrNull(r.ici5), isActual: false }));
  const combined = [...actualRows, ...forecastRws].sort((a, b) => dateFromISO(a.date) - dateFromISO(b.date));
  return { rows: combined, start, end };
}

function cdpAveragesFromRows(rows) {
  const latest = latestIndices();
  return {
    avgIci2: averageValues(rows.map((r) => numericOrNull(r.ici2))) ?? latest?.ici2 ?? 0,
    avgIci3: averageValues(rows.map((r) => numericOrNull(r.ici3))) ?? latest?.ici3 ?? 0,
    avgIci4: averageValues(rows.map((r) => numericOrNull(r.ici4))) ?? latest?.ici4 ?? 0,
    avgIci5: averageValues(rows.map((r) => numericOrNull(r.ici5))) ?? latest?.ici5 ?? 0,
  };
}

function renderCdpReference(cargo) {
  const container = els.cdpRefTableContainer;
  if (!container) return;

  // Determine which ICI columns this cargo's formula actually uses
  const formulaLabels = referencedIciLabels(cargo.priceFormula || "");
  const iciKeys = formulaLabels.length ? formulaLabels.map((l) => l.toLowerCase()) : ["ici3"];

  // Update header label
  if (els.cdpRefTitle) {
    els.cdpRefTitle.textContent = `${formulaLabels.length ? formulaLabels.join(" / ") : "ICI"} Reference — Pricing Period`;
  }

  const { rows } = allReferenceRowsForCargo(cargo);
  const latest = latestIndices();

  if (!rows.length) {
    container.innerHTML = '<p style="padding:12px;color:var(--muted)">No reference data found for this cargo\'s pricing period.</p>';
    return;
  }

  // Compute per-column averages for display
  const avgMap = {};
  iciKeys.forEach((key) => {
    avgMap[key] = averageValues(rows.map((r) => numericOrNull(r[key])));
  });

  // Full averages (all 4 ICI) for formula evaluation
  const fullAvgs = {
    avgIci2: avgMap.ici2 ?? latest?.ici2 ?? 0,
    avgIci3: avgMap.ici3 ?? latest?.ici3 ?? 0,
    avgIci4: avgMap.ici4 ?? latest?.ici4 ?? 0,
    avgIci5: avgMap.ici5 ?? latest?.ici5 ?? 0,
  };
  const settlement = forecastSettlementForCargo(cargo, fullAvgs);

  // Table header — only relevant ICI columns
  const headerCols = iciKeys
    .map((k) => `<th class="fc-th numeric">${k.toUpperCase()} $/t</th>`)
    .join("");

  // Table body rows
  const bodyRows = rows
    .map((row) => {
      const valCols = iciKeys
        .map((key) => {
          const val = numericOrNull(row[key]);
          if (row.isActual) {
            return `<td class="fc-td numeric">${val != null ? `$${nf2.format(val)}` : "—"}</td>`;
          }
          return `<td class="fc-td numeric"><input class="fc-input cdp-ref-input"
            data-cdp-date="${row.date}" data-cdp-key="${key}"
            type="number" step="0.01" value="${val != null ? val : ""}"
            placeholder="—" /></td>`;
        })
        .join("");
      const badge = row.isActual
        ? `<span class="cdp-ref-badge actual">Actual</span>`
        : `<span class="cdp-ref-badge forecast">Forecast</span>`;
      return `<tr class="${row.isActual ? "" : "cdp-forecast-row"}"><td class="fc-td">${row.date}</td>${valCols}<td class="fc-td">${badge}</td></tr>`;
    })
    .join("");

  // Average row
  const avgCols = iciKeys
    .map(
      (key) =>
        `<td class="fc-td numeric"><strong data-cdp-avg="${key}">${avgMap[key] != null ? `$${nf2.format(avgMap[key])}` : "—"}</strong></td>`,
    )
    .join("");
  const avgRow = `<tr class="cdp-avg-row"><td class="fc-td" style="font-weight:600">Avg</td>${avgCols}<td class="fc-td"></td></tr>`;

  // Formula + settlement bar
  const formulaStr = escapeHtml(cargo.priceFormula || "");
  const settlStr = settlement != null ? `$${nf2.format(settlement)}/t` : "N/A";

  container.innerHTML = `<div class="table-wrap"><table class="fc-table">
    <thead><tr>
      <th class="fc-th" style="min-width:108px">Date</th>
      ${headerCols}
      <th class="fc-th" style="min-width:72px"></th>
    </tr></thead>
    <tbody>${bodyRows}${avgRow}</tbody>
  </table></div>
  <div class="cdp-formula-bar">
    <code class="cdp-formula-text">${formulaStr}</code>
    <strong class="cdp-settlement-val" data-cdp-settlement>${settlStr}</strong>
  </div>`;

  // Live recalculation: bind input events on forecast rows
  container.querySelectorAll(".cdp-ref-input").forEach((input) => {
    input.addEventListener("input", () => {
      const { cdpDate, cdpKey } = input.dataset;
      // Update the shared forecastRows state
      const fRow = forecastRows().find((r) => r.date === cdpDate);
      if (fRow) {
        fRow[cdpKey] = numericOrNull(input.value);
        state.ici3ForecastRows = normalizeForecastRows(forecastRows());
      }
      // Re-read rows and recompute (in-place update — no full re-render)
      const { rows: upd } = allReferenceRowsForCargo(cargo);
      const updAvgMap = {};
      iciKeys.forEach((key) => {
        updAvgMap[key] = averageValues(upd.map((r) => numericOrNull(r[key])));
      });
      // Update avg cells in-place
      iciKeys.forEach((key) => {
        const el = container.querySelector(`[data-cdp-avg="${key}"]`);
        if (el) el.textContent = updAvgMap[key] != null ? `$${nf2.format(updAvgMap[key])}` : "—";
      });
      // Update settlement in-place
      const updFullAvgs = {
        avgIci2: updAvgMap.ici2 ?? latest?.ici2 ?? 0,
        avgIci3: updAvgMap.ici3 ?? latest?.ici3 ?? 0,
        avgIci4: updAvgMap.ici4 ?? latest?.ici4 ?? 0,
        avgIci5: updAvgMap.ici5 ?? latest?.ici5 ?? 0,
      };
      const updSettlement = forecastSettlementForCargo(cargo, updFullAvgs);
      const settlEl = container.querySelector("[data-cdp-settlement]");
      if (settlEl) settlEl.textContent = updSettlement != null ? `$${nf2.format(updSettlement)}/t` : "N/A";
      // Refresh sensitivity with new averages
      renderCdpSensitivity(cargo, updFullAvgs, updSettlement);
    });
  });
}

function renderCargoDetailPage(cargoId) {
  const cargo = data.cargos.find((c) => c.id === cargoId);
  if (!cargo) {
    if (els.cdpCargoInfo) els.cdpCargoInfo.innerHTML = "<p>Cargo not found.</p>";
    return;
  }

  // Header
  if (els.cdpTitle) els.cdpTitle.textContent = `${cargo.mine} · ${heatLabelForSpec(cargo.spec)}`;
  if (els.cdpSubtitle) {
    els.cdpSubtitle.textContent = `${cargo.year} ${monthNames[cargo.month - 1]} · ${labelForStatus(cargo.status)} · ${labelForType(cargo.purchaseType)}`;
  }

  // Cargo info fields
  const laycan = formatLaycan(cargo.laycanStart, cargo.laycanEnd);
  const periodLabel = pricingPeriodLabel(cargo);
  const infoFields =
    cargo.purchaseType === "fixed"
      ? [
          { label: "Mine", value: cargo.mine },
          { label: "Spec", value: heatLabelForSpec(cargo.spec) },
          { label: "Status", value: labelForStatus(cargo.status) },
          { label: "Buyer", value: cargo.buyer || "—" },
          { label: "Quantity", value: formatQuantity(cargo.quantityMt) },
          { label: "Laycan", value: laycan },
          { label: "Purchase Date", value: formatDate(cargo.purchaseDate) },
          { label: "Fixed Price", value: formatPricePerTon(cargo.priceFixed) },
        ]
      : [
          { label: "Mine", value: cargo.mine },
          { label: "Spec", value: heatLabelForSpec(cargo.spec) },
          { label: "Status", value: labelForStatus(cargo.status) },
          { label: "Buyer", value: cargo.buyer || "—" },
          { label: "Quantity", value: formatQuantity(cargo.quantityMt) },
          { label: "Laycan", value: laycan },
          { label: "Purchase Date", value: formatDate(cargo.purchaseDate) },
          { label: "Formula", value: cargo.priceFormula || "—" },
          { label: "Index Rule", value: cargo.indexRule || "—" },
          { label: "Pricing Period", value: periodLabel },
        ];

  if (els.cdpCargoInfo) {
    els.cdpCargoInfo.innerHTML = infoFields
      .map((f) => `<div class="cdp-field"><span>${f.label}</span><strong>${escapeHtml(String(f.value))}</strong></div>`)
      .join("");
  }

  // Pricing period label
  if (els.cdpRefPeriodLabel) {
    els.cdpRefPeriodLabel.textContent = `Pricing period: ${periodLabel}`;
  }

  // Reference table + sensitivity: index vs fixed
  if (cargo.purchaseType === "index") {
    // Dynamic reference table (actual + forecast weeks, formula-filtered columns)
    renderCdpReference(cargo);
    // Sensitivity uses the same allReferenceRowsForCargo averages
    const { rows: refRowsAll } = allReferenceRowsForCargo(cargo);
    const baseAvgs = cdpAveragesFromRows(refRowsAll);
    const baseSettlement = forecastSettlementForCargo(cargo, baseAvgs);
    renderCdpSensitivity(cargo, baseAvgs, baseSettlement);
  } else {
    // Fixed price: show simple bar, no sensitivity
    if (els.cdpRefTableContainer) {
      els.cdpRefTableContainer.innerHTML = `<div class="cdp-formula-bar">
        <code class="cdp-formula-text">Fixed Price</code>
        <strong class="cdp-settlement-val">${escapeHtml(formatPricePerTon(cargo.priceFixed))}</strong>
      </div>`;
    }
    if (els.cdpRefTitle) els.cdpRefTitle.textContent = "Price";
    if (els.cdpSensitivityBody) {
      els.cdpSensitivityBody.innerHTML = `<tr><td colspan="3" style="padding:10px 14px;color:var(--muted)">Sensitivity not applicable — fixed price cargo</td></tr>`;
    }
  }

  // Judgment form
  renderCdpJudgment(cargo);
}

function renderCdpSensitivity(cargo, averages, baseSettlement) {
  if (!els.cdpSensitivityBody) return;
  const scenarios = [
    { label: "+$3/t", shift: 3, cls: "positive" },
    { label: "+$2/t", shift: 2, cls: "positive" },
    { label: "+$1/t", shift: 1, cls: "positive" },
    { label: "Base", shift: 0, cls: "base" },
    { label: "−$1/t", shift: -1, cls: "negative" },
    { label: "−$2/t", shift: -2, cls: "negative" },
    { label: "−$3/t", shift: -3, cls: "negative" },
  ];
  els.cdpSensitivityBody.innerHTML = scenarios
    .map(({ label, shift, cls }) => {
      const shiftedAvgs =
        shift === 0
          ? averages
          : {
              avgIci2: averages.avgIci2 + shift,
              avgIci3: averages.avgIci3 + shift,
              avgIci4: averages.avgIci4 + shift,
              avgIci5: averages.avgIci5 + shift,
            };
      const settlement = forecastSettlementForCargo(cargo, shiftedAvgs);
      const settlStr = settlement != null ? `$${nf2.format(settlement)}/t` : "N/A";
      const diff = settlement != null && baseSettlement != null ? settlement - baseSettlement : null;
      let diffStr = "—";
      let diffClass = "";
      if (diff != null && shift !== 0) {
        diffStr = diff >= 0 ? `+$${nf2.format(diff)}/t` : `−$${nf2.format(Math.abs(diff))}/t`;
        diffClass = diff > 0.001 ? "up" : diff < -0.001 ? "down" : "";
      }
      const isBase = shift === 0;
      return `<tr${isBase ? ' class="base-row"' : ""}>
        <td class="fc-td"><span class="shift-label ${cls}">${label}</span></td>
        <td class="fc-td numeric">${settlStr}</td>
        <td class="fc-td numeric${diffClass ? ` ${diffClass}` : ""}">
          ${isBase ? '<span style="color:var(--muted)">Base</span>' : escapeHtml(diffStr)}
        </td>
      </tr>`;
    })
    .join("");
}

function renderCdpJudgment(cargo) {
  const j = cargo.judgment || {};
  // Direction buttons
  els.cdpDirectionGroup?.querySelectorAll("[data-cdp-direction]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.cdpDirection === j.direction);
  });
  // Action buttons
  els.cdpActionGroup?.querySelectorAll("[data-cdp-action]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.cdpAction === j.action);
  });
  // Target settlement
  if (els.cdpTargetSettlement) {
    els.cdpTargetSettlement.value = j.targetSettlement != null ? j.targetSettlement : "";
  }
  // Note
  if (els.cdpNote) els.cdpNote.value = j.note || "";
  // Saved timestamp
  if (els.cdpJudgmentSavedAt) {
    els.cdpJudgmentSavedAt.textContent = j.savedAt ? `Saved ${formatSavedAt(j.savedAt)}` : "";
  }
}

function formatSavedAt(isoString) {
  const d = new Date(isoString);
  return `${monthNames[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

async function saveCdpJudgment() {
  const cargo = data.cargos.find((c) => c.id === state.cdpCargoId);
  if (!cargo) return;
  const direction =
    els.cdpDirectionGroup?.querySelector(".is-active[data-cdp-direction]")?.dataset?.cdpDirection || null;
  const action =
    els.cdpActionGroup?.querySelector(".is-active[data-cdp-action]")?.dataset?.cdpAction || null;
  const targetSettlement = numericOrNull(els.cdpTargetSettlement?.value);
  const note = els.cdpNote?.value?.trim() || "";
  const judgment = { direction, action, targetSettlement, note, savedAt: new Date().toISOString() };
  await updateCargo(cargo.id, { judgment });
  if (els.cdpJudgmentSavedAt) els.cdpJudgmentSavedAt.textContent = `Saved ${formatSavedAt(judgment.savedAt)}`;
}

function bindEvents() {
  setupFormOptions();
  if (els.todayLabel) {
    const now = new Date();
    els.todayLabel.textContent = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    els.todayLabel.dateTime = toISO(now);
  }
  els.brandLogo?.addEventListener("click", () => setView("dashboard"));
  els.viewTabs.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
  els.prevYear.addEventListener("click", () => changeYear(-1));
  els.nextYear.addEventListener("click", () => changeYear(1));
  els.analyticsPrevYear.addEventListener("click", () => changeYear(-1));
  els.analyticsNextYear.addEventListener("click", () => changeYear(1));
  els.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderCargoRows();
    renderDetail();
    renderForecastScenario();
  });
  els.mineFilter.addEventListener("change", (event) => {
    state.mine = event.target.value;
    renderCargoRows();
    renderDetail();
  });
  els.buyerFilter.addEventListener("change", (event) => {
    state.buyer = event.target.value;
    renderCargoRows();
    renderDetail();
  });
  els.statusTabs.forEach((button) => {
    button.addEventListener("click", () => {
      state.status = button.dataset.status;
      els.statusTabs.forEach((tab) => tab.classList.toggle("is-active", tab === button));
      renderCargoRows();
      renderDetail();
    });
  });
  els.typeTabs.forEach((button) => {
    button.addEventListener("click", () => {
      state.type = button.dataset.type;
      els.typeTabs.forEach((tab) => tab.classList.toggle("is-active", tab === button));
      renderCargoRows();
      renderDetail();
    });
  });
  els.chartTabs.forEach((button) => {
    button.addEventListener("click", () => {
      state.chartIndex = button.dataset.chartIndex;
      els.chartTabs.forEach((tab) => tab.classList.toggle("is-active", tab === button));
      renderMarketCards();
      drawChart();
    });
  });
  [els.mineVolumeChart, els.buyerVolumeChart, els.heatMixChart].forEach((canvas) => {
    canvas?.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const hit = (chartHitBoxes.get(canvas.id) || []).find((box) => x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height);
      if (hit?.filterKey) toggleAnalyticsFilter(hit.filterKey, hit.value);
    });
  });
  [
    ["mine", els.mineTableToggle],
    ["buyer", els.buyerTableToggle],
    ["heat", els.heatTableToggle],
  ].forEach(([type, button]) => {
    button?.addEventListener("click", () => {
      state.tableExpanded[type] = !state.tableExpanded[type];
      renderPortfolioSummary();
    });
  });
  els.addCargoButton.addEventListener("click", () => openCargoForm());
  els.cargoForm.addEventListener("submit", saveCargoFromForm);
  els.closeModalButton.addEventListener("click", closeCargoForm);
  els.cancelModalButton.addEventListener("click", closeCargoForm);
  els.deleteCargoButton.addEventListener("click", deleteCurrentCargo);
  els.form.month.addEventListener("change", () => {
    const year = Number(els.form.year.value);
    const month = Number(els.form.month.value);
    els.form.laycanStart.value = monthStartIso(year, month);
    els.form.laycanEnd.value = monthEndIso(year, month);
  });
  els.form.year.addEventListener("change", () => {
    const year = Number(els.form.year.value);
    const month = Number(els.form.month.value);
    els.form.laycanStart.value = monthStartIso(year, month);
    els.form.laycanEnd.value = monthEndIso(year, month);
  });
  els.exportButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleExportMenu();
  });
  els.importExcelButton.addEventListener("click", () => els.excelImportInput.click());
  els.excelImportInput.addEventListener("change", async (event) => {
    const [file] = event.target.files;
    await importExcelFile(file);
    event.target.value = "";
  });
  els.updateIciButton.addEventListener("click", openIciForm);
  els.iciForm.addEventListener("submit", saveIciForm);
  els.closeIciModalButton.addEventListener("click", closeIciForm);
  els.cancelIciModalButton.addEventListener("click", closeIciForm);
  document.querySelector("#fcHistoryToggle")?.addEventListener("click", () => {
    state.showFcHistory = !state.showFcHistory;
    renderForecastScenario();
  });
  els.addForecastWeekButton?.addEventListener("click", addForecastWeek);
  els.saveForecastButton?.addEventListener("click", saveForecastScenario);
  // CDP: back button
  els.cdpBackButton?.addEventListener("click", () => setView("dashboard"));
  // CDP: save judgment
  els.cdpSaveJudgment?.addEventListener("click", () => saveCdpJudgment());

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".export-menu") && !event.target.closest("#exportButton")) closeExportMenu();
    const trendBtn = event.target.closest("[data-trend]");
    if (trendBtn) {
      state.trendMode = trendBtn.dataset.trend;
      state.ici3ForecastRows = null;
      renderForecastScenario();
      return;
    }
    const shiftBtn = event.target.closest("[data-shift]");
    if (shiftBtn) {
      state.priceShift = Number(shiftBtn.dataset.shift);
      renderForecastScenario();
      return;
    }
    // CDP: direction choice
    const dirBtn = event.target.closest("[data-cdp-direction]");
    if (dirBtn) {
      els.cdpDirectionGroup?.querySelectorAll("[data-cdp-direction]").forEach((b) => b.classList.remove("is-active"));
      dirBtn.classList.add("is-active");
      return;
    }
    // CDP: action choice
    const actBtn = event.target.closest("[data-cdp-action]");
    if (actBtn) {
      els.cdpActionGroup?.querySelectorAll("[data-cdp-action]").forEach((b) => b.classList.remove("is-active"));
      actBtn.classList.add("is-active");
    }
  });
  els.fcMatrixBody?.addEventListener("input", (event) => {
    if (!(event.target instanceof Element)) return;
    const input = event.target.closest(".fc-input");
    if (!input) return;
    const { fcDate, fcField } = input.dataset;
    if (!fcDate || !fcField) return;
    const row = forecastRows().find((r) => r.date === fcDate);
    if (!row) return;
    if (fcField === "note") {
      row.note = input.value;
    } else {
      row[fcField] = numericOrNull(input.value);
      state.ici3ForecastRows = normalizeForecastRows(forecastRows());
      renderFcAverages();
      renderFcSettlement();
    }
  });
  window.addEventListener("resize", () => {
    drawChart();
    renderPortfolioSummary();
    drawIci3ForecastChart();
  });
  window.addEventListener("popstate", () => {
    const next = initialPeriod();
    state.year = next.year;
    state.month = next.month;
    state.view = next.view;
    state.cdpCargoId = next.initialCargoId;
    state.selectedId = next.initialCargoId || state.selectedId;
    renderStatusLine();
    renderPageVisibility();
    refreshPeriodViews({ skipUrl: true });
    renderMarketCards();
    if (state.view === "dashboard") requestAnimationFrame(drawChart);
    if (state.view === "forecast") requestAnimationFrame(renderForecastScenario);
    if (state.view === "cargoDetail") requestAnimationFrame(() => renderCargoDetailPage(state.cdpCargoId));
  });
  window.addEventListener("message", (event) => {
    if (event.data?.type === "kch-export-for-sale-detail") {
      exportForSalePlan("detail", event.source);
    }
  });
}

function refreshPeriodViews(options = {}) {
  state.mine = "all";
  state.buyer = "all";
  if (!options.skipUrl) syncUrl();
  renderMonthTabs();
  renderFilters();
  renderKpis();
  renderPortfolioSummary();
  renderCargoRows();
  renderDetail();
  renderForecastScenario();
}

function renderAll() {
  renderStatusLine();
  renderPageVisibility();
  refreshPeriodViews();
  renderMarketCards();
  drawChart();
  renderForecastScenario();
}

bindEvents();
renderAll();
loadSharedData().finally(startSharedRefresh);
