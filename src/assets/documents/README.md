# Documents Folder

This folder contains all documents, PDFs, and reports for the Janasiksha Prochar Kendra website.

## Current Documents

### Historical Documents:
- **JANASIKSHA PROCHAR KENDRA _Brief History_ CURRENTLY FINAl - 2012.pdf** - Organization history document

### Annual Reports:
- **Annual Report for the year 22-23_compressed.pdf** - Annual report for 2022-2023
- **ANNUAL REPORT FOR THE YEAR 2023 - 2024 _compressed.pdf** - Annual report for 2023-2024

## Configuration
- All documents are mapped in `documentsPaths.js` configuration file
- Each document includes: title, filename, path, category, year, and description
- Use the configuration file to reference documents in React components

## Organization
- All PDF documents are stored directly in this folder (no subfolders)
- Use descriptive filenames
- Supported formats: .pdf, .doc, .docx
- Documents are categorized through the configuration file

## Usage
Import and use documents through the documentsPaths.js file:
```javascript
import documents, { getAnnualReports, getHistoricalDocuments } from '../assets/documents/documentsPaths';
```

## Helper Functions Available:
- `getDocumentsByCategory(category)` - Get documents by category
- `getAnnualReports()` - Get all annual reports
- `getHistoricalDocuments()` - Get all historical documents  
- `getDocumentById(id)` - Get specific document by ID
- `getCategories()` - Get all available categories
- `allDocuments` - Array of all documents