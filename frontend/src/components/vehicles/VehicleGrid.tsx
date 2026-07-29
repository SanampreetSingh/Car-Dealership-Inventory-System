import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import type { Vehicle } from '../../types';
import VehicleCard from './VehicleCard';

interface VehicleGridProps {
  vehicles: Vehicle[];
  loading: boolean;
  skeletonCount?: number;
  emptyTitle?: string;
  emptyMessage?: string;
  onPurchased?: (vehicle: Vehicle) => void;
  onQuickView?: (vehicle: Vehicle) => void;
}

const VehicleGrid = ({
  vehicles,
  loading,
  skeletonCount = 6,
  emptyTitle = 'No vehicles found',
  emptyMessage = 'Try adjusting your filters or check back later.',
  onPurchased,
  onQuickView,
}: VehicleGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className="h-96 animate-pulse rounded-2xl border border-stone-800 bg-stone-900"
          />
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-stone-800 py-24 text-center"
      >
        <SearchX className="h-10 w-10 text-stone-700" />
        <p className="font-medium text-stone-300">{emptyTitle}</p>
        <p className="max-w-xs text-sm text-stone-500">{emptyMessage}</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle._id}
          vehicle={vehicle}
          onPurchased={onPurchased}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default VehicleGrid;