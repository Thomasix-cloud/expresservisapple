'use client';

import AnimatedSection from './AnimatedSection';
import {
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Watch,
  ArrowRight,
} from 'lucide-react';

const products = [
  { icon: Smartphone, label: 'iPhone' },
  { icon: Laptop, label: 'MacBook' },
  { icon: Tablet, label: 'iPad' },
  { icon: Headphones, label: 'AirPods' },
  { icon: Watch, label: 'Apple Watch' },
];

export default function SalesSection() {
  return (
    <section
      id="prodej"
      className="py-20 md:py-28 bg-gradient-to-bl from-[#09090b] via-[#1a1033] to-[#09090b] relative overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container-narrow relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <AnimatedSection direction="left">
            <div>
              <h2 className="heading-accent text-3xl sm:text-4xl font-extrabold text-white mb-4 after:bg-primary">
                Prodej Apple zařízení
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Nabízíme nová i repasovaná Apple zařízení za výhodné ceny. Každý
                produkt prochází pečlivou kontrolou a je dodáván
                se&nbsp;zárukou.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Nové produkty za konkurenční ceny',
                  'Certifikované repasované zařízení',
                  'Záruka na všechny produkty',
                  'Příslušenství a ochranné doplňky',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-white/80 text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt" className="btn-primary py-3.5 px-7">
                Poptat zařízení
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>

          {/* Right — product cards */}
          <AnimatedSection direction="right">
            <div className="grid grid-cols-3 gap-3">
              {products.map((prod, i) => {
                const Icon = prod.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-3 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {prod.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
