import mopping from '../assets/img/mopping.jpg';
import kitchen from '../assets/img/kitchen.jpg';
import office from '../assets/img/office.jpg';
import scrubbing from '../assets/img/scrubbing.jpg';
import bathroom from '../assets/img/bathroom.jpg';
import livingRoom from '../assets/img/living-room.jpg';

// Photos from the Claude Design file, with alt text and crop focus taken from the design.
export const images = {
  mopping: { src: mopping, alt: 'Woman mopping the floor of a bright white room', pos: '30% 40%' },
  kitchen: { src: kitchen, alt: 'White kitchen with tiled splashback, hob and sink', pos: '50% 65%' },
  office: { src: office, alt: 'Cleaner in yellow gloves vacuuming an office carpet beside glass walls', pos: '65% 20%' },
  scrubbing: { src: scrubbing, alt: 'Gloved hand scrubbing a soapy floor next to a blue mop', pos: '70% 50%' },
  bathroom: { src: bathroom, alt: 'White tiled bathroom with toilet, basin and bath', pos: '50% 65%' },
  livingRoom: { src: livingRoom, alt: 'Bright living room with sofa, rug, chair and arched window', pos: '50% 68%' },
} as const;

export type ImageKey = keyof typeof images;
