import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getVehicles, searchVehicles } from '../api/vehicleApi';
import type { Vehicle, VehicleFilters } from '../types';
import VehicleGrid from '../components/vehicles/VehicleGrid';
import VehicleModal from '../components/vehicles/VehicleModal';
import FilterSidebar from '../components/vehicles/FilterSidebar';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);

  const keyword = searchParams.get('keyword') || '';
  const filters: VehicleFilters = {
    make: searchParams.get('make') || undefined,
    category: searchParams.get('category') || undefined,
    minPrice: searchParams.get('minPrice')
      ? Number(searchParams.get('minPrice'))
      : undefined,
    maxPrice: searchParams.get('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : undefined,
  };
  const page = Number(searchParams.get('page')) || 1;

  const loadVehicles = useCallback(async () => {
    setLoading(true);
    try {
      if (keyword) {
        const res = await searchVehicles(keyword);
        setVehicles(res.vehicles);
        setTotalPages(1);
        setCurrentPage(1);
      } else {
        const res = await getVehicles({ ...filters, page, limit: 9 });
        setVehicles(res.vehicles);
        setTotalPages(res.totalPages);
        setCurrentPage(res.currentPage);
      }
    } catch {
      // handled globally
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, page, JSON.stringify(filters)]);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const handleApplyFilters = (newFilters: VehicleFilters) => {
    const params: Record<string, string> = {};
    if (newFilters.make) params.make = newFilters.make;
    if (newFilters.category) params.category = newFilters.category;
    if (newFilters.minPrice) params.minPrice = String(newFilters.minPrice);
    if (newFilters.maxPrice) params.maxPrice = String(newFilters.maxPrice);
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  const goToPage = (p: number) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, page: String(p) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePurchased = (updated: Vehicle) => {
    setVehicles((prev) =>
      prev.map((v) => (v._id === updated._id ? updated : v))
    );
    setQuickViewVehicle((prev) =>
      prev && prev._id === updated._id ? updated : prev
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-50 sm:text-3xl">
          {keyword ? `Results for "${keyword}"` : 'Browse Inventory'}
        </h1>
        <p className="mt-1 text-stone-500">
          {loading
            ? 'Loading...'
            : `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {!keyword && (
          <FilterSidebar
            filters={filters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        )}

        <div className="flex-1">
          <VehicleGrid
            vehicles={vehicles}
            loading={loading}
            emptyTitle="No vehicles found"
            emptyMessage="Try adjusting your filters or search with a different keyword."
            onPurchased={handlePurchased}
            onQuickView={setQuickViewVehicle}
          />  

          {!loading && !keyword && totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-700 text-stone-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                    p === currentPage
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950'
                      : 'border border-stone-700 text-stone-300 hover:border-stone-500'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-700 text-stone-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <VehicleModal
        vehicle={quickViewVehicle}
        onClose={() => setQuickViewVehicle(null)}
        onPurchased={handlePurchased}
      />
    </div>
  );
};

export default SearchPage;