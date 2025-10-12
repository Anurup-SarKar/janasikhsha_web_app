// projectImages.js
// Image URLs for Latest Projects page
// Images are now located in the assets/images folder

/**
 * Project images object
 * Map project IDs to their corresponding image URLs
 * You can add multiple images per project as an array
 */
// Import all images
import jjActHome from './jj-act-home.jpg';
import cottageHome from './cottage-home.jpg';
import shaktiSadan from './shakti-sadan.jpg';
import seniorCitizensHome from './senior-citizens-home.jpg';
import openShelterGirls from './open-shelter-girls.jpg';
import icdsRedLight from './icds-red-light.jpg';
import healthServices from './health-services.jpg';
import vocationalTraining from './vocational-training.jpg';
import library from './library.jpg';

const projectImages = {
  1: jjActHome, // Home Under J.J.Act: (CNCP Home for girls)
  2: cottageHome, // Cottage Home
  3: shaktiSadan, // Shakti Sadan (Unit-I & II)
  4: seniorCitizensHome, // Senior Citizens' Home
  5: openShelterGirls, // Open Shelter for Girls
  6: icdsRedLight, // ICDS (Integrated Child Development Scheme)
  7: healthServices, // Health Services
  8: vocationalTraining, // Vocational Training cum Production Centre
  9: library, // Library
};

/**
 * Placeholder image for projects without specific images
 */
export const placeholderImage = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=500&q=80';

export default projectImages;