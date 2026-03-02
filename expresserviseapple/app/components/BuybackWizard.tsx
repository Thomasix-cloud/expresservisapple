'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  HardDrive,
  Star,
  Battery,
  MonitorSmartphone,
  Camera,
  ShieldAlert,
  BadgeDollarSign,
  Send,
  CheckCircle,
} from 'lucide-react';
import buybackPrices, {
  conditionOptions,
  defectPenalties,
  type Condition,
  type BuybackModel,
} from '../data/buybackPrices';

/* ─── step metadata ──────────────────────────────────────── */
const stepsMeta = [
  { label: 'Model', icon: Smartphone },
  { label: 'Úložiště', icon: HardDrive },
  { label: 'Stav', icon: Star },
  { label: 'Baterie', icon: Battery },
  { label: 'Displej', icon: MonitorSmartphone },
  { label: 'Kamera', icon: Camera },
  { label: 'Tělo', icon: ShieldAlert },
  { label: 'Cena', icon: BadgeDollarSign },
];

/* ─── reusable ANO / NE pills ────────────────────────────── */
function YesNoButtons({
  value,
  onChange,
  yesLabel = 'ANO',
  noLabel = 'NE',
  /** If true, "ANO" is the desirable (default-looking) option, otherwise "NE" */
  positiveIsYes = true,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
  positiveIsYes?: boolean;
}) {
  const btn = (label: string, active: boolean, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
        active
          ? 'bg-primary text-white shadow-lg shadow-primary/30'
          : 'bg-white/80 text-gray-600 hover:bg-blue-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex gap-3">
      {positiveIsYes ? (
        <>
          {btn(yesLabel, value === true, () => onChange(true))}
          {btn(noLabel, value === false, () => onChange(false))}
        </>
      ) : (
        <>
          {btn(noLabel, value === false, () => onChange(false))}
          {btn(yesLabel, value === true, () => onChange(true))}
        </>
      )}
    </div>
  );
}

/* ─── compact step indicator for 8 steps ─────────────────── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-6">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        const isDone = i < current;
        return (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className={`transition-all duration-300 rounded-full ${
                isActive
                  ? 'w-8 h-3 bg-primary'
                  : isDone
                    ? 'w-3 h-3 bg-primary/60'
                    : 'w-3 h-3 bg-white/20'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}

/* ─── main wizard component ──────────────────────────────── */
export default function BuybackWizard() {
  /* state */
  const [step, setStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState<BuybackModel | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(
    null,
  );
  const [batteryOk, setBatteryOk] = useState<boolean | null>(null);
  const [brokenDisplay, setBrokenDisplay] = useState<boolean | null>(null);
  const [brokenCamera, setBrokenCamera] = useState<boolean | null>(null);
  const [bentOrBroken, setBentOrBroken] = useState<boolean | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  /* derived */
  const storage =
    selectedModel && selectedStorage !== null
      ? selectedModel.storages[selectedStorage]
      : null;

  /* price calculation ── base price minus defect penalties */
  const estimatedPrice = useMemo(() => {
    if (!storage || !selectedCondition) return 0;
    let price = storage.prices[selectedCondition];
    if (batteryOk === false) price -= price * defectPenalties.batteryBelow85;
    if (brokenDisplay === true) price -= price * defectPenalties.brokenDisplay;
    if (brokenCamera === true) price -= price * defectPenalties.brokenCamera;
    if (bentOrBroken === true) price -= price * defectPenalties.bentOrBroken;
    // round to nearest 500
    return Math.round(price / 500) * 500;
  }, [
    storage,
    selectedCondition,
    batteryOk,
    brokenDisplay,
    brokenCamera,
    bentOrBroken,
  ]);

  /* can advance? */
  const canProceed = (() => {
    switch (step) {
      case 0:
        return selectedModel !== null;
      case 1:
        return selectedStorage !== null;
      case 2:
        return selectedCondition !== null;
      case 3:
        return batteryOk !== null;
      case 4:
        return brokenDisplay !== null;
      case 5:
        return brokenCamera !== null;
      case 6:
        return bentOrBroken !== null;
      default:
        return false;
    }
  })();

  const handleNext = () => {
    if (!canProceed) return;
    setStep((s) => Math.min(s + 1, stepsMeta.length - 1));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    if (!name || !email || !phone) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setStep(0);
    setSelectedModel(null);
    setSelectedStorage(null);
    setSelectedCondition(null);
    setBatteryOk(null);
    setBrokenDisplay(null);
    setBrokenCamera(null);
    setBentOrBroken(null);
    setName('');
    setEmail('');
    setPhone('');
    setSubmitted(false);
  };

  /* step title */
  const stepTitle: Record<number, string> = {
    0: 'Zjisti cenu za svůj iPhone',
    1: 'Jaká je kapacita úložiště?',
    2: 'V jakém stavu je telefon?',
    3: 'Je kondice baterie nad 85 %?',
    4: 'Má telefon rozbitý displej?',
    5: 'Je kamera poškozená či nefunkční?',
    6: 'Je telefon ohnutý, prasklý či nefunkční?',
    7: 'Odhadovaná výkupní cena',
  };

  /* ─── render step content ──────────────────────────────── */
  const renderStep = () => {
    switch (step) {
      /* ── 0  Model ── */
      case 0:
        return (
          <div className="space-y-4">
            {/* Custom dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3.5 text-left text-sm font-medium text-gray-700 flex justify-between items-center hover:border-primary/50 transition"
              >
                {selectedModel
                  ? selectedModel.name
                  : 'Vyberte svůj model iPhonu'}
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    dropdownOpen ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 max-h-56 overflow-y-auto">
                  {buybackPrices.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => {
                        setSelectedModel(m);
                        setSelectedStorage(null);
                        setSelectedCondition(null);
                        setBatteryOk(null);
                        setBrokenDisplay(null);
                        setBrokenCamera(null);
                        setBentOrBroken(null);
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 transition ${
                        selectedModel?.name === m.name
                          ? 'text-primary font-semibold bg-blue-50/60'
                          : 'text-gray-700'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      /* ── 1  Storage ── */
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {selectedModel!.storages.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSelectedStorage(i)}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    selectedStorage === i
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-white/80 text-gray-600 hover:bg-blue-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="text-white/50 text-xs leading-relaxed">
              💡 Velikost úložiště zjistíš v:{' '}
              <span className="text-white/70">
                Nastavení › Obecné › Úložiště
              </span>
            </p>
          </div>
        );

      /* ── 2  Condition ── */
      case 2:
        return (
          <div className="space-y-2">
            {conditionOptions.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setSelectedCondition(c.key)}
                className={`w-full text-left rounded-xl px-4 py-3 transition-all ${
                  selectedCondition === c.key
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white/80 text-gray-700 hover:bg-blue-50'
                }`}
              >
                <span className="font-semibold text-sm">{c.label}</span>
                <span
                  className={`block text-xs mt-0.5 ${
                    selectedCondition === c.key
                      ? 'text-white/80'
                      : 'text-gray-500'
                  }`}
                >
                  {c.description}
                </span>
              </button>
            ))}
          </div>
        );

      /* ── 3  Battery ── */
      case 3:
        return (
          <div className="space-y-4">
            <YesNoButtons
              value={batteryOk}
              onChange={setBatteryOk}
              positiveIsYes
            />
            <p className="text-white/50 text-xs leading-relaxed">
              💡 Kapacitu baterie zjistíš v:{' '}
              <span className="text-white/70">
                Nastavení › Baterie › Stav baterie
              </span>
            </p>
          </div>
        );

      /* ── 4  Display ── */
      case 4:
        return (
          <YesNoButtons
            value={brokenDisplay}
            onChange={setBrokenDisplay}
            positiveIsYes={false}
          />
        );

      /* ── 5  Camera ── */
      case 5:
        return (
          <YesNoButtons
            value={brokenCamera}
            onChange={setBrokenCamera}
            positiveIsYes={false}
          />
        );

      /* ── 6  Bent / broken ── */
      case 6:
        return (
          <div className="space-y-4">
            <YesNoButtons
              value={bentOrBroken}
              onChange={setBentOrBroken}
              positiveIsYes={false}
            />
            <p className="text-white/50 text-xs leading-relaxed">
              💡 Jedná se o jakékoliv fyzické poškození, které znemožňuje běžné
              používání telefonu.
            </p>
          </div>
        );

      /* ── 7  Result ── */
      case 7:
        return submitted ? (
          /* ─ Thank-you state ─ */
          <div className="text-center space-y-4">
            <CheckCircle className="w-14 h-14 text-primary mx-auto" />
            <h3 className="text-white text-xl font-bold">Děkujeme!</h3>
            <p className="text-white/70 text-sm">
              Ozveme se vám co nejdříve s&nbsp;finální nabídkou.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-2 text-primary text-sm font-semibold hover:underline"
            >
              Nacenit další zařízení
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Summary chips */}
            <div className="flex flex-wrap gap-2">
              {[
                selectedModel?.name,
                storage?.label,
                conditionOptions.find((c) => c.key === selectedCondition)
                  ?.label,
                batteryOk === false ? 'Baterie pod 85 %' : null,
                brokenDisplay ? 'Rozbitý displej' : null,
                brokenCamera ? 'Poškozená kamera' : null,
                bentOrBroken ? 'Ohnutý / prasklý' : null,
              ]
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            {/* Price */}
            <div className="text-center">
              <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                Odhadovaná cena
              </p>
              <p className="text-accent text-4xl font-extrabold">
                {estimatedPrice.toLocaleString('cs-CZ')}&nbsp;Kč
              </p>
              <p className="text-white/40 text-[11px] mt-1">
                *&nbsp;Finální cena závisí na osobní diagnostice zařízení
              </p>
            </div>

            {/* Contact form */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Jméno a příjmení"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/90 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!name || !email || !phone}
                className="w-full bg-accent hover:bg-accent/90 disabled:opacity-40 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Odeslat poptávku
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  /* ─── ui ───────────────────────────────────────────────── */
  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-[#1e3a5f] via-[#2563eb]/80 to-[#1d4ed8] p-6 sm:p-8 shadow-2xl overflow-hidden min-h-[520px]">
      {/* Background decoration */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col h-full min-h-[460px]">
        {/* Step indicator */}
        <StepIndicator current={step} total={stepsMeta.length} />

        {/* Step title */}
        <h3 className="text-white font-bold text-lg sm:text-xl text-center mb-5">
          {stepTitle[step]}
        </h3>

        {/* Animated step content */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step + (submitted ? '-done' : '')}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation — pinned to bottom */}
        <div className="mt-auto pt-6">
          {step < 7 && (
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="flex items-center gap-1 text-white/60 hover:text-white text-sm font-medium disabled:opacity-0 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Zpět
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed}
                className="flex items-center gap-1 bg-white/20 hover:bg-white/30 disabled:opacity-30 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
              >
                Pokračovat
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 7 && !submitted && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1 text-white/60 hover:text-white text-sm font-medium transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Zpět
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
