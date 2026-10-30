import { accommodationProfile, profiles, site } from './site.js';

export const productionOrigin = 'https://villacinnamooncastle.com';
export const defaultShareImage = `${productionOrigin}/media/villa-facade-1920.jpg`;

export const seoPages = {
  '/': {
    title: 'Private Villa near Hikkaduwa | Villa Cinnamoon Castle',
    description:
      'Stay at a private five-bedroom villa for families and groups near Hikkaduwa, Sri Lanka. Explore the villa, stay options, gallery, and direct WhatsApp inquiries.',
    robots: 'index, follow',
  },
  '/stay-options': {
    title: 'Stay Options & Villa Rates | Villa Cinnamoon Castle',
    description:
      'Compare stay options and estimated villa rates for couples, families, and groups near Hikkaduwa before sending a direct WhatsApp inquiry.',
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
  if (normalizeSeoPath(pathname) !== '/') return null;

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
        sameAs: [
          ...profiles.map(({ href }) => href),
          accommodationProfile.href,
        ],
      },
    ],
  };
}
