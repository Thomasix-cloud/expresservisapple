'use client';

import AnimatedSection from './AnimatedSection';
import BuybackWizard from './BuybackWizard';
import { ArrowRight, Phone } from 'lucide-react';

export default function SalesSection() {
  return (
    <section id="prodej" className="py-20 md:py-28 bg-white">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — text */}
          <AnimatedSection direction="none">
            <div>
              <h2 className="heading-accent text-3xl sm:text-4xl font-bold text-dark mb-4 tracking-tight">
                Prodej &amp; výkup Apple zařízení
              </h2>

              {/* Prodej subsection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-dark mb-2">Prodej</h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Nabízíme nová i certifikovaně repasovaná Apple zařízení za
                  výhodné ceny. Každý kus prochází pečlivou kontrolou a je
                  dodáván se zárukou.
                </p>
                <a
                  href="#kontakt"
                  className="btn-primary !py-2.5 !px-5 !text-sm"
                >
                  Poptat zařízení
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Výkup subsection */}
              <div className="pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-dark mb-2">
                  Výkup iPhonů
                </h3>
                <p className="text-text-secondary leading-relaxed mb-5">
                  Vykupujeme vaše staré iPhony za férové ceny. Zjistěte si
                  odhadovanou cenu v kalkulačce — stačí pár kliknutí.
                </p>
                <ul className="space-y-2 text-sm text-text-secondary mb-6">
                  {[
                    'iPhone 14 Pro — výkup od 9 000 Kč',
                    'iPhone 15 — výkup od 12 000 Kč',
                    'iPhone 15 Pro — výkup od 16 000 Kč',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-text-secondary">
                  Chcete prodat iPad, MacBook nebo Apple Watch?{' '}
                  <a
                    href="tel:+420777041184"
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" />
                    Zavolejte nám
                  </a>
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Buyback wizard */}
          <AnimatedSection direction="up" delay={0.1}>
            <BuybackWizard />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
