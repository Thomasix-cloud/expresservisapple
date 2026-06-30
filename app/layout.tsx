import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.expresservisapple.cz'),
  title: 'Expres Servis Apple Brno | Opravy iPhone, iPad, MacBook na počkání',
  description:
    'Expresní servis a opravy Apple zařízení v Brně. Opravy iPhone, iPad a MacBook do hodiny. Originální díly, 24 měsíců záruka, diagnostika zdarma při opravě. Kosmova 4, Brno.',
  keywords: [
    'servis apple brno',
    'oprava iphone brno',
    'oprava ipad brno',
    'servis macbook brno',
    'výměna displeje iphone',
    'výměna baterie iphone',
    'apple servis brno',
    'expresní oprava iphone',
  ],
  authors: [{ name: 'Expres Servis Apple Brno' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.expresservisapple.cz' },
  openGraph: {
    title: 'Expres Servis Apple Brno | Opravy iPhone, iPad, MacBook na počkání',
    description:
      'Expresní servis Apple zařízení v Brně. Originální díly, 24 měsíců záruka, diagnostika zdarma při opravě.',
    url: 'https://www.expresservisapple.cz',
    siteName: 'Expres Servis Apple Brno',
    locale: 'cs_CZ',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Expres Servis Apple Brno',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expres Servis Apple Brno',
    description: 'Expresní opravy iPhone, iPad, MacBook v Brně. Na počkání.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Expres Servis Apple Brno',
              description:
                'Expresní servis a opravy Apple zařízení v Brně. iPhone, iPad, MacBook.',
              url: 'https://www.expresservisapple.cz',
              telephone: '+420777041184',
              email: 'info@expresservisapple.cz',
              taxID: 'CZ07042515',
              vatID: 'CZ07042515',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Kosmova 4',
                addressLocality: 'Brno',
                postalCode: '612 00',
                addressCountry: 'CZ',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 49.1938,
                longitude: 16.6037,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
                  opens: '08:30',
                  closes: '18:00',
                },
              ],
              priceRange: '$$',
              image: 'https://www.expresservisapple.cz/og-image.jpg',
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
