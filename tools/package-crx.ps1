$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$extensionRoot = (Resolve-Path (Join-Path $projectRoot "extension")).Path

if (-not $extensionRoot.StartsWith($projectRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Extension directory is outside the project root."
}

$browserCandidates = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    (Join-Path $env:LOCALAPPDATA "ms-playwright\chromium-1148\chrome-win\chrome.exe")
)
$browser = $browserCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $browser) {
    throw "Chrome or Edge executable was not found."
}

$keyDirectory = Join-Path $projectRoot ".signing"
$privateKey = Join-Path $keyDirectory "xianggu-translate.pem"
$generatedCrx = Join-Path $projectRoot "extension.crx"
$generatedPem = Join-Path $projectRoot "extension.pem"
$archiveName = -join @(
    [char]0x9999,
    [char]0x83C7,
    [char]0x7FFB,
    [char]0x8BD1,
    ".crx"
)
$destination = Join-Path $projectRoot $archiveName

Push-Location $projectRoot
try {
    & npm.cmd run build:ui
    if ($LASTEXITCODE -ne 0) {
        throw "UI component build failed."
    }
} finally {
    Pop-Location
}

New-Item -ItemType Directory -Force -Path $keyDirectory | Out-Null

foreach ($path in @($generatedCrx, $destination)) {
    if (Test-Path -LiteralPath $path) {
        Remove-Item -LiteralPath $path -Force
    }
}

$arguments = @("--pack-extension=$extensionRoot")
if (Test-Path -LiteralPath $privateKey) {
    $arguments += "--pack-extension-key=$privateKey"
} elseif (Test-Path -LiteralPath $generatedPem) {
    throw "Unexpected extension.pem exists in the project root."
}

$process = Start-Process -FilePath $browser -ArgumentList $arguments -PassThru -Wait -WindowStyle Hidden
if ($process.ExitCode -ne 0) {
    throw "Browser packaging failed with exit code $($process.ExitCode)."
}

$deadline = [DateTime]::UtcNow.AddSeconds(15)
while (-not (Test-Path -LiteralPath $generatedCrx) -and [DateTime]::UtcNow -lt $deadline) {
    Start-Sleep -Milliseconds 100
}
if (-not (Test-Path -LiteralPath $generatedCrx)) {
    throw "Browser did not create extension.crx."
}

if (-not (Test-Path -LiteralPath $privateKey)) {
    if (-not (Test-Path -LiteralPath $generatedPem)) {
        throw "Browser did not create the private key."
    }
    Move-Item -LiteralPath $generatedPem -Destination $privateKey
}

Move-Item -LiteralPath $generatedCrx -Destination $destination
Write-Output $destination
Write-Output $privateKey
