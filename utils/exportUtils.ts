/**
 * Utility functions for exporting data to various formats
 */

export interface ExportData {
  headers: string[];
  rows: any[][];
  fileName: string;
  title?: string;
}

/**
 * Converts data to CSV format
 */
export const convertToCSV = (data: ExportData): string => {
  const { headers, rows } = data;

  // Create header row
  const csvHeader = headers.join(',');

  // Create data rows
  const csvRows = rows.map(row =>
    row.map(field => {
      // Handle fields that might contain commas, quotes, or newlines
      const fieldStr = String(field);
      if (fieldStr.includes(',') || fieldStr.includes('"') || fieldStr.includes('\n')) {
        return `"${fieldStr.replace(/"/g, '""')}"`;
      }
      return fieldStr;
    }).join(',')
  );

  return [csvHeader, ...csvRows].join('\n');
};

/**
 * Downloads a file with the given content and filename
 */
export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Exports data as CSV file
 */
export const exportAsCSV = (data: ExportData) => {
  const csvContent = convertToCSV(data);
  downloadFile(csvContent, data.fileName, 'text/csv');
};

/**
 * Exports data as JSON file
 */
export const exportAsJSON = (data: ExportData) => {
  const jsonData = {
    title: data.title || 'Exported Data',
    exportedAt: new Date().toISOString(),
    headers: data.headers,
    rows: data.rows
  };

  const jsonContent = JSON.stringify(jsonData, null, 2);
  downloadFile(jsonContent, data.fileName.replace('.csv', '.json'), 'application/json');
};

/**
 * Generates a basic Excel-compatible format (TSV - Tab-Separated Values)
 */
export const exportAsExcel = (data: ExportData) => {
  const { headers, rows } = data;

  // Create header row with tabs
  const tsvHeader = headers.join('\t');

  // Create data rows with tabs
  const tsvRows = rows.map(row =>
    row.map(field => String(field)).join('\t')
  ).join('\n');

  const tsvContent = [tsvHeader, tsvRows].join('\n');
  downloadFile(tsvContent, data.fileName.replace('.csv', '.xls'), 'application/vnd.ms-excel');
};