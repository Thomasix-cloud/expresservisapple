'use client';

import { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const contactCards = [
  {
    icon: Phone,
    label: 'Telefon',
    value: '+420 123 456 789',
    href: 'tel:+420123456789',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'info@expresservisapple.cz',
    href: 'mailto:info@expresservisapple.cz',
  },
  {
    icon: MapPin,
    label: 'Adresa',
    value: 'Kosmova 4, 612 00 Brno',
    href: 'https://maps.google.com/?q=Kosmova+4,+Brno',
  },
  {
    icon: Clock,
    label: 'Otevírací doba',
    value: 'Po–Pá 8:30–18:00',
    href: null,
  },
];

export default function ContactSection() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => setSending(false), 2000);
  };

  return (
    <section id="kontakt" className="py-20 md:py-28 bg-gray-50">
      <div className="container-narrow">
        <AnimatedSection direction="left">
          <div className="max-w-2xl mb-10">
            <h2 className="heading-accent text-3xl sm:text-4xl font-extrabold text-dark mb-4">
              Kontakt
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Přijďte k nám do servisu nebo nás kontaktujte — rádi vám poradíme
              a&nbsp;pomůžeme s&nbsp;vaším zařízením.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Map — 3 cols */}
          <AnimatedSection direction="up" className="lg:col-span-3 space-y-4">
            <div className="rounded-2xl overflow-hidden h-72 md:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.5!2d16.6037!3d49.1938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47129444f0e6dbd5%3A0x8b1e6e3d3f0e8a1b!2sKosmova%204%2C%20602%2000%20Brno!5e0!3m2!1scs!2scz!4v1700000000000"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-3">
              {contactCards.map((card, i) => {
                const Icon = card.icon;
                const isLink = !!card.href;
                return isLink ? (
                  <a
                    key={i}
                    href={card.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-xl p-4 border border-gray-100 hover:border-primary/30 transition-colors group block"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block">
                          {card.label}
                        </span>
                        <span className="text-sm font-semibold text-dark">
                          {card.value}
                        </span>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 border border-gray-100 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block">
                          {card.label}
                        </span>
                        <span className="text-sm font-semibold text-dark">
                          {card.value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Form — 2 cols, dark sidebar */}
          <AnimatedSection direction="right" className="lg:col-span-2">
            <div className="bg-dark rounded-2xl p-6 md:p-8 h-full">
              <h3 className="text-lg font-bold text-white mb-1">Napište nám</h3>
              <p className="text-sm text-white/70 mb-6">
                Odpovíme do 24 hodin v pracovní dny.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Jméno a příjmení"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="E-mail"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Telefon"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Popište váš problém..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full py-3.5 justify-center disabled:opacity-50"
                >
                  {sending ? (
                    'Odesílám...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Odeslat zprávu
                    </>
                  )}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
