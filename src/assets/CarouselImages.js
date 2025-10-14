// CarouselImages.js
// Centralized image URL data for carousels and hero banners in the Janasiksha Prochar Kendra website.
// Using local banner images for hero carousel.

// Import banner images
import Banner1 from './images/Banner1.jpg';
import Banner2 from './images/Banner2.jpg';
import Banner3 from './images/Banner3.jpg';
import Banner4 from './images/Banner4.jpg';

/**
 * Array of hero banner image URLs - using local banner images
 * @type {string[]}
 */
const ngoImages = [
  Banner1,
  Banner2,
  Banner3,
  Banner4,
];

/**
 * Array of gallery image URLs
 * @type {string[]}
 */
const galleryImages = [
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
];

/**
 * Array of About Us page image URLs
 * @type {string[]}
 */
const aboutImages = [
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
];

/**
 * Array of What We Do page image URLs
 * @type {string[]}
 */
const whatWeDoImages = [
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80',
];

export { ngoImages, galleryImages, aboutImages, whatWeDoImages };
