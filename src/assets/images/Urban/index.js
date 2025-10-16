// Urban Images Index
// This file exports all urban images for easy importing

// Function to dynamically load urban images
const loadUrbanImages = () => {
  const images = [];
  
  // List of urban image filenames (24 images)
  const imageFiles = [
    'Urban (1).jpg', 'Urban (2).jpg', 'Urban (3).jpg', 'Urban (4).jpg',
    'Urban (5).jpg', 'Urban (6).jpg', 'Urban (7).jpg', 'Urban (8).jpg',
    'Urban (9).jpg', 'Urban (10).jpg', 'Urban (11).jpg', 'Urban (12).jpg',
    'Urban (13).jpg', 'Urban (14).jpg', 'Urban (15).jpg', 'Urban (16).jpg',
    'Urban (17).jpg', 'Urban (18).jpg', 'Urban (19).jpg', 'Urban (20).jpg',
    'Urban (21).jpg', 'Urban (22).jpg', 'Urban (23).jpg', 'Urban (24).jpg'
  ];

  // Generate URLs for each image
  imageFiles.forEach(filename => {
    try {
      const imageUrl = new URL(`./${filename}`, import.meta.url).href;
      images.push(imageUrl);
    } catch (error) {
      console.warn(`Failed to load urban image: ${filename}`, error);
    }
  });

  return images;
};

export const urbanImages = loadUrbanImages();

export default urbanImages;