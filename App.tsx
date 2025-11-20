import { useState, useEffect } from 'react';
import { ArtworkGallery } from './components/ArtworkGallery';
import { Hero } from './components/Hero';
import { FilterPanel } from './components/FilterPanel';
import { Loader2 } from 'lucide-react';

export interface Artwork {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  height: number; // Höhe
  width: number; // Breite
  dated: string; // Datiert
  epoche: string; // Epoche
  signature: boolean; // signature
  medium: string; // Medium
  technique: string; // Maltechnik
  tags: string[]; // Schlagwörter
}

export interface FilterOptions {
  artists: string[];
  epoches: string[];
  minWidth: number | null;
  maxWidth: number | null;
  minHeight: number | null;
  maxHeight: number | null;
  signed: 'all' | 'yes' | 'no';
  tags: string[];
}

export default function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    artists: [],
    epoches: [],
    minWidth: null,
    maxWidth: null,
    minHeight: null,
    maxHeight: null,
    signed: 'all',
    tags: [],
  });

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      // Actual Airtable API implementation:
      const AIRTABLE_API_KEY = 'pat7CiuH5fxxk87j1.dd2d39a56e7187e55f5bee5ae6c8ae457ec3be0d3542cd85c51b66272a0957fe';
      const BASE_ID = 'appO7VAnMnjEaVHhY';
      
      // Fetch Artists (Künstler)
      const artistsResponse = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/Künstler`,
        {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        }
      );
      const artistsData = await artistsResponse.json();
      const artistsMap = new Map();
      if (artistsData.records) {
        artistsData.records.forEach((record: any) => {
          artistsMap.set(record.id, record.fields.Name || '');
        });
      }
      
      // Fetch Tags
      const tagsResponse = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/Tags`,
        {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        }
      );
      const tagsData = await tagsResponse.json();
      const tagsMap = new Map();
      if (tagsData.records) {
        tagsData.records.forEach((record: any) => {
          tagsMap.set(record.id, record.fields.Name || '');
        });
      }
      
      // Fetch Artworks (Werke)
      const response = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/Werke`,
        {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        }
      );
      
      const data = await response.json();
      
      // Debug: Log the response to see what we're getting
      console.log('Airtable API Response:', data);
      console.log('Artists Map:', artistsMap);
      console.log('Tags Map:', tagsMap);
      
      // Check if the response has an error
      if (data.error) {
        console.error('Airtable API Error:', data.error);
        throw new Error(data.error.message || 'Airtable API error');
      }
      
      // Check if records exist
      if (!data.records || !Array.isArray(data.records)) {
        console.error('No records found in response:', data);
        setArtworks([]);
        setLoading(false);
        return;
      }
      
      const formattedArtworks = data.records.map((record: any) => {
        // Get artist name from linked record
        const artistId = record.fields.Artist?.[0];
        const artistName = artistId ? artistsMap.get(artistId) || '' : '';
        
        // Get tag names from linked records
        const tagIds = record.fields.Schlagwörter || [];
        const tagNames = tagIds.map((tagId: string) => tagsMap.get(tagId) || '').filter((tag: string) => tag !== '');
        
        return {
          id: record.id,
          name: record.fields.Name || '',
          artist: artistName,
          imageUrl: record.fields.Bild?.[0]?.url || '',
          height: record.fields.Höhe || 100,
          width: record.fields.Breite || 100,
          dated: record.fields.Datiert || '',
          epoche: record.fields.Epoche || '',
          signature: record.fields.signature || false,
          medium: record.fields.Medium || '',
          technique: record.fields.Maltechnik || '',
          tags: tagNames,
        };
      });
      
      setArtworks(formattedArtworks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setLoading(false);
    }
  };

  // Get unique values for filters
  const uniqueArtists = Array.from(new Set(artworks.map(a => a.artist))).sort();
  const uniqueEpoches = Array.from(new Set(artworks.map(a => a.epoche))).sort();
  const allTags = Array.from(new Set(artworks.flatMap(a => a.tags))).sort();

  // Apply filters
  const filteredArtworks = artworks.filter(artwork => {
    // Artist filter
    if (filters.artists.length > 0 && !filters.artists.includes(artwork.artist)) {
      return false;
    }

    // Epoche filter
    if (filters.epoches.length > 0 && !filters.epoches.includes(artwork.epoche)) {
      return false;
    }

    // Width filter
    if (filters.minWidth !== null && artwork.width < filters.minWidth) {
      return false;
    }
    if (filters.maxWidth !== null && artwork.width > filters.maxWidth) {
      return false;
    }

    // Height filter
    if (filters.minHeight !== null && artwork.height < filters.minHeight) {
      return false;
    }
    if (filters.maxHeight !== null && artwork.height > filters.maxHeight) {
      return false;
    }

    // Signature filter
    if (filters.signed === 'yes' && !artwork.signature) {
      return false;
    }
    if (filters.signed === 'no' && artwork.signature) {
      return false;
    }

    // Tags filter
    if (filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => artwork.tags.includes(tag));
      if (!hasMatchingTag) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        artists={uniqueArtists}
        epoches={uniqueEpoches}
        allTags={allTags}
      />
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="size-8 animate-spin text-neutral-400" />
        </div>
      ) : (
        <ArtworkGallery artworks={filteredArtworks} />
      )}
      
      <footer className="border-t border-neutral-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-neutral-500">
          <p>© {new Date().getFullYear()} Sabine Gronert. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}