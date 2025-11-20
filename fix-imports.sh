#!/bin/bash

# Fix all imports by removing version numbers
find components/ui -name "*.tsx" -type f -exec sed -i 's/@radix-ui\/react-\([a-z-]*\)@[0-9.]*/@radix-ui\/react-\1/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/lucide-react@[0-9.]*/lucide-react/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/class-variance-authority@[0-9.]*/class-variance-authority/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/cmdk@[0-9.]*/cmdk/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/embla-carousel-react@[0-9.]*/embla-carousel-react/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/input-otp@[0-9.]*/input-otp/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/react-day-picker@[0-9.]*/react-day-picker/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/react-hook-form@[0-9.]*/react-hook-form/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/recharts@[0-9.]*/recharts/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/sonner@[0-9.]*/sonner/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/vaul@[0-9.]*/vaul/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/next-themes@[0-9.]*/next-themes/g' {} \;
find components/ui -name "*.tsx" -type f -exec sed -i 's/react-resizable-panels@[0-9.]*/react-resizable-panels/g' {} \;

echo "✅ Fixed all imports!"
