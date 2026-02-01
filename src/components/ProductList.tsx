import React, { useState } from 'react';
import { Trash2, GripVertical, Edit2, Save, X, ImagePlus } from 'lucide-react';
import { useCatalogue } from '../context/CatalogueContext';

export function ProductList() {
    const { products, removeProduct, updateProduct, updateProductImage, reorderProducts } = useCatalogue();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({
        name: '',
        price: '',
        material: '',
        description: ''
    });
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    if (products.length === 0) return null;

    const handleEdit = (product: any) => {
        setEditingId(product.id);
        setEditForm({
            name: product.name,
            price: product.price,
            material: product.material,
            description: product.description
        });
    };

    const handleSave = (id: string) => {
        updateProduct(id, editForm);
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({ name: '', price: '', material: '', description: '' });
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) return;
        reorderProducts(draggedIndex, dropIndex);
        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <section id="review-list" className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Review Products</h2>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {products.length} Items
                </span>
            </div>

            <div className="space-y-4">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        draggable={editingId !== product.id}
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`group flex flex-col md:flex-row items-start md:items-center bg-gray-50 rounded-xl p-4 gap-4 border transition-all ${draggedIndex === index
                            ? 'opacity-50 border-blue-400'
                            : 'border-transparent hover:border-gray-200 hover:bg-white hover:shadow-sm'
                            }`}
                    >
                        {/* Drag Handle */}
                        <div className="hidden md:flex items-center text-gray-300 cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-5 h-5" />
                        </div>

                        {/* Thumbnail */}
                        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-white rounded-lg border border-gray-200 overflow-hidden relative group/image">
                            <img
                                src={URL.createObjectURL(product.imageFile)}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Change Image Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <label htmlFor={`image-${product.id}`} className="cursor-pointer">
                                    <ImagePlus className="w-6 h-6 text-white" />
                                </label>
                                <input
                                    id={`image-${product.id}`}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            updateProductImage(product.id, file);
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Content - Editing Mode */}
                        {editingId === product.id ? (
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        placeholder="Product Name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        value={editForm.material}
                                        onChange={(e) => setEditForm({ ...editForm, material: e.target.value })}
                                        placeholder="Material"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={editForm.price}
                                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                        placeholder="Price (Rs.)"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        placeholder="Description"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        ) : (
                            /* Content - Display Mode */
                            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 truncate">
                                        {product.name || <span className="text-gray-400 italic">Untitled</span>}
                                    </h3>
                                    <p className="text-sm text-gray-500 truncate">{product.material}</p>
                                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{product.source} source</p>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="font-medium text-gray-900">
                                        {product.price ? `Rs. ${product.price}` : <span className="text-gray-400 text-sm">No Price</span>}
                                    </p>
                                    <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {editingId === product.id ? (
                                <>
                                    <button
                                        onClick={() => handleSave(product.id)}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                        title="Save Changes"
                                    >
                                        <Save className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="Cancel"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit Product"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => removeProduct(product.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove Product"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
