import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { parseDataFile } from '../utils/dataParser';
import type { ParsedProductRow } from '../utils/dataParser';

export interface Product {
    id: string;
    imageFile: File;
    name: string;
    price: string;
    material: string;
    description: string;
    source: 'auto' | 'manual';
}

interface CatalogueContextType {
    products: Product[];
    rawImages: File[];
    dataFileName: string | null;
    addProduct: (product: Product) => void;
    addImages: (files: File[]) => void;
    setDataFile: (file: File) => Promise<void>;
    removeProduct: (id: string) => void;
    updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'imageFile'>>) => void;
    updateProductImage: (id: string, imageFile: File) => void;
    clearAll: () => void;
    reorderProducts: (startIndex: number, endIndex: number) => void;
}

const CatalogueContext = createContext<CatalogueContextType | undefined>(undefined);

export function CatalogueProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [rawImages, setRawImages] = useState<File[]>([]);
    const [dataFileName, setDataFileName] = useState<string | null>(null);
    const [parsedData, setParsedData] = useState<ParsedProductRow[]>([]);

    // Auto-matching logic trigger
    // Whenever rawImages or parsedData changes, we could potentially match them
    // But to avoid complex effects, we'll do matching when data is added or images are added.

    const processMatching = (images: File[], data: ParsedProductRow[], currentProducts: Product[]) => {
        if (data.length === 0) return; // No data to match against

        const newProducts: Product[] = [];
        const usedImageNames = new Set(currentProducts.map(p => p.imageFile.name));

        images.forEach(img => {
            if (usedImageNames.has(img.name)) return; // Already processed

            // Find matching row
            // exact match
            const match = data.find(row => row.imageName === img.name);
            // fuzzy match could go here (e.g. without extension)

            if (match) {
                newProducts.push({
                    id: Math.random().toString(36).substr(2, 9),
                    imageFile: img,
                    name: match.modelName,
                    price: String(match.offerPrice),
                    material: match.material,
                    description: match.configuration,
                    source: 'auto'
                });
            }
        });

        if (newProducts.length > 0) {
            setProducts(prev => [...prev, ...newProducts]);
        }
    };

    const addImages = (files: File[]) => {
        const newImages = [...rawImages, ...files];
        setRawImages(newImages);
        // Try to match these new images
        processMatching(files, parsedData, products);

        // Also add unmatched images as products with empty data? 
        // Requirement says "Automatically link rows...". It implies only linked ones?
        // Or maybe show them as "Unmatched"?
        // "Upload Images" usually implies all images should be available.
        // But typically for a catalogue, you want valid products.
        // For now, let's only add matched ones if data is present. 
        // If NO data file is present, maybe we just add them as manual drafts?
        // Requirement says "Upload Data (Optional)". 

        if (parsedData.length === 0) {
            // If no data, convert all images to products with empty fields (or filename as name)
            const newProducts = files.map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                imageFile: file,
                name: file.name.split('.')[0], // Default name from filename
                price: '',
                material: '',
                description: '',
                source: 'manual' as const // Treated as manual since no data match
            }));
            setProducts(prev => [...prev, ...newProducts]);
        }
    };

    const setDataFileState = async (file: File) => {
        try {
            const data = await parseDataFile(file);
            setParsedData(data);
            setDataFileName(file.name);

            // Clear all existing products that were created from rawImages
            // This prevents duplicates when matching images with new data
            const imageFileNames = new Set(rawImages.map(img => img.name));
            setProducts(prev => prev.filter(p => !imageFileNames.has(p.imageFile.name)));

            // Now match all raw images with the new data
            processMatching(rawImages, data, []);
        } catch (error) {
            console.error("Failed to parse data file", error);
            alert("Failed to parse data file. Please check format.");
        }
    };

    const addProduct = (product: Product) => {
        setProducts(prev => [...prev, product]);
    };

    const removeProduct = (id: string) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const updateProduct = (id: string, updates: Partial<Omit<Product, 'id' | 'imageFile'>>) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const updateProductImage = (id: string, imageFile: File) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, imageFile } : p));
    };

    const clearAll = () => {
        setProducts([]);
        setRawImages([]);
        setParsedData([]);
        setDataFileName(null);
    };

    const reorderProducts = (startIndex: number, endIndex: number) => {
        const result = Array.from(products);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setProducts(result);
    };

    return (
        <CatalogueContext.Provider value={{
            products,
            rawImages,
            dataFileName,
            addProduct,
            addImages,
            setDataFile: setDataFileState,
            removeProduct,
            updateProduct,
            updateProductImage,
            clearAll,
            reorderProducts
        }}>
            {children}
        </CatalogueContext.Provider>
    );
}

export function useCatalogue() {
    const context = useContext(CatalogueContext);
    if (context === undefined) {
        throw new Error('useCatalogue must be used within a CatalogueProvider');
    }
    return context;
}
