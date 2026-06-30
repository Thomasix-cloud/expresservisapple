import AnimatedSection from './AnimatedSection';

const metrics = [
  { value: '30–60 min', label: 'Doba opravy' },
  { value: '5 000+', label: 'Opravených zařízení' },
  { value: 'Zdarma', label: 'Diagnostika při opravě' },
  { value: '24 měs.', label: 'Záruka na opravu' },
];

export default function TrustStrip() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="container-narrow py-10 md:py-12">
        <AnimatedSection direction="none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-[1.75rem] font-bold text-dark leading-none tracking-tight mb-1">
                  {m.value}
                </p>
                <p className="text-sm text-text-secondary">{m.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
