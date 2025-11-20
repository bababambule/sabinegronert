import { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import type { Artwork } from '../App';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [artwork]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!artwork) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-neutral-300 transition-colors z-10"
        aria-label="Close modal"
      >
        <X className="size-8" />
      </button>
      
      <div
        className="bg-white max-w-6xl w-full max-h-[90vh] overflow-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid lg:grid-cols-[1.5fr,1fr] gap-0">
          <div 
            className="bg-neutral-100 flex items-center justify-center p-8"
            style={{ minHeight: '400px' }}
          >
            <ImageWithFallback
              src={artwork.imageUrl}
              alt={artwork.name}
              className="max-w-full max-h-[600px] object-contain"
            />
          </div>
          
          <div className="p-8 md:p-12 flex flex-col">
            <h2 className="mb-6 text-neutral-900">{artwork.name}</h2>
            
            <div className="space-y-5 flex-1">
              <div>
                <p className="text-neutral-500 text-sm mb-1">Artist</p>
                <p className="text-neutral-900">{artwork.artist}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-neutral-500 text-sm mb-1">Dated</p>
                  <p className="text-neutral-900">{artwork.dated}</p>
                </div>
                
                <div>
                  <p className="text-neutral-500 text-sm mb-1">Epoche</p>
                  <p className="text-neutral-900">{artwork.epoche}</p>
                </div>
              </div>
              
              <div>
                <p className="text-neutral-500 text-sm mb-1">Dimensions</p>
                <p className="text-neutral-900">{artwork.width} × {artwork.height} cm</p>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-neutral-500 text-sm mb-1">Medium</p>
                  <p className="text-neutral-900">{artwork.medium}</p>
                </div>
                
                <div>
                  <p className="text-neutral-500 text-sm mb-1">Technique</p>
                  <p className="text-neutral-900">{artwork.technique}</p>
                </div>
              </div>
              
              <div>
                <p className="text-neutral-500 text-sm mb-1">Signature</p>
                <div className="flex items-center gap-2">
                  {artwork.signature ? (
                    <>
                      <Check className="size-4 text-green-600" />
                      <span className="text-neutral-900">Signed</span>
                    </>
                  ) : (
                    <span className="text-neutral-500">Unsigned</span>
                  )}
                </div>
              </div>
              
              {artwork.tags.length > 0 && (
                <div>
                  <p className="text-neutral-500 text-sm mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
