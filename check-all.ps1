# Script de verificação completa para Windows
Write-Host "🚀 Executando verificação completa do projeto..." -ForegroundColor Green

Write-Host "`n📋 1. Verificando lint com Biome..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no lint!" -ForegroundColor Red
    exit 1
}

Write-Host "`n🎨 2. Verificando formatação..." -ForegroundColor Yellow
npm run format:check
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro na formatação!" -ForegroundColor Red
    exit 1
}

Write-Host "`n🔍 3. Verificando tipos TypeScript..." -ForegroundColor Yellow
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro nos tipos!" -ForegroundColor Red
    exit 1
}

Write-Host "`n🏗️ 4. Testando build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build!" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Verificação completa finalizada com sucesso!" -ForegroundColor Green
