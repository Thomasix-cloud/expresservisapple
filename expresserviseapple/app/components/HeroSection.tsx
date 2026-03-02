'use client';

import { motion } from 'framer-motion';
import { Phone, ArrowRight, Smartphone, Laptop, Tablet } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#09090b] via-[#0f172a] to-[#09090b]"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative container-narrow pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/15 text-primary text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Otevřeno dnes 8:30–18:00
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
              Rozbil se vám
              <br />
              <span className="text-primary">iPhone?</span>
              <br />
              <span className="text-accent text-3xl sm:text-4xl lg:text-5xl font-bold">
                Opravíme ho na počkání.
              </span>
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              Expresní servis Apple zařízení v centru Brna. Originální díly,
              24&nbsp;měsíců záruka, většina oprav do&nbsp;hodiny.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <a href="#kontakt" className="btn-primary py-3.5 px-7">
                <Phone className="w-4 h-4" />
                Objednat opravu
              </a>
              <a
                href="#cenik"
                className="btn-secondary py-3.5 px-7 hover:bg-primary hover:text-white"
                style={{ borderColor: '#3b82f6', color: '#3b82f6' }}
              >
                Zobrazit ceník
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70">
              {['Originální díly', 'Záruka 24 měsíců', '10+ let praxe'].map(
                (item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-green-500"
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
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* Right — visual device showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="bg-dark-lighter border border-gray-600/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative space-y-6">
                  <div className="text-center mb-8">
                    <p className="text-xs uppercase tracking-wider text-white/60 mb-2">
                      Opravujeme
                    </p>
                    <div className="flex justify-center gap-8">
                      {[
                        { Icon: Smartphone, label: 'iPhone' },
                        { Icon: Tablet, label: 'iPad' },
                        { Icon: Laptop, label: 'MacBook' },
                      ].map(({ Icon, label }) => (
                        <div key={label} className="text-center">
                          <div className="w-14 h-14 mx-auto rounded-xl bg-gray-800 flex items-center justify-center mb-2">
                            <Icon className="w-7 h-7 text-primary" />
                          </div>
                          <span className="text-xs text-white/70">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        label: 'Doba opravy',
                        value: '30–60 min',
                        detail: 'na počkání',
                      },
                      {
                        label: 'Spokojených zákazníků',
                        value: '5 000+',
                        detail: 'a stále přibývají',
                      },
                      {
                        label: 'Diagnostika',
                        value: 'ZDARMA',
                        detail: 'vždy bez poplatku',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-gray-800/50 border border-gray-700/30"
                      >
                        <span className="text-sm text-accent">
                          {item.label}
                        </span>
                        <div className="text-right">
                          <span className="text-sm font-bold text-white">
                            {item.value}
                          </span>
                          <span className="text-xs text-accent/70 ml-2">
                            {item.detail}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-accent text-white px-4 py-2.5 rounded-xl shadow-lg shadow-accent/25 text-sm font-bold"
              >
                NON-STOP linka 📞
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
