import { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { VehicleFilters } from '../../types';

interface FilterSidebarProps {
  filters: VehicleFilters;
  onApply: (filters: VehicleFilters) => void;
  onClear: () => void;
}

const CATEGORIES = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'EV', 'Convertible', 'Luxury', 'MPV', 'Other'];

const FilterSidebar = ({ filters, onApply, onClear }: FilterSidebarProps) => {
  const [make, setMake] = useState(filters.make || '');
  const [category, setCategory] = useState(filters.category || '');
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() || '');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMake(filters.make || '');
    setCategory(filters.category || '');
    setMinPrice(filters.minPrice?.toString() || '');
    setMaxPrice(filters.maxPrice?.toString() || '');
  }, [filters]);

  const handleApply = () => {
    onApply({
      make: make || undefined,
      category: category || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
    setMobileOpen(false);
  };

  const handleClear = () => {
    setMake('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    onClear();
    setMobileOpen(false);
  };

  const FiltersBody = (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-stone-300">Make</label>
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="e.g. Toyota"
          className="w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-stone-300">Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? '' : cat)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                category === cat
                  ? 'border-amber-600 bg-amber-950/50 text-amber-400'
                  : 'border-stone-700 text-stone-400 hover:border-stone-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-stone-300">Price Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
          />
          <span className="text-stone-600">–</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 rounded-lg bg-linear-to-r from-amber-500 to-amber-600 py-2 text-sm font-semibold text-stone-950 transition-transform hover:scale-[1.02]"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClear}
          className="rounded-lg border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 transition-colors hover:border-stone-500"
        >
          Clear
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-fit w-64 shrink-0 rounded-2xl border border-stone-800 bg-stone-900 p-5 lg:block">
        <h3 className="mb-5 flex items-center gap-2 font-semibold text-stone-100">
          <SlidersHorizontal className="h-4 w-4 text-amber-500" /> Filters
        </h3>
        {FiltersBody}
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="mb-4 flex items-center gap-2 rounded-lg border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" /> Filters
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-80 max-w-[85vw] flex-col overflow-y-auto bg-stone-950 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-semibold text-stone-100">
                <SlidersHorizontal className="h-4 w-4 text-amber-500" /> Filters
              </h3>
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5 text-stone-400" />
              </button>
            </div>
            {FiltersBody}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;