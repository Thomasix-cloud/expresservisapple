'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import {
  Smartphone,
  Tablet,
  Laptop,
  ArrowRight,
  Clock,
  Phone,
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

  const handleTabChange = (tab: Tab) => {
    setActive(tab);
    setSelectedModelId(repairData[tab][0].id);
  };

  const selectedModel = useMemo<DeviceModel>(() => {
    return (
      repairData[active].find((m) => m.id === selectedModelId) ??
      repairData[active][0]
    );
  }, [active, selectedModelId]);

  const groups = useMemo(() => getGroups(active), [active]);
  const models = repairData[active];
  const hasMultipleModels = models.length > 1;

  return (
    <section id="cenik" className="py-20 md:py-28 bg-white">
      <div className="container-narrow">
        <AnimatedSection direction="none">
          <div className="max-w-2xl mb-10">
            <h2 className="heading-accent text-3xl sm:text-4xl font-bold text-dark mb-4 tracking-tight">
              Ceník oprav
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Vyberte své zařízení a zjistěte přesnou cenu. Všechny ceny jsou
              včetně práce a&nbsp;DPH.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <div className="bg-white rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border">
              {(Object.keys(tabData) as Tab[]).map((key) => {
                const { icon: Icon, label } = tabData[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleTabChange(key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-semibold transition-colors relative ${
                      active === key
                        ? 'text-primary'
                        : 'text-gray-400 hover:text-dark'
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

            {/* Model selector — native select (mobile-friendly) */}
            {hasMultipleModels && (
              <div className="px-5 md:px-8 pt-5 pb-2">
                <select
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  className="w-full max-w-sm px-4 py-3 bg-surface border border-border rounded-xl text-sm font-medium text-dark appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  aria-label="Vyberte model"
                >
                  {groups.map((group) => (
                    <optgroup key={group} label={group}>
                      {models
                        .filter((m) => m.group === group)
                        .map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            )}

            {/* Price rows — single semantic table */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedModel.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <table className="w-full border-collapse">
                  <caption className="sr-only">
                    Ceník oprav pro {selectedModel.name}
                  </caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th
                        scope="col"
                        className="px-5 md:px-8 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400"
                      >
                        Služba
                      </th>
                      <th
                        scope="col"
                        className="px-3 md:px-8 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400"
                      >
                        Cena
                      </th>
                      <th
                        scope="col"
                        className="px-5 md:px-8 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400"
                      >
                        Čas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {selectedModel.repairs.map((item, i) => (
                      <tr
                        key={i}
                        className="hover:bg-surface/50 transition-colors"
                      >
                        <td className="px-5 md:px-8 py-3.5 text-sm text-gray-700">
                          {item.name}
                        </td>
                        <td className="px-3 md:px-8 py-3.5 text-right text-sm font-bold text-dark whitespace-nowrap">
                          {formatPrice(item.price)}
                        </td>
                        <td className="px-5 md:px-8 py-3.5 text-right text-xs font-medium text-gray-400 whitespace-nowrap">
                          {item.time ? (
                            <span className="inline-flex items-center gap-0.5">
                              <Clock className="w-3 h-3" />
                              {item.time}&nbsp;min
                            </span>
                          ) : (
                            <span aria-hidden="true">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>

            {/* Footer note */}
            <div className="px-5 md:px-8 py-3 border-t border-border">
              <p className="text-xs text-gray-400">
                Všechny ceny jsou uvedeny včetně práce a DPH.
                {active === 'macbook' &&
                  ' Cena baterie se může lišit dle konkrétního modelu.'}{' '}
                Ceník dalších modelů na vyžádání.
              </p>
            </div>

            {/* CTA strip — light */}
            <div className="bg-surface px-5 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border">
              <p className="text-sm text-dark">
                Nejste si jisti?{' '}
                <span className="text-primary font-semibold">
                  Diagnostika je zdarma při realizaci opravy.
                </span>
              </p>
              <a
                href="tel:+420777041184"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                +420 777 041 184
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
