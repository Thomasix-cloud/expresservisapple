'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { label: 'O nás', href: '#o-nas' },
  { label: 'Služby', href: '#sluzby' },
  { label: 'Ceník', href: '#cenik' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Prodej', href: '#prodej' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#09090b] via-[#111827] to-[#09090b] border-t border-gray-800">
      <div className="container-narrow py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/Logo/logo-expres-servis orange.png"
                alt="Expres Servis Apple"
                width={160}
                height={72}
              />
            </div>
            <p className="text-white text-sm leading-relaxed">
              Profesionální servis a opravy Apple zařízení v&nbsp;Brně.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigace
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Kontakt
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+420123456789"
                  className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +420 123 456 789
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@expresservisapple.cz"
                  className="flex items-center gap-2 text-sm text-white hover:text-primary transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  info@expresservisapple.cz
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white">
                <MapPin className="w-3.5 h-3.5" />
                Kosmova 4, 612 00 Brno
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Otevírací doba
            </h4>
            <ul className="space-y-2 text-sm text-white">
              <li className="flex justify-between">
                <span>Po — Pá</span>
                <span className="text-white font-medium">8:30 — 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sobota</span>
                <span className="text-white font-medium">9:00 — 13:00</span>
              </li>
              <li className="flex justify-between">
                <span>Neděle</span>
                <span className="text-white">Zavřeno</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white">
            {' '}
            {new Date().getFullYear()} Expres Servis Apple. Všechna práva
            vyhrazena.
          </p>
          <p className="text-xs text-white">Vytvořeno s ❤️ v Brně</p>
        </div>
      </div>
    </footer>
  );
}
