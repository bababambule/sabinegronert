<<<<<<< HEAD
# sabinegronert
Personal Website for Sabine Gronert
=======
# Sabine Gronert Art Collection

A modern, minimalistic one-page website showcasing Sabine Gronert's art collection with a beautiful masonry layout and advanced filtering capabilities.

## Features

- 🎨 **Masonry Layout**: Dynamic grid that adapts to actual artwork dimensions
- 🔍 **Advanced Filtering**: Filter by artist, epoche, dimensions, signature status, and tags
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- ⚡ **Modern Tech Stack**: Built with React, TypeScript, and Tailwind CSS
- 🎯 **Interactive Modal**: Click any artwork to view detailed information
- 🏷️ **Tag System**: Organize and discover artworks by keywords

## Airtable Integration

This website is designed to connect to Airtable for managing the art collection. The expected Airtable fields are:

- **Name** - Name of the artwork
- **Artist** - Artist name (can be relational field)
- **Bild** - Image of the artwork
- **Höhe** - Height in cm
- **Breite** - Width in cm
- **Datiert** - When it was painted
- **Epoche** - Which century/period it belongs to
- **signature** - Boolean: Is it signed?
- **Medium** - Canvas material
- **Maltechnik** - Painting technique used
- **Schlagwörter** - Tags/keywords (array)

### Setup Airtable Connection

1. Get your Airtable API key from [airtable.com/account](https://airtable.com/account)
2. Find your Base ID and Table Name
3. In `App.tsx`, uncomment the Airtable API implementation (lines ~175-207)
4. Replace the placeholder values:
   - `YOUR_API_KEY_HERE`
   - `YOUR_BASE_ID_HERE`
   - `YOUR_TABLE_NAME_HERE`

## Technology Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Lucide React** - Icons
- **React Responsive Masonry** - Masonry grid layout
- **shadcn/ui** - UI components

## Project Structure

```
/
├── App.tsx                      # Main application component
├── components/
│   ├── Hero.tsx                 # Hero section
│   ├── FilterPanel.tsx          # Filter UI with collapsible panel
│   ├── ArtworkGallery.tsx       # Masonry gallery container
│   ├── ArtworkCard.tsx          # Individual artwork card
│   ├── ArtworkModal.tsx         # Full-screen artwork details
│   ├── figma/
│   │   └── ImageWithFallback.tsx # Image component with fallback
│   └── ui/                      # shadcn/ui components
├── styles/
│   └── globals.css              # Global styles & Tailwind config
└── README.md
```

## Getting Started

This project was created with Figma Make and is ready to deploy.

### Deployment

You can deploy this to any modern hosting platform that supports React/Vite:

- **Vercel**: Connect your GitHub repo and deploy
- **Netlify**: Drag and drop or connect via GitHub
- **GitHub Pages**: Use GitHub Actions for automated deployment

### Local Development (Optional)

If you want to run this locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure your Airtable connection (see above)
4. Run the development server: `npm run dev`

## Filter Options

The website supports comprehensive filtering:

- **Artist**: Filter by specific artists
- **Epoche**: Filter by time period/century
- **Width & Height**: Set min/max dimensions in cm
- **Signature**: Show signed, unsigned, or all artworks
- **Tags**: Filter by multiple tags/keywords

All active filters are displayed as removable badges for easy management.

## Customization

### Styling

The design uses a minimalist aesthetic with neutral colors. To customize:

- Edit `/styles/globals.css` for typography and color tokens
- All components use Tailwind CSS classes

### Mock Data

The app currently uses mock data for demonstration. To switch to real Airtable data, uncomment the Airtable API code in `App.tsx` and comment out the mock data section.

## License

© 2025 Sabine Gronert. All rights reserved.
>>>>>>> Initial commit with GitHub Pages deployment configuration
