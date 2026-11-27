import { site } from '../config/site';

// From the design's FAQ page. Answers in [brackets] are hidden from FAQ schema until filled in.
export const generalFaqs = [
  { q: 'Which areas do you cover?', a: `${site.town} and [areas].` },
  { q: 'How do I get a price?', a: 'Send the quote form or message us on WhatsApp.' },
  { q: 'Do I need to be home?', a: '[Access and key policy]' },
  { q: 'Do you bring products and equipment?', a: '[Yes or no, with details]' },
  { q: 'Are you insured?', a: '[Confirm cover]' },
  { q: 'How do I pay?', a: '[Payment methods and when payment is due]' },
  { q: 'Can I cancel or move a booking?', a: '[Notice period and any fee]' },
  { q: 'What if I am not happy?', a: '[Re-clean or complaints policy]' },
];

export const homeFaqs = [
  { q: 'How do I get a price?', a: 'Send the quote form or message us on WhatsApp.' },
  { q: 'Do I need to be home?', a: '[Add your access and key policy]' },
];
