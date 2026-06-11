# Start the portfolio locally
# Frontend: Vue 3 + Vite

$Root = Split-Path -Parent $MyInvocation.MyCommand.Definition

Write-Host "Starting portfolio (Vue/Vite) ..." -ForegroundColor Green

$Cmd = "cd `"$Root`"; "
if (-not (Test-Path (Join-Path $Root "node_modules"))) {
    $Cmd += "npm install; "
}
$Cmd += "npm run dev"

Start-Process powershell -ArgumentList "-NoExit", "-Command", $Cmd

Write-Host "Done. Site: http://localhost:5173" -ForegroundColor Cyan
