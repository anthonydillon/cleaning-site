// Single source of truth for business details.
// Values in [brackets] are placeholders from the design: replace them before launch.

export const site = {
  name: 'Cleaning Company', // TODO: confirm real business name (temporary per design)
  brandParent: 'Torah Designer',
  town: 'Luton', // TODO: confirm (temporary per design)
  phoneDisplay: '00000 000000', // TODO: dummy for prototype
  phoneE164: '+440000000000', // TODO: used in tel: links
  whatsappDisplay: '00000 000000', // TODO: dummy for prototype
  whatsappE164: '440000000000', // TODO: digits only, no +
  whatsappMessage: "Hi, I'd like a quote for a clean.",
  email: '[Email]', // TODO: client to supply
  hours: '[Opening hours]', // TODO
  openingHoursSchema: '', // TODO e.g. 'Mo-Sa 08:00-18:00'
  responseTime: '[response time]', // TODO e.g. 'two hours'
  address: {
    street: '', // TODO, or leave empty for a service-area business
    locality: 'Luton',
    postcode: '',
    country: 'GB',
  },
  areas: ['Luton', '[Area 2]', '[Area 3]', '[Area 4]'], // TODO
  rating: null as null | { value: number; count: number }, // TODO: set once real reviews exist
  googleReviewsUrl: '', // TODO
  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY', // TODO: https://web3forms.com
};

export const telHref = `tel:${site.phoneE164}`;
export const whatsappHref = (msg = site.whatsappMessage) =>
  `https://wa.me/${site.whatsappE164}?text=${encodeURIComponent(msg)}`;
