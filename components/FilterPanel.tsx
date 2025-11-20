import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { FilterOptions } from '../App';

interface FilterPanelProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  artists: string[];
  epoches: string[];
  allTags: string[];
}

export function FilterPanel({ filters, setFilters, artists, epoches, allTags }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const addArtist = (artist: string) => {
    if (artist && !filters.artists.includes(artist)) {
      setFilters({
        ...filters,
        artists: [...filters.artists, artist]
      });
    }
  };

  const addEpoche = (epoche: string) => {
    if (epoche && !filters.epoches.includes(epoche)) {
      setFilters({
        ...filters,
        epoches: [...filters.epoches, epoche]
      });
    }
  };

  const addTag = (tag: string) => {
    if (tag && !filters.tags.includes(tag)) {
      setFilters({
        ...filters,
        tags: [...filters.tags, tag]
      });
    }
  };

  const removeArtist = (artist: string) => {
    setFilters({
      ...filters,
      artists: filters.artists.filter(a => a !== artist)
    });
  };

  const removeEpoche = (epoche: string) => {
    setFilters({
      ...filters,
      epoches: filters.epoches.filter(e => e !== epoche)
    });
  };

  const removeTag = (tag: string) => {
    setFilters({
      ...filters,
      tags: filters.tags.filter(t => t !== tag)
    });
  };

  const clearFilters = () => {
    setFilters({
      artists: [],
      epoches: [],
      minWidth: null,
      maxWidth: null,
      minHeight: null,
      maxHeight: null,
      signed: 'all',
      tags: [],
    });
  };

  const activeFiltersCount = 
    filters.artists.length +
    filters.epoches.length +
    filters.tags.length +
    (filters.minWidth !== null ? 1 : 0) +
    (filters.maxWidth !== null ? 1 : 0) +
    (filters.minHeight !== null ? 1 : 0) +
    (filters.maxHeight !== null ? 1 : 0) +
    (filters.signed !== 'all' ? 1 : 0);

  return (
    <div className="md:fixed md:bottom-0 md:left-0 md:right-0 md:z-50 border-b md:border-t border-neutral-200 bg-neutral-50 md:bg-white md:shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            <SlidersHorizontal className="size-5" />
            <span>Filter</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount}</Badge>
            )}
            <ChevronDown className={`size-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
            >
              Alle löschen
            </Button>
          )}
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 pb-2 max-h-[60vh] overflow-y-auto">
            {/* Artist Filter */}
            <div>
              <label className="text-neutral-700 mb-1.5 block text-sm">Künstler</label>
              <select
                value=""
                onChange={(e) => addArtist(e.target.value)}
                className="w-full h-9 px-3 py-1.5 border border-neutral-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="">Künstler auswählen</option>
                {artists.filter(a => !filters.artists.includes(a)).map(artist => (
                  <option key={artist} value={artist}>
                    {artist}
                  </option>
                ))}
              </select>
              {filters.artists.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {filters.artists.map(artist => (
                    <Badge key={artist} variant="secondary" className="gap-1 text-xs h-6">
                      {artist}
                      <button onClick={() => removeArtist(artist)}>
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Epoche Filter */}
            <div>
              <label className="text-neutral-700 mb-1.5 block text-sm">Epoche</label>
              <select
                value=""
                onChange={(e) => addEpoche(e.target.value)}
                className="w-full h-9 px-3 py-1.5 border border-neutral-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="">Epoche auswählen</option>
                {epoches.filter(e => !filters.epoches.includes(e)).map(epoche => (
                  <option key={epoche} value={epoche}>
                    {epoche}
                  </option>
                ))}
              </select>
              {filters.epoches.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {filters.epoches.map(epoche => (
                    <Badge key={epoche} variant="secondary" className="gap-1 text-xs h-6">
                      {epoche}
                      <button onClick={() => removeEpoche(epoche)}>
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Tags Filter */}
            <div>
              <label className="text-neutral-700 mb-1.5 block text-sm">Tags</label>
              <select
                value=""
                onChange={(e) => addTag(e.target.value)}
                className="w-full h-9 px-3 py-1.5 border border-neutral-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="">Tag auswählen</option>
                {allTags.filter(t => !filters.tags.includes(t)).map(tag => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              {filters.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {filters.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="gap-1 text-xs h-6">
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="size-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Signature Filter */}
            <div>
              <label className="text-neutral-700 mb-1.5 block text-sm">Signatur</label>
              <select
                value={filters.signed}
                onChange={(e) => setFilters({ ...filters, signed: e.target.value as 'all' | 'yes' | 'no' })}
                className="w-full h-9 px-3 py-1.5 border border-neutral-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                <option value="all">Alle</option>
                <option value="yes">Signiert</option>
                <option value="no">Unsigniert</option>
              </select>
            </div>

            {/* Width Filter */}
            <div>
              <label className="text-neutral-700 mb-1.5 block text-sm">Breite (cm)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minWidth || ''}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    minWidth: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="w-full h-9 px-3 py-1.5 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <span className="text-neutral-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxWidth || ''}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    maxWidth: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="w-full h-9 px-3 py-1.5 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Height Filter */}
            <div>
              <label className="text-neutral-700 mb-1.5 block text-sm">Höhe (cm)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minHeight || ''}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    minHeight: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="w-full h-9 px-3 py-1.5 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <span className="text-neutral-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxHeight || ''}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    maxHeight: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="w-full h-9 px-3 py-1.5 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display when collapsed */}
        {activeFiltersCount > 0 && !isExpanded && (
          <div className="flex flex-wrap gap-2 mt-3">
            {filters.artists.map(artist => (
              <Badge key={artist} variant="secondary" className="gap-1">
                {artist}
                <button onClick={() => removeArtist(artist)}>
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            {filters.epoches.map(epoche => (
              <Badge key={epoche} variant="secondary" className="gap-1">
                {epoche}
                <button onClick={() => removeEpoche(epoche)}>
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            {filters.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button onClick={() => removeTag(tag)}>
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            {filters.signed !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {filters.signed === 'yes' ? 'Signiert' : 'Unsigniert'}
                <button onClick={() => setFilters({ ...filters, signed: 'all' })}>
                  <X className="size-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}