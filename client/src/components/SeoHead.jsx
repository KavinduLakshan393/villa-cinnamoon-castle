import { useLayoutEffect } from 'react';
import { seoForPath, structuredDataForPath } from '../data/seo.js';

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function updateStructuredData(data) {
  const existing = document.head.querySelector('script[data-seo-structured]');
  if (!data) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement('script');
  element.setAttribute('type', 'application/ld+json');
  element.setAttribute('data-seo-structured', '');
  element.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(element);
}

export default function SeoHead({ pathname }) {
  useLayoutEffect(() => {
    const seo = seoForPath(pathname);
    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'robots', seo.robots);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', seo.canonical);
    upsertMeta('property', 'og:image', seo.image);
    upsertMeta('property', 'og:image:alt', 'Villa Cinnamoon Castle near Hikkaduwa');
    upsertMeta('property', 'og:image:width', '1920');
    upsertMeta('property', 'og:image:height', '1080');
    upsertMeta('property', 'og:site_name', 'Villa Cinnamoon Castle');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', seo.image);
    upsertMeta('name', 'twitter:image:alt', 'Villa Cinnamoon Castle near Hikkaduwa');
    upsertCanonical(seo.canonical);
    updateStructuredData(structuredDataForPath(pathname));
  }, [pathname]);

  return null;
}
