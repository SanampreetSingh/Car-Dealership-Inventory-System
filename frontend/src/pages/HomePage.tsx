import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, BadgePercent } from 'lucide-react';
import { getVehicles } from '../api/vehicleApi';
import type { Vehicle } from '../types';
import VehicleGrid from '../components/vehicles/VehicleGrid';
import VehicleModal from '../components/vehicles/VehicleModal';

const HomePage = () => {
  const [featured, setFeatured] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await getVehicles({ limit: 6, page: 1 });
        setFeatured(res.vehicles);
      } catch {
        // handled globally
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const handlePurchased = (updated: Vehicle) => {
    setFeatured((prev) =>
      prev.map((v) => (v._id === updated._id ? updated : v))
    );
    setQuickViewVehicle((prev) =>
      prev && prev._id === updated._id ? updated : prev
    );
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-stone-800">
        {/* Added pointer-events-none here to prevent click blocking */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,119,6,0.15),transparent_50%)]" />
        
        {/* Added relative and z-10 here to pull content above the background */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full border border-amber-800 bg-amber-950/40 px-3 py-1 text-xs font-medium text-amber-400">
                Trusted by 10,000+ drivers
              </span>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-stone-50 sm:text-5xl lg:text-6xl">
                Find Your Next
                <span className="block bg-linear-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Dream Vehicle
                </span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-stone-400">
                Browse our curated inventory of certified vehicles — real-time
                availability, transparent pricing, zero pressure.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/search"
                  className="flex items-center gap-2 rounded-lg bg-linear-to-r from-amber-500 to-amber-600 px-6 py-3 font-semibold text-stone-950 shadow-lg shadow-amber-900/30 transition-transform hover:scale-105"
                >
                  Browse Inventory <ArrowRight className="h-4 w-4" />
                </Link>
              
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-lg border border-stone-700 px-6 py-3 font-semibold text-stone-200 transition-colors hover:border-amber-600 hover:text-amber-500"
                >
                  See Featured
                </button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-stone-800 pt-6">
                {[
                  { label: 'Vehicles Listed', value: '500+' },
                  { label: 'Certified Dealers', value: '40+' },
                  { label: 'Happy Buyers', value: '10K+' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-amber-500">{stat.value}</p>
                    <p className="text-xs text-stone-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="group relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-tr from-amber-600/20 to-transparent blur-2xl" />
              <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-stone-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&auto=format&fit=crop&q=80"
                alt="Featured vehicle"
                className="relative rounded-2xl border border-stone-800 object-cover shadow-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-amber-900/20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-stone-800 bg-stone-900/50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: ShieldCheck, title: 'Certified Quality', desc: 'Every vehicle inspected & verified' },
            { icon: Truck, title: 'Fast Delivery', desc: 'Doorstep delivery available nationwide' },
            { icon: BadgePercent, title: 'Best Prices', desc: 'Transparent, no hidden fees' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-950/50 text-amber-500">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-100">{item.title}</p>
                <p className="text-xs text-stone-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured vehicles */}
      <section id="featured" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-50 sm:text-3xl">
              Featured Vehicles
            </h2>
            <p className="mt-1 text-stone-500">Hand-picked from our latest inventory</p>
          </div>
          <Link
            to="/search"
            className="hidden items-center gap-1 text-sm font-medium text-amber-500 hover:underline sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <VehicleGrid
          vehicles={featured}
          loading={loading}
          emptyTitle="No vehicles available yet"
          emptyMessage="Check back soon for new inventory."
          onPurchased={handlePurchased}
          onQuickView={setQuickViewVehicle}
        />
      </section>

      <VehicleModal
        vehicle={quickViewVehicle}
        onClose={() => setQuickViewVehicle(null)}
        onPurchased={handlePurchased}
      />
    </div>
  );
};

export default HomePage;