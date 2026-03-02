'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import {
  Smartphone,
  Tablet,
  Laptop,
  ArrowRight,
  ChevronDown,
  Clock,
} from 'lucide-react';
import {
  repairData,
  getGroups,
  formatPrice,
  type DeviceCategory,
  type DeviceModel,
} from '../data/repairPrices';

type Tab = DeviceCategory;

const tabData: Record<Tab, { icon: typeof Smartphone; label: string }> = {
  iphone: { icon: Smartphone, label: 'iPhone' },
  ipad: { icon: Tablet, label: 'iPad' },
  macbook: { icon: Laptop, label: 'MacBook' },
};

export default function PricingSection() {
  const [active, setActive] = useState<Tab>('iphone');
  const [selectedModelId, setSelectedModelId] = useState<string>(
    repairData.iphone[0].id,
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // When category changes, pick first model
  const handleTabChange = (tab: Tab) => {
    setActive(tab);
    setSelectedModelId(repairData[tab][0].id);
    setDropdownOpen(false);
  };

  // Find the selected model
  const selectedModel = useMemo<DeviceModel>(() => {
    return (
      repairData[active].find((m) => m.id === selectedModelId) ??
      repairData[active][0]
    );
  }, [active, selectedModelId]);

  // Groups for the dropdown
  const groups = useMemo(() => getGroups(active), [active]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const models = repairData[active];
  const hasMultipleModels = models.length > 1;

  return (
    <section id="cenik" className="py-20 md:py-28 bg-gray-50">
      <div className="container-narrow">
        <AnimatedSection direction="left">
          <div className="max-w-2xl mb-10">
            <h2 className="heading-accent text-3xl sm:text-4xl font-extrabold text-dark mb-4">
              Ceník oprav
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Kompletní ceník oprav všech Apple zařízení. Vyberte svůj model a
              zjistěte přesnou cenu. Všechny ceny jsou včetně práce a DPH.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* ─── Tabs ─── */}
            <div className="flex border-b border-gray-100">
              {(Object.keys(tabData) as Tab[]).map((key) => {
                const { icon: Icon, label } = tabData[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
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

            {/* ─── Model selector ─── */}
            {hasMultipleModels && (
              <div className="px-6 md:px-8 pt-5 pb-3">
                <div ref={dropdownRef} className="relative max-w-sm">
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-semibold text-dark transition-colors"
                  >
                    <span>{selectedModel.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        dropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-20 top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto"
                      >
                        {groups.map((group) => (
                          <div key={group}>
                            <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 sticky top-0">
                              {group}
                            </div>
                            {models
                              .filter((m) => m.group === group)
                              .map((model) => (
                                <button
                                  key={model.id}
                                  onClick={() => {
                                    setSelectedModelId(model.id);
                                    setDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                    model.id === selectedModelId
                                      ? 'bg-primary/5 text-primary font-semibold'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  {model.name}
                                </button>
                              ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* ─── Price rows ─── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedModel.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-gray-50"
              >
                {selectedModel.repairs.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-6 md:px-8 py-4 hover:bg-gray-50/50 transition-colors gap-4"
                  >
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className="text-sm font-bold text-dark whitespace-nowrap flex items-center gap-2">
                      {formatPrice(item.price)}
                      {item.time && (
                        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-gray-400">
                          <Clock className="w-3 h-3" />
                          {item.time}&nbsp;min
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* ─── Footer note ─── */}
            <div className="px-6 md:px-8 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Všechny ceny jsou uvedeny včetně práce a DPH.
                {active === 'macbook' &&
                  ' Cena baterie se může lišit dle konkrétního modelu.'}
              </p>
            </div>

            {/* ─── CTA strip ─── */}
            <div className="bg-dark px-6 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-white">
                Nejste si jisti?{' '}
                <span className="text-accent font-semibold">
                  Diagnostika je zdarma
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
