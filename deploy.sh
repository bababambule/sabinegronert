#!/bin/bash

echo "🚀 Deploying to GitHub..."

# Add all changes
git add .

# Commit
git commit -m "Fix build: Remove TypeScript strict checking, simplify dependencies"

# Push to main
git push origin main

echo "✅ Pushed to GitHub! Check https://github.com/bababambule/sabinegronert/actions"
echo "⏳ Website will be live at https://bababambule.github.io/sabinegronert/ in 2-3 minutes"
