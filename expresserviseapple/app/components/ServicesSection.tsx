'use client';

import AnimatedSection from './AnimatedSection';
import {
  Smartphone,
  Tablet,
  Laptop,
  CheckCircle,
  Headphones,
  Watch,
  Monitor,
  HardDrive,
  Battery,
  Wifi,
} from 'lucide-react';

const services = [
  {
    num: '01',
    title: 'iPhone servis',
    icon: Smartphone,
    accent: 'bg-blue-500',
    desc: 'Kompletní opravy všech modelů iPhone — od výměny displeje přes baterii až po opravu základní desky.',
    repairs: [
      'Výměna displeje',
      'Výměna baterie',
      'Oprava nabíjení',
      'Face ID / Touch ID',
      'Oprava základní desky',
      'Výměna zadního skla',
    ],
  },
  {
    num: '02',
    title: 'iPad servis',
    icon: Tablet,
    accent: 'bg-indigo-500',
    desc: 'Profesionální opravy iPadů všech generací. Displej, baterie, nabíjecí konektor i další.',
    repairs: [
      'Výměna displeje',
      'Výměna baterie',
      'Oprava konektoru',
      'Oprava tlačítek',
      'Výměna kamery',
      'Softwarová oprava',
    ],
  },
  {
    num: '03',
    title: 'MacBook servis',
    icon: Laptop,
    accent: 'bg-violet-500',
    desc: 'Servis MacBooků Air i Pro — klávesnice, displeje, logické desky, SSD upgrade a další.',
    repairs: [
      'Výměna displeje',
      'Výměna klávesnice',
      'Oprava logické desky',
      'SSD výměna / upgrade',
      'Výměna baterie',
      'Čištění a údržba',
    ],
  },
];

const extras = [
  { icon: Watch, label: 'Apple Watch' },
  { icon: Headphones, label: 'AirPods' },
  { icon: Monitor, label: 'iMac' },
  { icon: HardDrive, label: 'Záloha dat' },
  { icon: Battery, label: 'Baterie' },
  { icon: Wifi, label: 'Síťové problémy' },
];

export default function ServicesSection() {
  return (
    <section id="sluzby" className="py-20 md:py-28 bg-gray-50">
      <div className="container-narrow">
        <AnimatedSection direction="left">
          <div className="max-w-2xl mb-14">
            <h2 className="heading-accent text-3xl sm:text-4xl font-extrabold text-dark mb-4">
              Naše služby
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Specializujeme se na expresní opravy Apple zařízení. Většinu oprav
              zvládneme na počkání do&nbsp;jedné hodiny.
            </p>
          </div>
        </AnimatedSection>

        {/* Stacked horizontal cards */}
        <div className="space-y-5 mb-12">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    {/* Color accent band */}
                    <div
                      className={`${svc.accent} w-full md:w-2 h-2 md:h-auto flex-shrink-0`}
                    />

                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-3xl font-extrabold text-gray-200 leading-none select-none">
                          {svc.num}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-bold text-dark">
                              {svc.title}
                            </h3>
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed">
                            {svc.desc}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {svc.repairs.map((repair, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-1.5 text-sm text-gray-600"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                            {repair}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Extra services compact list */}
        <AnimatedSection direction="up" delay={0.3}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <p className="text-sm font-semibold text-dark mb-4 uppercase tracking-wide">
              Další služby
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {extras.map((ex, i) => {
                const ExIcon = ex.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ExIcon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-gray-600 text-center">
                      {ex.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
