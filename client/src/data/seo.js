import { accommodationProfile, profiles, site } from './site.js';

export const productionOrigin = 'https://villacinnamooncastle.com';
export const defaultShareImage = `${productionOrigin}/media/villa-facade-1920.jpg`;

export const seoPages = {
  '/': {
    title: 'Private Villa in Hikkaduwa | Villa Cinnamoon Castle',
    description:
      'Stay at a private five-bedroom villa in Hikkaduwa for families and groups of up to 15 guests, with direct WhatsApp inquiries and Hikkaduwa Beach 3.5 km away.',
    robots: 'index, follow',
  },
  '/stay-options': {
    title: 'Hikkaduwa Villa Stay Options & Rates | Villa Cinnamoon Castle',
    description:
      'Compare private villa stay options and estimated rates for couples, families, and groups near Hikkaduwa before sending a direct WhatsApp inquiry.',
    robots: 'index, follow',
  },
  '/hikkaduwa-guide': {
    title: 'Hikkaduwa Villa & Local Area Guide | Villa Cinnamoon Castle',
    description:
      'Plan a group villa stay near Hikkaduwa Beach, the coral reef, surf spots, town and Galle Fort from a private five-bedroom base in Arachchikanda.',
    robots: 'index, follow',
  },
  '/gallery': {
    title: 'Villa Gallery near Hikkaduwa | Villa Cinnamoon Castle',
    description:
      'Explore photographs of Villa Cinnamoon Castle, including its bedrooms, living spaces, garden, balconies, and surroundings near Hikkaduwa.',
    robots: 'index, follow',
  },
  '/inquiry': {
    title: 'Send a Villa Inquiry | Villa Cinnamoon Castle',
    description:
      'Choose your dates and preferred stay option, review the estimated total, and prepare a direct WhatsApp inquiry to Villa Cinnamoon Castle.',
    robots: 'index, follow',
  },
  '/privacy': {
    title: 'Privacy Notice | Villa Cinnamoon Castle',
    description:
      'Learn how Villa Cinnamoon Castle handles inquiry details, browser form memory, direct WhatsApp communication, and external services.',
    robots: 'noindex, follow',
  },
};

export const indexableRoutes = Object.entries(seoPages)
  .filter(([, page]) => page.robots.startsWith('index'))
  .map(([pathname]) => pathname);

const adminPage = {
  title: `Administration Offline | ${site.name}`,
  description: 'The Villa Cinnamoon Castle administration portal is currently offline.',
  robots: 'noindex, nofollow',
};

export const notFoundPage = {
  title: `Page Not Found | ${site.name}`,
  description: 'The requested page could not be found.',
  robots: 'noindex, follow',
};

export function normalizeSeoPath(pathname = '/') {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

export function seoForPath(pathname) {
  const normalized = normalizeSeoPath(pathname);
  const page = normalized.startsWith('/admin')
    ? adminPage
    : (seoPages[normalized] ?? notFoundPage);

  return {
    ...page,
    pathname: normalized,
    canonical: `${productionOrigin}${normalized === '/' ? '/' : normalized}`,
    image: defaultShareImage,
  };
}

export function structuredDataForPath(pathname) {
  const normalized = normalizeSeoPath(pathname);

  if (normalized === '/') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${productionOrigin}/#website`,
          url: `${productionOrigin}/`,
          name: site.name,
          description: site.description,
          inLanguage: 'en',
        },
        {
          '@type': 'LodgingBusiness',
          '@id': `${productionOrigin}/#lodging`,
          name: site.name,
          url: `${productionOrigin}/`,
          description: site.description,
          image: [defaultShareImage],
          telephone: '+94761007686',
          numberOfRooms: 5,
          occupancy: {
            '@type': 'QuantitativeValue',
            maxValue: 15,
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Arachchikanda',
            addressLocality: 'Hikkaduwa',
            addressRegion: 'Southern Province',
            addressCountry: 'LK',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 6.1416876,
            longitude: 80.1300153,
          },
          hasMap: site.googleMapsUrl,
          amenityFeature: [
            ['Wi-Fi', true],
            ['Private kitchen', true],
            ['Private garden and courtyard', true],
            ['Gated on-site parking', true],
            ['Hot-water showers', true],
          ].map(([name, value]) => ({
            '@type': 'LocationFeatureSpecification',
            name,
            value,
          })),
          sameAs: [
            ...profiles.map(({ href }) => href),
            accommodationProfile.href,
          ],
        },
      ],
    };
  }

  const breadcrumbLabels = {
    '/stay-options': 'Stay Options',
    '/hikkaduwa-guide': 'Hikkaduwa Guide',
    '/gallery': 'Gallery',
    '/inquiry': 'Send an Inquiry',
  };
  const label = breadcrumbLabels[normalized];
  if (!label) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${productionOrigin}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: label,
        item: `${productionOrigin}${normalized}`,
      },
    ],
  };
}
