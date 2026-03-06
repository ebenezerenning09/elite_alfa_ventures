import FormModal from '@/components/admin/FormModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EditProductModal({ isOpen, onClose, product, categories }) {
    const [editImages, setEditImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        name: '',
        description: '',
        price: '',
        category_id: '',
        stock_quantity: '',
        status: 'active',
        images: [],
        delete_images: [],
    });

    // Populate form when product changes
    useEffect(() => {
        if (product && isOpen) {
            setData({
                _method: 'PUT',
                name: product.name ?? '',
                description: product.description ?? '', // Use ?? '' to prevent controlled/uncontrolled React errors
                price: product.price ?? '',
                category_id: product.category_id ? product.category_id.toString() : '',
                stock_quantity: product.stock_quantity ?? '',
                status: product.status ?? 'active',
                images: [],
                delete_images: [],
            });
            setEditImages([]);
            setImagesToDelete([]);
        }
    }, [product, isOpen]);

    const handleUpdate = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id), {
            forceFormData: true,
            onSuccess: () => {
                onClose();
                reset();
                setEditImages([]);
                setImagesToDelete([]);
            },
        });
    };

    const handleEditImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        setEditImages(files);
        setData('images', files);
    };

    const removeEditImage = (index) => {
        const updated = editImages.filter((_, i) => i !== index);
        setEditImages(updated);
        setData('images', updated);
    };

    const removeExistingImage = (imageId) => {
        const updated = [...imagesToDelete, imageId];
        setImagesToDelete(updated);
        setData('delete_images', updated);
    };

    const getImagePreview = (file) => {
        return URL.createObjectURL(file);
    };

    // Filter out logically deleted images from the database images rendering
    const visibleExistingImages = product?.images?.filter((img) => !imagesToDelete.includes(img.id)) || [];

    return (
        <FormModal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                reset();
                setEditImages([]);
                setImagesToDelete([]);
            }}
            title="Edit Product"
            onSubmit={handleUpdate}
            isSubmitting={processing}
            submitLabel="Save Changes"
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="edit-name">Product Name *</Label>
                    <Input
                        id="edit-name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="e.g., Cement, Router, etc."
                        required
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="edit-price">Price *</Label>
                        <Input
                            id="edit-price"
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            placeholder="0.00"
                            required
                        />
                        {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-stock">Stock Quantity</Label>
                        <Input
                            id="edit-stock"
                            type="number"
                            value={data.stock_quantity ?? ''}
                            onChange={(e) => setData('stock_quantity', e.target.value)}
                            placeholder="0"
                        />
                        {errors.stock_quantity && <p className="text-sm text-red-600">{errors.stock_quantity}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="edit-category">Category *</Label>
                        <Select value={data.category_id} onValueChange={(val) => setData('category_id', val)}>
                            <SelectTrigger id="edit-category">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category_id && <p className="text-sm text-red-600">{errors.category_id}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-status">Status</Label>
                        <Select value={data.status} onValueChange={(val) => setData('status', val)}>
                            <SelectTrigger id="edit-status">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                        id="edit-description"
                        value={data.description ?? ''}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Product description... (optional)"
                        rows={4}
                    />
                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Product Images</Label>
                    <Input type="file" onChange={handleEditImageChange} multiple accept="image/*" className="cursor-pointer" />
                    <p className="mt-1 text-xs text-gray-500">
                        Note: Uploading new images will add to existing ones. Delete individual images below.
                    </p>
                    {errors.images && <p className="text-sm text-red-600">{errors.images}</p>}

                    {/* Show existing images from database */}
                    {visibleExistingImages.length > 0 && (
                        <div className="mt-4">
                            <Label className="mb-2 block text-xs text-gray-500">Current Images</Label>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {visibleExistingImages.map((img) => (
                                    <div key={img.id} className="group relative rounded-md border border-gray-200">
                                        <img src={img.image_path} alt={`Existing product image`} className="h-24 w-full rounded-md object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(img.id)}
                                            className="absolute -top-2 -right-2 rounded-full bg-red-400 p-1 text-white shadow-sm hover:bg-red-600"
                                            title="Delete permanently on save"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Show newly staged images */}
                    {editImages.length > 0 && (
                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <Label className="mb-2 block text-xs font-medium text-green-600">New Images (To Save)</Label>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                {editImages.map((file, idx) => (
                                    <div key={idx} className="group relative rounded-md border border-2 border-green-200 shadow-sm">
                                        <img src={getImagePreview(file)} alt={`Preview ${idx}`} className="h-24 w-full rounded-md object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeEditImage(idx)}
                                            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FormModal>
    );
}
