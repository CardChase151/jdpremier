import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Truck } from 'lucide-react';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/quote', label: 'Request a Quote' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="JD Premier Logistics — home">
          <img
            src="/logo.png"
            alt="JD Premier Logistics"
            className="h-9 lg:h-11 w-auto object-contain"
            width="105" height="55"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold">
          {NAV.slice(0, 4).map(n => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}
              className={({ isActive }) =>
                `transition-colors hover:opacity-80 ${isActive ? 'text-brand-red' : ''}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/quote" className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-md font-bold text-[13px] uppercase tracking-wider transition-colors shadow-sm bg-brand-blue text-white hover:bg-brand-blue-deep">
            <Truck size={14} /> Get a Quote
          </Link>

          <button onClick={() => setOpen(o => !o)} className="lg:hidden p-2" aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-slate-200 px-5 py-4 space-y-2">
          {NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 font-semibold text-[15px] ${isActive ? 'text-brand-red' : ''}`}>
              {n.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
