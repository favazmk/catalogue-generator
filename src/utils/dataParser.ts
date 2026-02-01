import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export interface ParsedProductRow {
    imageName: string;
    modelName: string; // Product Title
    material: string;  // Subtext
    configuration: string; // Description
    offerPrice: string | number; // Price
}

export const REQUIRED_HEADERS = [
    'Image Name',
    'Model Name',
    'Material',
    'Configuration',
    'Offer Price'
];

export async function parseDataFile(file: File): Promise<ParsedProductRow[]> {
    return new Promise((resolve, reject) => {
        const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

        if (isExcel) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

                    const mappedData = mapData(json);
                    resolve(mappedData);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        } else {
            // CSV
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const mappedData = mapData(results.data);
                    resolve(mappedData);
                },
                error: (error: any) => reject(error)
            });
        }
    });
}

function mapData(data: any[]): ParsedProductRow[] {
    return data.map((row: any) => ({
        imageName: findValue(row, ['Image Name', 'image name', 'Image', 'Filename']) || '',
        modelName: findValue(row, ['Model Name', 'model name', 'Product Name', 'Title']) || '',
        material: findValue(row, ['Material', 'material', 'Subtext', 'Subtitle']) || '',
        configuration: findValue(row, ['Configuration', 'configuration', 'Description', 'Desc']) || '',
        offerPrice: findValue(row, ['Offer Price', 'offer price', 'Price', 'MRP']) || '',
    })).filter(item => item.imageName); // Filter out rows without image match key
}

function findValue(row: any, keys: string[]): string {
    for (const key of keys) {
        if (row[key] !== undefined && row[key] !== null) {
            return String(row[key]).trim();
        }
    }
    // Search case-insensitive if exact match fails
    const rowKeys = Object.keys(row);
    for (const targetKey of keys) {
        const foundKey = rowKeys.find(k => k.toLowerCase() === targetKey.toLowerCase());
        if (foundKey && row[foundKey] !== undefined) {
            return String(row[foundKey]).trim();
        }
    }
    return '';
}
