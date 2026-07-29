import { useState } from 'react';
import { Pencil, Trash2, PackagePlus, X, Check } from 'lucide-react';
import type { Vehicle } from '../../types';
import { deleteVehicle, restockVehicle } from '../../api/vehicleApi';
import { toast } from 'sonner';
import { formatPrice, cn } from '../../lib/utils';
import LoadingSpinner from '../ui/LoadingSpinner';

interface AdminTableProps {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDeleted: (id: string) => void;
  onRestocked: (vehicle: Vehicle) => void;
}

const AdminTable = ({ vehicles, onEdit, onDeleted, onRestocked }: AdminTableProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [restockingId, setRestockingId] = useState<string | null>(null);
  const [restockAmount, setRestockAmount] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteVehicle(id);
      toast.success('Vehicle deleted');
      onDeleted(id);
    } catch {
      // handled globally
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const handleRestock = async (id: string) => {
    const qty = Number(restockAmount);
    if (!qty || qty <= 0) {
      toast.error('Enter a valid quantity to add');
      return;
    }
    try {
      const res = await restockVehicle(id, qty);
      toast.success(`Restocked +${qty} units`);
      onRestocked(res.vehicle);
      setRestockingId(null);
      setRestockAmount('');
    } catch {
      // handled globally
    }
  };

  if (vehicles.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-800 py-16 text-center text-stone-500">
        No vehicles in inventory yet. Add one to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-800">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-stone-800 bg-stone-900 text-stone-400">
          <tr>
            <th className="px-4 py-3 font-medium">Vehicle</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Year</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Stock</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-800">
          {vehicles.map((v) => (
            <tr key={v._id} className="bg-stone-950/50 transition-colors hover:bg-stone-900">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={v.imageUrl || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=100&auto=format&fit=crop&q=60'}
                    alt={v.make}
                    className="h-10 w-14 rounded-md object-cover"
                  />
                  <span className="font-medium text-stone-100">
                    {v.make} {v.model}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 capitalize text-stone-400">{v.category}</td>
              <td className="px-4 py-3 text-stone-400">{v.year}</td>
              <td className="px-4 py-3 font-medium text-amber-500">{formatPrice(v.price)}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs font-medium',
                    v.quantity === 0
                      ? 'bg-red-950 text-red-400'
                      : v.quantity < 5
                      ? 'bg-amber-950 text-amber-400'
                      : 'bg-emerald-950 text-emerald-400'
                  )}
                >
                  {v.quantity} in stock
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  {restockingId === v._id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        autoFocus
                        value={restockAmount}
                        onChange={(e) => setRestockAmount(e.target.value)}
                        placeholder="Qty"
                        className="w-16 rounded-md border border-stone-700 bg-stone-900 px-2 py-1 text-xs text-stone-100 outline-none focus:border-amber-600"
                      />
                      <button
                        onClick={() => handleRestock(v._id)}
                        className="rounded-md bg-emerald-900/50 p-1.5 text-emerald-400 hover:bg-emerald-900"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setRestockingId(null);
                          setRestockAmount('');
                        }}
                        className="rounded-md bg-stone-800 p-1.5 text-stone-400 hover:bg-stone-700"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : confirmDeleteId === v._id ? (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-stone-400">Confirm?</span>
                      <button
                        onClick={() => handleDelete(v._id)}
                        disabled={deletingId === v._id}
                        className="rounded-md bg-red-900/50 p-1.5 text-red-400 hover:bg-red-900"
                      >
                        {deletingId === v._id ? (
                          <LoadingSpinner size="sm" className="h-3.5 w-3.5" />
                        ) : (
                          <Check className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-md bg-stone-800 p-1.5 text-stone-400 hover:bg-stone-700"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setRestockingId(v._id)}
                        title="Restock"
                        className="rounded-md bg-stone-800 p-1.5 text-stone-300 hover:bg-stone-700 hover:text-amber-500"
                      >
                        <PackagePlus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onEdit(v)}
                        title="Edit"
                        className="rounded-md bg-stone-800 p-1.5 text-stone-300 hover:bg-stone-700 hover:text-amber-500"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(v._id)}
                        title="Delete"
                        className="rounded-md bg-stone-800 p-1.5 text-stone-300 hover:bg-red-900 hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;