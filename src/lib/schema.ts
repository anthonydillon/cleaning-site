import { site } from '../config/site';
import { isAmount } from './price';

const base = (u: URL) => u.toString().replace(/\/$/, '');
const isPlaceholder = (v: string) => !v || v.startsWith('[');

export function localBusiness(siteUrl: URL) {
  const url = base(siteUrl);
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HouseCleaning',
    '@id': `${url}/#business`,
    name: site.name,
    url: `${url}/`,
    logo: `${url}/logo.png`,
    image: `${url}/og-image.jpg`,
    telephone: site.phoneE164,
    areaServed: site.areas.filter((a) => !isPlaceholder(a)).map((name) => ({ '@type': 'City', name })),
    address: {
      '@type': 'PostalAddress',
      ...(site.address.street && { streetAddress: site.address.street }),
      addressLocality: site.address.locality,
      ...(site.address.postcode && { postalCode: site.address.postcode }),
      addressCountry: site.address.country,
    },
  };
  if (!isPlaceholder(site.email)) data.email = site.email;
  if (site.openingHoursSchema) data.openingHours = site.openingHoursSchema;
  // Ratings only from genuine reviews (fabricated review markup breaks Google's guidelines)
  if (site.rating) {
    data.aggregateRating = { '@type': 'AggregateRating', ratingValue: site.rating.value, reviewCount: site.rating.count };
  }
  return data;
}

export function serviceSchema(siteUrl: URL, s: { name: string; description: string; slug: string; price: string }) {
  const url = base(siteUrl);
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url: `${url}/${s.slug}/`,
    provider: { '@id': `${url}/#business` },
    areaServed: { '@type': 'City', name: site.town },
  };
  if (isAmount(s.price)) {
    data.offers = { '@type': 'Offer', priceCurrency: 'GBP', priceSpecification: { '@type': 'PriceSpecification', minPrice: Number(s.price), priceCurrency: 'GBP' } };
  }
  return data;
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  // Skip questions whose answers are still placeholders
  const real = faqs.filter((f) => !f.a.includes('['));
  if (!real.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: real.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function breadcrumbSchema(siteUrl: URL, items: { name: string; path: string }[]) {
  const url = base(siteUrl);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${url}${it.path}` })),
  };
}

export const compact = <T,>(xs: (T | null)[]) => xs.filter((x): x is T => x !== null);
