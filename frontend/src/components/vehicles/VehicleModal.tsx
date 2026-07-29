import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, Gauge, ShoppingCart, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Vehicle } from '../../types';
import { useAppSelector } from '../../app/hooks';
import { purchaseVehicle } from '../../api/vehicleApi';
import { formatPrice, cn } from '../../lib/utils';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onPurchased?: (vehicle: Vehicle) => void;
}

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&auto=format&fit=crop&q=60';

const VehicleModal = ({ vehicle, onClose, onPurchased }: VehicleModalProps) => {
  const [purchasing, setPurchasing] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!vehicle) return null;

  const outOfStock = vehicle.quantity <= 0;

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast.info('Please log in to purchase this vehicle');
      onClose();
      navigate('/auth', { state: { from: window.location.pathname + window.location.search } });
      return;
    }
    setPurchasing(true);
    try {
      const res = await purchaseVehicle(vehicle._id);
      toast.success(`${vehicle.make} ${vehicle.model} purchased!`);
      onPurchased?.(res.vehicle);
      onClose();
    } catch {
      // handled globally
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl md:flex-row"
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full bg-stone-950/70 p-1.5 text-stone-300 backdrop-blur-sm hover:text-amber-500"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Image */}
          <div className="relative h-56 shrink-0 bg-stone-800 md:h-auto md:w-1/2">
            <img
              src={vehicle.imageUrl || FALLBACK_IMG}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMG;
              }}
            />
            {outOfStock ? (
              <span className="absolute left-3 top-3 rounded-full bg-red-900/90 px-2.5 py-1 text-xs font-semibold text-red-100">
                Sold Out
              </span>
            ) : vehicle.quantity > 0 && vehicle.quantity < 5 ? (
              <span className="absolute left-3 top-3 rounded-full bg-amber-900/90 px-2.5 py-1 text-xs font-semibold text-amber-100">
                Few Left
              </span>
            ) : null}
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-col overflow-y-auto p-6">
            <span className="mb-2 w-fit rounded-full bg-amber-950/50 px-2.5 py-1 text-xs font-medium capitalize text-amber-400">
              {vehicle.category}
            </span>
            <h2 className="text-2xl font-bold text-stone-50">
              {vehicle.make} {vehicle.model}
            </h2>
            <p className="mt-1 text-2xl font-bold text-amber-500">
              {formatPrice(vehicle.price)}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 border-y border-stone-800 py-4 text-sm text-stone-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-amber-600" /> {vehicle.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Gauge className="h-4 w-4 text-amber-600" />
                {vehicle.quantity === 0
                  ? 'Out of stock'
                  : vehicle.quantity < 5
                    ? 'Only a few left'
                    : 'In stock'}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-amber-600" /> {vehicle.category}
              </span>
            </div>

            <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-400">
              {vehicle.description ||
                'No additional description provided for this vehicle. Contact our sales team for more details.'}
            </p>

            <button
              onClick={handlePurchase}
              disabled={outOfStock || purchasing}
              className={cn(
                'mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all',
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
              {outOfStock ? 'Out of Stock' : purchasing ? 'Processing...' : 'Purchase Now'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VehicleModal;