# PowerShell script to fix Git line ending issues on Windows
# Run this script if you encounter line ending warnings

Write-Host "Fixing Git line ending configuration for Windows..." -ForegroundColor Green

# Configure Git for Windows line ending handling
git config core.autocrlf true
Write-Host "✓ Set core.autocrlf to true" -ForegroundColor Cyan

# Refresh Git index to apply .gitattributes rules
git add --renormalize .
Write-Host "✓ Renormalized all files" -ForegroundColor Cyan

# Test if it works
Write-Host "Testing git add..." -ForegroundColor Yellow
$result = git add . 2>&1
if ($result -like "*warning*") {
    Write-Host "⚠️  Still seeing warnings. You may need to manually review .gitattributes" -ForegroundColor Yellow
} else {
    Write-Host "✅ Success! No more line ending warnings." -ForegroundColor Green
}

Write-Host "`nLine ending configuration complete!" -ForegroundColor Green
Write-Host "Your repository is now properly configured for Windows development." -ForegroundColor White