'use client';

import AnimatedSection from './AnimatedSection';
import BuybackWizard from './BuybackWizard';
import { ArrowRight, Tablet, Monitor, Laptop, Watch } from 'lucide-react';

const otherDevices = [
  {
    icon: Tablet,
    name: 'iPad',
    maxPrice: '30 000',
  },
  {
    icon: Monitor,
    name: 'iMac',
    maxPrice: '100 000',
  },
  {
    icon: Laptop,
    name: 'MacBook',
    maxPrice: '100 000',
  },
  {
    icon: Watch,
    name: 'Apple Watch',
    maxPrice: '15 000',
  },
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
        {/* ── Top: text + wizard ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <AnimatedSection direction="left">
            <div>
              <h2 className="heading-accent text-3xl sm:text-4xl font-extrabold text-white mb-4 after:bg-primary">
                Prodej &amp; výkup Apple zařízení
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Nabízíme nová i repasovaná Apple zařízení za výhodné ceny. Každý
                produkt prochází pečlivou kontrolou a je dodáván
                se&nbsp;zárukou. Zároveň vykupujeme vaše staré
                iPhony&nbsp;—&nbsp;zjistěte si cenu hned.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Nové produkty za konkurenční ceny',
                  'Certifikované repasované zařízení',
                  'Záruka na všechny produkty',
                  'Výkup starých iPhonů za férové ceny',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-white/80 text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-primary flex-shrink-0"
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

          {/* Right — Buyback wizard */}
          <AnimatedSection direction="right">
            <BuybackWizard />
          </AnimatedSection>
        </div>

        {/* ── Bottom: Other devices grid ── */}
        <AnimatedSection direction="up" delay={0.2}>
          <div className="mt-20 md:mt-28">
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Chceš prodat jiné zařízení než iPhone?
              </h3>
              <p className="text-white/60 text-sm sm:text-base">
                Nejšťavnatější výkup kompletního sortimentu Apple!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherDevices.map((device) => {
                const Icon = device.icon;
                return (
                  <a
                    key={device.name}
                    href="#kontakt"
                    className="group flex items-center gap-5 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">
                        {device.name}
                      </h4>
                      <p className="text-accent font-semibold text-sm">
                        Výkup až {device.maxPrice}&nbsp;Kč
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            <p className="text-center text-white/50 text-sm mt-6">
              V případě prodeje jiných zařízení než iPhone nás{' '}
              <a href="#kontakt" className="text-primary hover:underline">
                kontaktujte
              </a>
              .
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
