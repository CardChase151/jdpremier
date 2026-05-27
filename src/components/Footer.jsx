import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY } from '../lib/content.js';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="bg-white inline-block rounded-md p-2 mb-4">
            <img src="/logo.png" alt="JD Premier Logistics" className="h-10 w-auto object-contain" />
          </div>
          <p className="text-[14px] max-w-md leading-relaxed">{COMPANY.blurb}</p>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] font-bold mb-3 text-white">Navigate</div>
          <ul className="space-y-1.5 text-[14px]">
            <li><Link to="/" className="hover:opacity-100 opacity-70">Home</Link></li>
            <li><Link to="/about" className="hover:opacity-100 opacity-70">About</Link></li>
            <li><Link to="/services" className="hover:opacity-100 opacity-70">Services</Link></li>
            <li><Link to="/quote" className="hover:opacity-100 opacity-70">Request a Quote</Link></li>
            <li><Link to="/contact" className="hover:opacity-100 opacity-70">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] font-bold mb-3 text-white">Contact</div>
          <ul className="space-y-2 text-[14px]">
            <li className="flex items-start gap-2"><Phone size={14} className="mt-0.5 shrink-0" /> {COMPANY.phone}</li>
            <li className="flex items-start gap-2"><Mail size={14} className="mt-0.5 shrink-0" /> {COMPANY.email}</li>
            <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" /> Wills Point, TX</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-12 pt-6 border-t border-slate-700 text-[12px] flex flex-col md:flex-row justify-between gap-3">
        <div>© {new Date().getFullYear()} JD Premier Logistics. All rights reserved.</div>
        <div className="opacity-50">DOT &amp; MC numbers available on request.</div>
      </div>
    </footer>
  );
}
