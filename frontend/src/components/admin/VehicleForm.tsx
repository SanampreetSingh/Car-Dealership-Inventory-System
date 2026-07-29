import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Upload, Save } from 'lucide-react';
import type { Vehicle } from '../../types';
import { createVehicle, updateVehicle } from '../../api/vehicleApi';
import { toast } from 'sonner';
import LoadingSpinner from '../ui/LoadingSpinner';

interface VehicleFormInputs {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
  year: number;
  description?: string;
}

interface VehicleFormProps {
  editingVehicle: Vehicle | null;
  onClose: () => void;
  onSuccess: (vehicle: Vehicle) => void;
}

const CATEGORIES = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'EV', 'Convertible', 'Other'];

const VehicleForm = ({ editingVehicle, onClose, onSuccess }: VehicleFormProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    editingVehicle?.imageUrl || null
  );
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormInputs>({
    defaultValues: editingVehicle
      ? {
          make: editingVehicle.make,
          model: editingVehicle.model,
          category: editingVehicle.category,
          price: editingVehicle.price,
          quantity: editingVehicle.quantity,
          year: editingVehicle.year,
          description: editingVehicle.description,
        }
      : { category: 'Sedan' },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: VehicleFormInputs) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          formData.append(key, String(value));
        }
      });
      if (imageFile) formData.append('image', imageFile);

      const res = editingVehicle
        ? await updateVehicle(editingVehicle._id, formData)
        : await createVehicle(formData);

      toast.success(
        editingVehicle ? 'Vehicle updated successfully' : 'Vehicle added to inventory'
      );
      onSuccess(res.vehicle);
      onClose();
    } catch {
      // handled globally
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-stone-800 bg-stone-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-50">
            {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image upload */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-300">
              Vehicle Image
            </label>
            <label className="flex h-36 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-stone-700 bg-stone-950 transition-colors hover:border-amber-600">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1 text-stone-500">
                  <Upload className="h-6 w-6" />
                  <span className="text-xs">Click to upload image</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">Make</label>
              <input
                {...register('make', { required: 'Required' })}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none focus:border-amber-600"
              />
              {errors.make && <p className="mt-1 text-xs text-red-400">{errors.make.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">Model</label>
              <input
                {...register('model', { required: 'Required' })}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none focus:border-amber-600"
              />
              {errors.model && <p className="mt-1 text-xs text-red-400">{errors.model.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">Category</label>
              <select
                {...register('category', { required: true })}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm capitalize text-stone-100 outline-none focus:border-amber-600"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">Year</label>
              <input
                type="number"
                {...register('year', { required: 'Required', valueAsNumber: true })}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none focus:border-amber-600"
              />
              {errors.year && <p className="mt-1 text-xs text-red-400">{errors.year.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">Price ($)</label>
              <input
                type="number"
                step="0.01"
                {...register('price', { required: 'Required', valueAsNumber: true, min: 0 })}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none focus:border-amber-600"
              />
              {errors.price && <p className="mt-1 text-xs text-red-400">{errors.price.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-300">Quantity</label>
              <input
                type="number"
                {...register('quantity', { required: 'Required', valueAsNumber: true, min: 0 })}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none focus:border-amber-600"
              />
              {errors.quantity && (
                <p className="mt-1 text-xs text-red-400">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-300">
              Description (optional)
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none focus:border-amber-600"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 font-semibold text-stone-950 shadow-lg shadow-amber-900/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <LoadingSpinner size="sm" className="text-stone-950" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {submitting ? 'Saving...' : editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;