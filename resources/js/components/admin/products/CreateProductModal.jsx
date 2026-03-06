import FormModal from '@/components/admin/FormModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function CreateProductModal({ isOpen, onClose, categories }) {
    const [createImages, setCreateImages] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        category_id: '',
        stock_quantity: '',
        status: 'active',
        images: [],
    });

    const handleCreate = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            forceFormData: true,
            onSuccess: () => {
                onClose();
                reset();
                setCreateImages([]);
            },
        });
    };

    const handleCreateImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        setCreateImages(files);
        setData('images', files);
    };

    const removeCreateImage = (index) => {
        const updated = createImages.filter((_, i) => i !== index);
        setCreateImages(updated);
        setData('images', updated);
    };

    const getImagePreview = (file) => {
        return URL.createObjectURL(file);
    };

    return (
        <FormModal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                reset();
                setCreateImages([]);
            }}
            title="Add New Product"
            onSubmit={handleCreate}
            isSubmitting={processing}
            submitLabel="Create Product"
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="create-name">Product Name *</Label>
                    <Input
                        id="create-name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="e.g., Cement, Router, etc."
                        required
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="create-price">Price *</Label>
                        <Input
                            id="create-price"
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
                        <Label htmlFor="create-stock">Stock Quantity</Label>
                        <Input
                            id="create-stock"
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
                        <Label htmlFor="create-category">Category *</Label>
                        <Select value={data.category_id} onValueChange={(val) => setData('category_id', val)}>
                            <SelectTrigger id="create-category">
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
                        <Label htmlFor="create-status">Status</Label>
                        <Select value={data.status} onValueChange={(val) => setData('status', val)}>
                            <SelectTrigger id="create-status">
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
                    <Label htmlFor="create-description">Description</Label>
                    <Textarea
                        id="create-description"
                        value={data.description ?? ''}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Product description... (optional)"
                        rows={4}
                    />
                    {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                    <Label>Product Images</Label>
                    <Input type="file" onChange={handleCreateImageChange} multiple accept="image/*" className="cursor-pointer" />
                    {errors.images && <p className="text-sm text-red-600">{errors.images}</p>}

                    {createImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {createImages.map((file, idx) => (
                                <div key={idx} className="group relative rounded-md border border-gray-200">
                                    <img src={getImagePreview(file)} alt={`Preview ${idx}`} className="h-24 w-full rounded-md object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeCreateImage(idx)}
                                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </FormModal>
    );
}
