// Rural Images Index
// This file exports all rural images for easy importing

// Function to dynamically load images with proper URL handling
const loadRuralImages = () => {
  const images = [];
  
  // List of rural image filenames (24 images)
  const imageFiles = [
    'Rural (1).jpg', 'Rural (2).jpg', 'Rural (3).jpg', 'Rural (4).jpg',
    'Rural (5).jpg', 'Rural (6).jpg', 'Rural (7).jpg', 'Rural (8).jpg',
    'Rural (9).jpg', 'Rural (10).jpg', 'Rural (11).jpg', 'Rural (12).jpg',
    'Rural (13).jpg', 'Rural (14).jpg', 'Rural (15).jpg', 'Rural (16).jpg',
    'Rural (17).jpg', 'Rural (18).jpg', 'Rural (19).jpg', 'Rural (20).jpg',
    'Rural (21).jpg', 'Rural (22).jpg', 'Rural (23).jpg', 'Rural (24).jpg'
  ];

  // Generate URLs for each image
  imageFiles.forEach(filename => {
    try {
      const imageUrl = new URL(`./${filename}`, import.meta.url).href;
      images.push(imageUrl);
    } catch (error) {
      console.warn(`Failed to load rural image: ${filename}`, error);
    }
  });

  return images;
};

export const ruralImages = loadRuralImages();

export default ruralImages;