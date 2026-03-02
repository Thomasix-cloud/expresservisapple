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
  title: 'Expres Servis Apple Brno | Expresní opravy iPhone, iPad, Mac',
  description:
    'Expresní servis a opravy Apple zařízení v Brně. Opravy iPhone, iPad a MacBook na počkání. Originální díly, 24 měsíců záruka, bezkonkurenční ceny. Kosmova 4, Brno.',
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
  openGraph: {
    title: 'Expres Servis Apple Brno | Expresní opravy iPhone, iPad, Mac',
    description:
      'Expresní servis a opravy Apple zařízení v Brně na počkání. Originální díly, 24 měsíců záruka.',
    url: 'https://www.expresservisapple.cz',
    siteName: 'Expres Servis Apple Brno',
    locale: 'cs_CZ',
    type: 'website',
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
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Kosmova 4',
                addressLocality: 'Brno',
                postalCode: '612 00',
                addressCountry: 'CZ',
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
