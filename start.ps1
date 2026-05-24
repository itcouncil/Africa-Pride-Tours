$ErrorActionPreference = "Stop"

$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$nextBin = Join-Path $PSScriptRoot "node_modules\next\dist\bin\next"

if (Test-Path $bundledNode) {
  & $bundledNode $nextBin dev --webpack --hostname 127.0.0.1 --port 3000
  exit $LASTEXITCODE
}

node $nextBin dev --webpack --hostname 127.0.0.1 --port 3000
