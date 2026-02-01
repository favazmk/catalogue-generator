import React from 'react';
import { FileDown, Layers } from 'lucide-react';

interface FooterProps {
    productCount: number;
    onProcess: () => void;
}

export function Footer({ productCount, onProcess }: FooterProps) {
    if (productCount === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                <div className="flex items-center space-x-3 text-gray-600">
                    <div className="bg-gray-100 p-2 rounded-full">
                        <Layers className="w-5 h-5 text-gray-800" />
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-wider font-semibold text-gray-500">Total Products</span>
                        <span className="text-lg font-bold text-gray-900">{productCount} items ready</span>
                    </div>
                </div>

                <button
                    onClick={onProcess}
                    className="flex items-center space-x-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-medium shadow-md transition-transform active:scale-95"
                >
                    <span>Process & Preview Products</span>
                    <FileDown className="w-5 h-5" />
                </button>

            </div>
        </div>
    );
}
