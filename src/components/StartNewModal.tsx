import React from 'react';
import { AlertCircle } from 'lucide-react';

interface StartNewModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function StartNewModal({ isOpen, onConfirm, onCancel }: StartNewModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
                        <AlertCircle className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Start New Catalogue?
                    </h3>

                    <p className="text-gray-500 mb-6">
                        Are you sure? This will remove all uploaded images and data. This action cannot be undone.
                    </p>

                    <div className="flex space-x-3 w-full">
                        <button
                            onClick={onCancel}
                            className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Yes, Start New
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
