// documentsPaths.js
// Document URLs and paths for the Janasiksha Prochar Kendra website
// All documents are located in the assets/documents folder

// PDF file paths - now served from public/documents folder
const BriefHistory2012 = '/documents/JANASIKSHA PROCHAR KENDRA _Brief History_ CURRENTLY FINAl - 2012.pdf';
const AnnualReport2022_23 = '/documents/Annual Report for the year 22-23_compressed.pdf';
const AnnualReport2023_24 = '/documents/ANNUAL REPORT FOR THE YEAR 2023 - 2024 _compressed.pdf';
const MemorandumDocument = '/documents/Memorandum.pdf';

/**
 * Documents object mapping document IDs to their information
 * Each document includes title, filename, category, and description
 */
const documents = {
  // Historical Documents
  briefHistory2012: {
    id: 'briefHistory2012',
    title: 'Brief History of Janasiksha Prochar Kendra',
    filename: 'JANASIKSHA PROCHAR KENDRA _Brief History_ CURRENTLY FINAl - 2012.pdf',
    path: BriefHistory2012,
    category: 'History',
    year: '2012',
    description: 'Comprehensive history and background of Janasiksha Prochar Kendra organization',
    size: 'PDF Document'
  },

  // Annual Reports  
  annualReport2022_23: {
    id: 'annualReport2022_23',
    title: 'Annual Report 2022-2023',
    filename: 'Annual Report for the year 22-23_compressed.pdf',
    path: AnnualReport2022_23,
    category: 'Annual Report',
    year: '2022-2023',
    description: 'Annual report covering activities, achievements, and financial overview for 2022-2023',
    size: 'PDF Document'
  },

  annualReport2023_24: {
    id: 'annualReport2023_24',
    title: 'Annual Report 2023-2024',
    filename: 'ANNUAL REPORT FOR THE YEAR 2023 - 2024 _compressed.pdf',
    path: AnnualReport2023_24,
    category: 'Annual Report',
    year: '2023-2024',
    description: 'Annual report covering activities, achievements, and financial overview for 2023-2024',
    size: 'PDF Document'
  },

  // Memorandum of Association
  memorandumDocument: {
    id: 'memorandumDocument',
    title: 'Memorandum of Association',
    filename: 'Memorandum.pdf',
    path: MemorandumDocument,
    category: 'Legal',
    year: 'Current',
    description: 'Memorandum of Association document of Janasiksha Prochar Kendra',
    size: 'PDF Document'
  }
};

/**
 * Get documents by category
 * @param {string} category - Category to filter by ('History', 'Annual Report', etc.)
 * @returns {Array} Array of documents in the specified category
 */
export const getDocumentsByCategory = (category) => {
  return Object.values(documents).filter(doc => doc.category === category);
};

/**
 * Get all annual reports
 * @returns {Array} Array of all annual report documents
 */
export const getAnnualReports = () => {
  return getDocumentsByCategory('Annual Report');
};

/**
 * Get all historical documents
 * @returns {Array} Array of all historical documents
 */
export const getHistoricalDocuments = () => {
  return getDocumentsByCategory('History');
};

/**
 * Get document by ID
 * @param {string} id - Document ID
 * @returns {Object|null} Document object or null if not found
 */
export const getDocumentById = (id) => {
  return documents[id] || null;
};

/**
 * Get all document categories
 * @returns {Array} Array of unique categories
 */
export const getCategories = () => {
  const categories = Object.values(documents).map(doc => doc.category);
  return [...new Set(categories)];
};

/**
 * All documents array for easy iteration
 */
export const allDocuments = Object.values(documents);

export default documents;