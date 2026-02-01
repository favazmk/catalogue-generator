import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { X, Download } from 'lucide-react';
import { PDFCatalogue } from './PDFDocument';
import { useCatalogue } from '../context/CatalogueContext';

interface PDFPreviewProps {
    onClose: () => void;
}

export function PDFPreview({ onClose }: PDFPreviewProps) {
    const { products } = useCatalogue();

    return (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col">
            {/* Toolbar */}
            <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
                <h2 className="text-lg font-bold">Catalogue Preview</h2>

                <div className="flex items-center space-x-4">

                    <PDFDownloadLink
                        document={<PDFCatalogue products={products} />}
                        fileName="catalogue.pdf"
                        className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                        {({ loading }) => (
                            <>
                                <Download className="w-4 h-4" />
                                <span>{loading ? 'Generating...' : 'Download PDF'}</span>
                            </>
                        )}
                    </PDFDownloadLink>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Viewer */}
            <div className="flex-1 bg-gray-100 p-4 md:p-8">
                <div className="max-w-6xl mx-auto h-full shadow-2xl rounded-sm overflow-hidden bg-white">
                    <PDFViewer width="100%" height="100%" showToolbar={false} className="border-0">
                        <PDFCatalogue products={products} />
                    </PDFViewer>
                </div>
            </div>
        </div>
    );
}
