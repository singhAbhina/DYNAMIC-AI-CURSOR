#!/bin/bash
set -e

echo "🚀 Starting build process for WebMistri Frontend..."

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building the application..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build output is in the 'dist' directory"

# Verify the build output
if [ -d "dist" ]; then
    echo "✅ Build verification passed - dist directory exists"
    echo "📊 Build size: $(du -sh dist | cut -f1)"
else
    echo "❌ Build verification failed - dist directory not found"
    exit 1
fi

echo "🎉 Ready for deployment to Render!"
