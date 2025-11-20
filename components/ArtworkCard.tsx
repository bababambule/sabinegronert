import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import type { Artwork } from '../App';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick: () => void;
}

export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  // Calculate aspect ratio from actual dimensions
  const aspectRatio = artwork.width / artwork.height;

  return (
    <button
      onClick={onClick}
      className="group text-left transition-all duration-300 hover:opacity-80 w-full"
    >
      <div 
        className="bg-neutral-100 mb-4 overflow-hidden relative"
        style={{ aspectRatio: aspectRatio }}
      >
        <ImageWithFallback
          src={artwork.imageUrl}
          alt={artwork.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {artwork.signature && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-neutral-700">
            Signiert
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-neutral-900">{artwork.name}</h3>
        <p className="text-neutral-600">{artwork.artist}</p>
        <p className="text-neutral-500 text-sm">
          {artwork.dated} · {artwork.epoche}
        </p>
        <p className="text-neutral-500 text-sm">
          {artwork.width} × {artwork.height} cm
        </p>
        <div className="flex flex-wrap gap-1 pt-1">
          {artwork.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {artwork.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{artwork.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}