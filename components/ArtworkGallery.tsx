import { useState } from 'react';
import Masonry from 'react-responsive-masonry';
import { ArtworkCard } from './ArtworkCard';
import { ArtworkModal } from './ArtworkModal';
import type { Artwork } from '../App';

interface ArtworkGalleryProps {
  artworks: Artwork[];
}

export function ArtworkGallery({ artworks }: ArtworkGalleryProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-neutral-800">Collection</h2>
          <p className="text-neutral-500">{artworks.length} {artworks.length === 1 ? 'artwork' : 'artworks'}</p>
        </div>
        
        {artworks.length > 0 ? (
          <Masonry columnsCount={3} gutter="24px">
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onClick={() => setSelectedArtwork(artwork)}
              />
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-20 text-neutral-500">
            <p>No artworks match your filters.</p>
          </div>
        )}
      </section>
      
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </>
  );
}
