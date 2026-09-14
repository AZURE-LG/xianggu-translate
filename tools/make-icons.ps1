Add-Type -AssemblyName System.Drawing

$iconDir = Join-Path $PSScriptRoot "..\extension\icons"
New-Item -ItemType Directory -Force -Path $iconDir | Out-Null

$sizes = @(16, 32, 48, 128)
foreach ($size in $sizes) {
    $bitmap = New-Object System.Drawing.Bitmap $size, $size
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

    $background = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(37, 99, 235))
    $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255))
    $graphics.FillRectangle($background, 0, 0, $size, $size)

    $fontSize = [Math]::Max(9, [Math]::Round($size * 0.62))
    $font = New-Object System.Drawing.Font "Microsoft YaHei UI", $fontSize, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $rect = New-Object System.Drawing.RectangleF 0, 0, $size, $size
    $graphics.DrawString("译", $font, $textBrush, $rect, $format)

    $fileName = "icon" + $size + ".png"
    $path = Join-Path $iconDir $fileName
    $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)

    $graphics.Dispose()
    $bitmap.Dispose()
    $font.Dispose()
    $format.Dispose()
    $background.Dispose()
    $textBrush.Dispose()
}
