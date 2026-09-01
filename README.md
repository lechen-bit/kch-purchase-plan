# KCH Purchase Plan

Standalone purchase and sale-plan dashboard used by KCH Coal Manager.

## Windows quick start

1. Install [Node.js 18+](https://nodejs.org/) and [Python 3](https://www.python.org/downloads/).
2. Download or clone this private repository.
3. Double-click `install-windows.cmd` once.
4. Double-click `start-kch-purchase-plan.cmd` whenever you want to use it.

The launcher starts the local server and opens <http://127.0.0.1:4173/>.

## Command-line start

Requirements: Node.js 18 or newer.

```powershell
npm start
```

Open <http://127.0.0.1:4173/>.

On first start, the server copies `data-store.example.json` to the local
`data-store.json` and generates `data.js`. Both runtime files are ignored by
Git so internal buyers, prices and sale status are not committed accidentally.

## Excel import

Excel import additionally requires Python and `openpyxl`. The Windows installer
does this automatically; manual installation is:

```powershell
py -3 -m pip install -r requirements.txt
npm start
```

The application supports monthly cargo management, Sold/For Sale filtering,
portfolio analytics, ICI history, price forecast views, and Sale Plan exports.

To update the plan, open the website, click `Import Data`, and select the latest
KCH purchase-plan Excel file. The previous local data is backed up automatically.

## Data security

Do not commit `data-store.json`, `data.js`, imported workbooks, `uploads/` or
`backups/`. The repository contains synthetic demonstration data only.
