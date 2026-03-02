'use client';

import { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { Smartphone, Tablet, Laptop, ArrowRight } from 'lucide-react';

type Tab = 'iphone' | 'ipad' | 'macbook';

const tabData: Record<Tab, { icon: typeof Smartphone; label: string }> = {
  iphone: { icon: Smartphone, label: 'iPhone' },
  ipad: { icon: Tablet, label: 'iPad' },
  macbook: { icon: Laptop, label: 'MacBook' },
};

const pricing: Record<Tab, { repair: string; price: string }[]> = {
  iphone: [
    { repair: 'Výměna displeje', price: 'od 1 490 Kč' },
    { repair: 'Výměna baterie', price: 'od 890 Kč' },
    { repair: 'Oprava nabíjení', price: 'od 990 Kč' },
    { repair: 'Face ID / Touch ID', price: 'od 1 990 Kč' },
    { repair: 'Výměna zadního skla', price: 'od 1 490 Kč' },
    { repair: 'Oprava základní desky', price: 'od 2 490 Kč' },
  ],
  ipad: [
    { repair: 'Výměna displeje', price: 'od 2 490 Kč' },
    { repair: 'Výměna baterie', price: 'od 1 490 Kč' },
    { repair: 'Oprava konektoru', price: 'od 1 290 Kč' },
    { repair: 'Výměna kamery', price: 'od 990 Kč' },
    { repair: 'Softwarová oprava', price: 'od 690 Kč' },
  ],
  macbook: [
    { repair: 'Výměna displeje', price: 'od 4 990 Kč' },
    { repair: 'Výměna klávesnice', price: 'od 3 490 Kč' },
    { repair: 'Oprava logické desky', price: 'od 3 990 Kč' },
    { repair: 'Výměna baterie', price: 'od 2 490 Kč' },
    { repair: 'SSD výměna / upgrade', price: 'od 1 990 Kč' },
    { repair: 'Čištění a údržba', price: 'od 990 Kč' },
  ],
};

export default function PricingSection() {
  const [active, setActive] = useState<Tab>('iphone');

  return (
    <section id="cenik" className="py-20 md:py-28 bg-gray-50">
      <div className="container-narrow">
        <AnimatedSection direction="left">
          <div className="max-w-2xl mb-10">
            <h2 className="heading-accent text-3xl sm:text-4xl font-extrabold text-dark mb-4">
              Orientační ceník
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ceny jsou orientační a závisí na modelu zařízení. Přesnou cenu vám
              sdělíme po bezplatné diagnostice.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              {(Object.keys(tabData) as Tab[]).map((key) => {
                const { icon: Icon, label } = tabData[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-semibold transition-colors relative ${
                      active === key
                        ? 'text-primary'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    {active === key && (
                      <span className="absolute bottom-0 inset-x-4 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Price rows */}
            <div className="divide-y divide-gray-50">
              {pricing[active].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-6 md:px-8 py-4 hover:bg-gray-50/50 transition-colors"
                >
                  <span className="text-sm text-gray-700">{item.repair}</span>
                  <span className="text-sm font-bold text-dark whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA strip */}
            <div className="bg-dark px-6 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-white">
                Přesnou cenu zjistíte po{' '}
                <span className="text-accent font-semibold">
                  bezplatné diagnostice
                </span>
              </p>
              <a
                href="#kontakt"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-orange-300 transition-colors"
              >
                Kontaktovat nás
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
