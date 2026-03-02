'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { label: 'O nás', href: '#o-nas' },
  { label: 'Služby', href: '#sluzby' },
  { label: 'Ceník', href: '#cenik' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Prodej', href: '#prodej' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top info bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-transparent text-white/80 text-xs transition-all duration-300 overflow-hidden ${
          scrolled ? 'h-0 opacity-0' : 'h-9 opacity-100'
        }`}
      >
        <div className="container-narrow h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              Kosmova 4, 612 00 Brno
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Po–Pá 8:30–18:00
            </span>
          </div>
          <a
            href="tel:+420123456789"
            className="flex items-center gap-1.5 text-white hover:text-primary transition-colors"
          >
            <Phone className="w-3 h-3" />
            +420 123 456 789
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'top-0 glass-header shadow-sm border-b border-gray-200/50'
            : 'top-9 bg-transparent'
        }`}
      >
        <div className="container-narrow">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center group">
              <Image
                src="/Logo/logo-expres-servis orange.png"
                alt="Expres Servis Apple"
                width={90}
                height={40}
                className="group-hover:scale-105 transition-transform"
                priority
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    scrolled
                      ? 'text-gray-600 hover:text-primary hover:bg-primary/5'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#kontakt"
                className="btn-primary ml-3 !py-2.5 !px-5 !text-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                Zavolat
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'text-dark hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
            >
              <div className="container-narrow py-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary border-b border-gray-50 last:border-0 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 px-4">
                  <a
                    href="tel:+420123456789"
                    className="btn-primary w-full justify-center !py-3"
                  >
                    <Phone className="w-4 h-4" />
                    +420 123 456 789
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
