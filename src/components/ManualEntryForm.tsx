import React, { useState, useRef } from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';
import clsx from 'clsx';

interface ProductData {
    imageFile: File | null;
    name: string;
    price: string;
    material: string;
    description: string;
}

interface ManualEntryFormProps {
    onAddProduct: (product: ProductData) => void;
}

export function ManualEntryForm({ onAddProduct }: ManualEntryFormProps) {
    const [formData, setFormData] = useState<ProductData>({
        imageFile: null,
        name: '',
        price: '',
        material: '',
        description: ''
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, imageFile: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return; // Basic validation
        onAddProduct(formData);

        // Reset form
        setFormData({
            imageFile: null,
            name: '',
            price: '',
            material: '',
            description: ''
        });
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <section id="manual-entry" className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3">
                    <Plus className="w-5 h-5" />
                </span>
                Add Product Manually
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left: Image Upload */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={clsx(
                        "aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative",
                        previewUrl ? "border-gray-200" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                    )}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-2">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <span className="text-sm text-gray-500 font-medium">Click to upload</span>
                        </>
                    )}
                </div>

                {/* Right: Fields */}
                <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                                placeholder="e.g. Modern Chair"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rs.)</label>
                            <input
                                type="text"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                                placeholder="2500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Material / Subtext</label>
                        <input
                            type="text"
                            value={formData.material}
                            onChange={e => setFormData({ ...formData, material: e.target.value })}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black"
                            placeholder="e.g. Teak Wood Base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={3}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black resize-none"
                            placeholder="Product details..."
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            Add Product
                        </button>
                    </div>
                </div>

            </form>
        </section>
    );
}
