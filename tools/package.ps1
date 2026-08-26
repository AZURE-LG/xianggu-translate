$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$extensionRoot = (Resolve-Path (Join-Path $projectRoot "extension")).Path
$productName = -join @(
    [char]0x9999,
    [char]0x83C7,
    [char]0x7FFB,
    [char]0x8BD1
)
$releaseDirectory = Join-Path $projectRoot "$productName-extension"
$destination = Join-Path $projectRoot "$productName-extension.zip"

Push-Location $projectRoot
try {
    & npm.cmd run build:ui
    if ($LASTEXITCODE -ne 0) {
        throw "UI component build failed."
    }
} finally {
    Pop-Location
}

if (-not $extensionRoot.StartsWith($projectRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Extension directory is outside the project root."
}
if (-not $releaseDirectory.StartsWith($projectRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Release directory is outside the project root."
}

if (Test-Path -LiteralPath $releaseDirectory) {
    Remove-Item -LiteralPath $releaseDirectory -Recurse -Force
}
New-Item -ItemType Directory -Path $releaseDirectory | Out-Null
Copy-Item -Path (Join-Path $extensionRoot "*") -Destination $releaseDirectory -Recurse -Force

if (Test-Path -LiteralPath $destination) {
    Remove-Item -LiteralPath $destination -Force
}

Compress-Archive -Path (Join-Path $releaseDirectory "*") -DestinationPath $destination -CompressionLevel Optimal
Write-Output $releaseDirectory
Write-Output $destination
