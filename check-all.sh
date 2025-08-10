#!/usr/bin/env sh

echo "🚀 Executando verificação completa do projeto..."

echo "\n📋 1. Verificando lint com Biome..."
npm run lint

echo "\n🎨 2. Verificando formatação..."
npm run format:check

echo "\n🔍 3. Verificando tipos TypeScript..."
npm run type-check

echo "\n🏗️ 4. Testando build..."
npm run build

echo "\n✅ Verificação completa finalizada!"
