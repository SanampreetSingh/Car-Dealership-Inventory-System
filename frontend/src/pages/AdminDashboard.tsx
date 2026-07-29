import { useEffect, useState } from 'react';
import { Plus, LayoutDashboard, Car, PackageCheck, AlertTriangle } from 'lucide-react';
import { getVehicles } from '../api/vehicleApi';
import type { Vehicle } from '../types';
import AdminTable from '../components/admin/AdminTable';
import VehicleForm from '../components/admin/VehicleForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const res = await getVehicles({ limit: 100 });
      setVehicles(res.vehicles);
    } catch {
      // handled globally
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleFormSuccess = (vehicle: Vehicle) => {
    setVehicles((prev) => {
      const exists = prev.find((v) => v._id === vehicle._id);
      return exists
        ? prev.map((v) => (v._id === vehicle._id ? vehicle : v))
        : [vehicle, ...prev];
    });
  };

  const handleDeleted = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v._id !== id));
  };

  const handleRestocked = (vehicle: Vehicle) => {
    setVehicles((prev) => prev.map((v) => (v._id === vehicle._id ? vehicle : v)));
  };

  const stats = {
    total: vehicles.length,
    inStock: vehicles.filter((v) => v.quantity > 0).length,
    lowStock: vehicles.filter((v) => v.quantity > 0 && v.quantity < 5).length,
    outOfStock: vehicles.filter((v) => v.quantity === 0).length,
  };

  if (loading) {
    return <LoadingSpinner fullScreen label="Loading inventory..." />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-stone-50 sm:text-3xl">
            <LayoutDashboard className="h-6 w-6 text-amber-500" />
            Admin Dashboard
          </h1>
          <p className="mt-1 text-stone-500">Manage your vehicle inventory</p>
        </div>
        <button
          onClick={() => {
            setEditingVehicle(null);
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-amber-500 to-amber-600 px-5 py-2.5 font-semibold text-stone-950 shadow-lg shadow-amber-900/30 transition-transform hover:scale-105"
        >
          <Plus className="h-4 w-4" /> Add Vehicle
        </button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Vehicles', value: stats.total, icon: Car, color: 'text-stone-300' },
          { label: 'In Stock', value: stats.inStock, icon: PackageCheck, color: 'text-emerald-400' },
          { label: 'Low Stock', value: stats.lowStock, icon: AlertTriangle, color: 'text-amber-400' },
          { label: 'Out of Stock', value: stats.outOfStock, icon: AlertTriangle, color: 'text-red-400' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-stone-800 bg-stone-900 p-4"
          >
            <stat.icon className={`mb-2 h-5 w-5 ${stat.color}`} />
            <p className="text-2xl font-bold text-stone-50">{stat.value}</p>
            <p className="text-xs text-stone-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <AdminTable
        vehicles={vehicles}
        onEdit={(v) => {
          setEditingVehicle(v);
          setShowForm(true);
        }}
        onDeleted={handleDeleted}
        onRestocked={handleRestocked}
      />

      {showForm && (
        <VehicleForm
          editingVehicle={editingVehicle}
          onClose={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default AdminDashboard;