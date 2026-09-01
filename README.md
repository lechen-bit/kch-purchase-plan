# KCH Purchase Plan

Standalone purchase and sale-plan dashboard used by KCH Coal Manager.

## Run locally

Requirements: Node.js 18 or newer.

```powershell
npm start
```

Open <http://127.0.0.1:4173/>.

On first start, the server copies `data-store.example.json` to the local
`data-store.json` and generates `data.js`. Both runtime files are ignored by
Git so internal buyers, prices and sale status are not committed accidentally.

## Excel import

Excel import additionally requires Python and `openpyxl`:

```powershell
py -m pip install -r requirements.txt
$env:PYTHON = (Get-Command py).Source
npm start
```

The application supports monthly cargo management, Sold/For Sale filtering,
portfolio analytics, ICI history, price forecast views, and Sale Plan exports.

## Data security

Do not commit `data-store.json`, `data.js`, imported workbooks, `uploads/` or
`backups/`. The repository contains synthetic demonstration data only.
