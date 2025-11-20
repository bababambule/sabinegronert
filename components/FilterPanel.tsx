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

  const toggleArtist = (artist: string) => {
    setFilters({
      ...filters,
      artists: filters.artists.includes(artist)
        ? filters.artists.filter(a => a !== artist)
        : [...filters.artists, artist]
    });
  };

  const toggleEpoche = (epoche: string) => {
    setFilters({
      ...filters,
      epoches: filters.epoches.includes(epoche)
        ? filters.epoches.filter(e => e !== epoche)
        : [...filters.epoches, epoche]
    });
  };

  const toggleTag = (tag: string) => {
    setFilters({
      ...filters,
      tags: filters.tags.includes(tag)
        ? filters.tags.filter(t => t !== tag)
        : [...filters.tags, tag]
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
    <div className="border-b border-neutral-200 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            <SlidersHorizontal className="size-5" />
            <span>Filters</span>
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
              Clear all
            </Button>
          )}
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 animate-in slide-in-from-top duration-200">
            {/* Artist Filter */}
            <div>
              <label className="text-neutral-700 mb-2 block">Artist</label>
              <div className="flex flex-wrap gap-2">
                {artists.map(artist => (
                  <Badge
                    key={artist}
                    variant={filters.artists.includes(artist) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleArtist(artist)}
                  >
                    {artist}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Epoche Filter */}
            <div>
              <label className="text-neutral-700 mb-2 block">Epoche</label>
              <div className="flex flex-wrap gap-2">
                {epoches.map(epoche => (
                  <Badge
                    key={epoche}
                    variant={filters.epoches.includes(epoche) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleEpoche(epoche)}
                  >
                    {epoche}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Signature Filter */}
            <div>
              <label className="text-neutral-700 mb-2 block">Signature</label>
              <div className="flex gap-2">
                <Badge
                  variant={filters.signed === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setFilters({ ...filters, signed: 'all' })}
                >
                  All
                </Badge>
                <Badge
                  variant={filters.signed === 'yes' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setFilters({ ...filters, signed: 'yes' })}
                >
                  Signed
                </Badge>
                <Badge
                  variant={filters.signed === 'no' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setFilters({ ...filters, signed: 'no' })}
                >
                  Unsigned
                </Badge>
              </div>
            </div>

            {/* Width Filter */}
            <div>
              <label className="text-neutral-700 mb-2 block">Width (cm)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minWidth || ''}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    minWidth: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="w-24 px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
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
                  className="w-24 px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Height Filter */}
            <div>
              <label className="text-neutral-700 mb-2 block">Height (cm)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minHeight || ''}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    minHeight: e.target.value ? parseInt(e.target.value) : null 
                  })}
                  className="w-24 px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
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
                  className="w-24 px-3 py-2 border border-neutral-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            {/* Tags Filter */}
            <div className="md:col-span-2 lg:col-span-3">
              <label className="text-neutral-700 mb-2 block">Tags</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && !isExpanded && (
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.artists.map(artist => (
              <Badge key={artist} variant="secondary" className="gap-1">
                {artist}
                <button onClick={() => toggleArtist(artist)}>
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            {filters.epoches.map(epoche => (
              <Badge key={epoche} variant="secondary" className="gap-1">
                {epoche}
                <button onClick={() => toggleEpoche(epoche)}>
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            {filters.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button onClick={() => toggleTag(tag)}>
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
            {filters.signed !== 'all' && (
              <Badge variant="secondary" className="gap-1">
                {filters.signed === 'yes' ? 'Signed' : 'Unsigned'}
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
