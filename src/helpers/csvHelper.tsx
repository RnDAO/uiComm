// csvHelper.ts

import Papa from 'papaparse';

interface DataObject {
  [key: string]: any;
}

/**
 * Convert given data to CSV format using Papaparse.
 * @param {any[]} data The data to convert.
 * @returns {string} The data in CSV format.
 */
function convertToCSV(data: any[]) {
  const flattenedData = data.map((item) => {
    let flattenedItem: { [key: string]: string | number } = {};

    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        // If the property is an array containing objects
        if (
          Array.isArray(item[key]) &&
          item[key].length > 0 &&
          typeof item[key][0] === 'object'
        ) {
          flattenedItem[key] = item[key]
            .map((subItem: any) =>
              Object.entries(subItem)
                .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                .join(', ')
            )
            .join(' , ');
        } else {
          flattenedItem[key] = item[key];
        }
      }
    }

    return flattenedItem;
  });

  return Papa.unparse(flattenedData);
}

/**
 * Download the given CSV data as a file.
 * @param {string} csvData The CSV data to download.
 * @param {string} filename The name for the downloaded file.
 */
function downloadCSVFile(csvData: string, filename = 'data.csv'): void {
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export { convertToCSV, downloadCSVFile };
