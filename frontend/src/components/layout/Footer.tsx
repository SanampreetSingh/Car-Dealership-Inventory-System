import { Link } from 'react-router-dom';
import { Car, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-stone-800 bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-amber-500 to-amber-700">
                <Car className="h-5 w-5 text-stone-950" />
              </div>
              <span className="font-bold tracking-tight text-stone-50">
                Apex<span className="text-amber-500">Motors</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-stone-500">
              Your trusted destination for certified vehicles — transparent
              pricing, verified quality, zero pressure.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-stone-200">Quick Links</h4>
            <ul className="space-y-2 text-sm text-stone-500">
              <li>
                <Link to="/" className="transition-colors hover:text-amber-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="transition-colors hover:text-amber-500">
                  Browse Inventory
                </Link>
              </li>
              <li>
                <Link to="/auth" className="transition-colors hover:text-amber-500">
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-stone-200">Categories</h4>
            <ul className="space-y-2 text-sm text-stone-500">
              {['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'EV', 'Convertible', 'Other'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/search?category=${encodeURIComponent(cat)}`}
                    className="transition-colors hover:text-amber-500"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-stone-200">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-amber-600" />
                123 Showroom Ave, Autoville
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-amber-600" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-amber-600" />
                hello@apexmotors.dev
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-6 sm:flex-row">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} ApexMotors. Built for a placement assessment.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-amber-500"
          >
            View Source
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;