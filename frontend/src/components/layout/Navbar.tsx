import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, User, LogOut, Car, LayoutDashboard } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchTerm.trim())}`);
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-800 bg-stone-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-900/30 transition-transform group-hover:scale-105">
            <Car className="h-5 w-5 text-stone-950" />
          </div>
          <span className="hidden font-bold tracking-tight text-stone-50 sm:block">
            Apex<span className="text-amber-500">Motors</span>
          </span>
        </Link>

        {/* Search bar - desktop */}
        <form
          onSubmit={handleSearch}
          className="mx-auto hidden w-full max-w-md flex-1 items-center md:flex"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search make, model, category..."
              className="w-full rounded-full border border-stone-700 bg-stone-900 py-2 pl-10 pr-4 text-sm text-stone-100 placeholder-stone-500 outline-none transition-colors focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>
        </form>

        {/* Right side - desktop */}
        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Link
            to="/search"
            className="text-sm font-medium text-stone-300 transition-colors hover:text-amber-500"
          >
            Browse
          </Link>

          {isAuthenticated && user?.role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-sm font-medium text-stone-300 transition-colors hover:text-amber-500"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3 border-l border-stone-800 pl-3">
              <span className="flex items-center gap-1.5 text-sm text-stone-400">
                <User className="h-4 w-4" />
                {user?.name?.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-medium text-stone-200 transition-colors hover:bg-stone-700"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="rounded-lg bg-linear-to-r from-amber-500 to-amber-600 px-4 py-1.5 text-sm font-semibold text-stone-950 shadow-md shadow-amber-900/30 transition-transform hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="ml-auto md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-stone-800 md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search vehicles..."
                  className="w-full rounded-full border border-stone-700 bg-stone-900 py-2 pl-10 pr-4 text-sm text-stone-100 outline-none focus:border-amber-600"
                />
              </form>

              <Link
                to="/search"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-stone-300"
              >
                Browse Vehicles
              </Link>

              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-stone-300"
                >
                  Admin Dashboard
                </Link>
              )}

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-stone-200"
                >
                  <LogOut className="h-4 w-4" /> Logout ({user?.name?.split(' ')[0]})
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-center text-sm font-semibold text-stone-950"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;