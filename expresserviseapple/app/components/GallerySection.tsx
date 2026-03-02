'use client';

import AnimatedSection from './AnimatedSection';
import Image from 'next/image';

const images = [
  {
    src: 'https://www.expresservisapple.cz/fotky80272/slider/1549303428interier-expres-servis-apple-brno.jpg',
    alt: 'Interiér servisu',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://www.expresservisapple.cz/fotky80272/slider/1549030267shop1slide.jpg',
    alt: 'Naše prodejna',
    span: '',
  },
  {
    src: 'https://www.expresservisapple.cz/fotky80272/slider/1549030360trzz.jpg',
    alt: 'Tržnice produktů',
    span: '',
  },
  {
    src: 'https://www.expresservisapple.cz/fotky80272/slider/1549303435interier-expres-servis-apple-brno2.jpg',
    alt: 'Recepce servisu',
    span: 'md:col-span-2',
  },
  {
    src: 'https://www.expresservisapple.cz/fotky80272/slider/bazar.jpg',
    alt: 'Bazarové iPhony',
    span: '',
  },
];

export default function GallerySection() {
  return (
    <section id="galerie" className="py-20 md:py-28 bg-white">
      <div className="container-narrow">
        <AnimatedSection direction="left">
          <div className="max-w-2xl mb-10">
            <h2 className="heading-accent text-3xl sm:text-4xl font-extrabold text-dark mb-4">
              Náš servis
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Podívejte se, jak to u nás vypadá. Moderní vybavení
              a&nbsp;profesionální přístup k&nbsp;každé opravě.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden group ${img.span}`}
              >
                <div className="absolute inset-0 bg-gray-200">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors duration-300 flex items-end">
                  <span className="text-white text-sm font-medium p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
