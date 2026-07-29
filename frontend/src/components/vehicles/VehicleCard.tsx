import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Calendar, ShoppingCart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Vehicle } from '../../types';
import { useAppSelector } from '../../app/hooks';
import { purchaseVehicle } from '../../api/vehicleApi';
import { cn, formatPrice } from '../../lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPurchased?: (vehicle: Vehicle) => void;
  onQuickView?: (vehicle: Vehicle) => void;
}

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=60';

const VehicleCard = ({ vehicle, onPurchased, onQuickView }: VehicleCardProps) => {
  const [purchasing, setPurchasing] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const outOfStock = vehicle.quantity <= 0;

  const handlePurchase = async (e: React.MouseEvent) => {
    e.stopPropagation(); // don't trigger quick-view when clicking purchase
    if (!isAuthenticated) {
      toast.info('Please log in to purchase this vehicle');
      navigate('/auth', { state: { from: window.location.pathname + window.location.search } });
      return;
    }
    setPurchasing(true);
    try {
      const res = await purchaseVehicle(vehicle._id);
      toast.success(`${vehicle.make} ${vehicle.model} purchased!`);
      onPurchased?.(res.vehicle);
    } catch {
      // handled globally by axios interceptor
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-lg shadow-black/20"
    >
      {/* Image — clickable for quick view */}
      <div
        className="relative h-44 cursor-pointer overflow-hidden bg-stone-800"
        onClick={() => onQuickView?.(vehicle)}
      >
        <img
          src={vehicle.imageUrl || FALLBACK_IMG}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMG;
          }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-stone-950/80 px-2.5 py-1 text-xs font-medium capitalize text-amber-400 backdrop-blur-sm">
          {vehicle.category}
        </span>
        {outOfStock && (
          <span className="absolute right-3 top-3 rounded-full bg-red-900/90 px-2.5 py-1 text-xs font-semibold text-red-100">
            Sold Out
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Title/price — clickable for quick view */}
        <div
          className="flex cursor-pointer items-start justify-between gap-2"
          onClick={() => onQuickView?.(vehicle)}
        >
          <h3 className="font-semibold leading-tight text-stone-50 transition-colors group-hover:text-amber-400">
            {vehicle.make} {vehicle.model}
          </h3>
          <span className="whitespace-nowrap text-lg font-bold text-amber-500">
            {formatPrice(vehicle.price)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {vehicle.year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            {vehicle.quantity > 0 ? `${vehicle.quantity} in stock` : 'Unavailable'}
          </span>
        </div>

        {vehicle.description && (
          <p className="line-clamp-2 text-sm text-stone-400">
            {vehicle.description}
          </p>
        )}

        <button
          onClick={handlePurchase}
          disabled={outOfStock || purchasing}
          className={cn(
            'mt-auto flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all',
            outOfStock
              ? 'cursor-not-allowed bg-stone-800 text-stone-500'
              : 'bg-linear-to-r from-amber-500 to-amber-600 text-stone-950 hover:shadow-lg hover:shadow-amber-900/40 active:scale-95'
          )}
        >
          {purchasing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}
          {outOfStock ? 'Out of Stock' : purchasing ? 'Processing...' : 'Purchase'}
        </button>
      </div>
    </motion.div>
  );
};

export default VehicleCard;