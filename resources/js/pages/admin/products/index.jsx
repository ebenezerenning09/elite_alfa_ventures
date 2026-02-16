import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/components/admin/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Plus, Edit, Trash2, Eye, Search, X, Upload } from 'lucide-react';
import FormModal from '@/components/admin/FormModal';
import StatusBadge from '@/components/admin/StatusBadge';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Pagination from '@/components/pagination';
import { debounce } from 'lodash';

export default function ProductsIndex({ products, categories, filters }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const filtersRef = useRef(filters);

    const [createImages, setCreateImages] = useState([]);
    const [editImages, setEditImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    // Keep filters ref updated
    useEffect(() => {
        filtersRef.current = filters;
    }, [filters]);

    const createForm = useForm({
        name: '',
        description: '',
        price: '',
        category_id: '',
        stock_quantity: '',
        status: 'active',
        images: [],
    });

    const editForm = useForm({
        name: '',
        description: '',
        price: '',
        category_id: '',
        stock_quantity: '',
        status: 'active',
        images: [],
        delete_images: [],
    });

    const handleCreate = (e) => {
        e.preventDefault();

        // Inertia will automatically convert data (including File objects) to FormData
        createForm.post(route('admin.products.store'), {
            forceFormData: true,
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
                setCreateImages([]);
            },
        });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        editForm.setData({
            name: product.name,
            description: product.description || '',
            price: product.price,
            category_id: product.category_id || '',
            stock_quantity: product.stock_quantity,
            status: product.status,
            delete_images: [],
        });
        setEditImages([]);
        setImagesToDelete([]);
        setIsEditModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        
        // Only update the images and delete_images fields, keep all other form data intact
        editForm.setData('images', editImages);
        editForm.setData('delete_images', imagesToDelete);
        
        // Submit the form - Inertia will use the current form.data
        editForm.post(route('admin.products.update', editingProduct.id), {
            _method: 'PUT',
            forceFormData: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
                setEditingProduct(null);
                editForm.reset();
                setEditImages([]);
                setImagesToDelete([]);
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    const handleCreateImageChange = (e) => {
        const files = Array.from(e.target.files || []);

        // Keep local state for previews
        setCreateImages(files);

        // Store files directly in the Inertia form data (Inertia will build FormData)
        createForm.setData('images', files);
    };

    const handleEditImageChange = (e) => {
        const files = Array.from(e.target.files || []);

        setEditImages(files);
        editForm.setData('images', files);
    };

    const removeCreateImage = (index) => {
        setCreateImages(createImages.filter((_, i) => i !== index));
    };

    const removeEditImage = (index) => {
        setEditImages(editImages.filter((_, i) => i !== index));
    };

    const removeExistingImage = (imageId) => {
        setImagesToDelete([...imagesToDelete, imageId]);
    };

    const getImagePreview = (file) => {
        return URL.createObjectURL(file);
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query) => {
            router.get(route('admin.products.index'), {
                ...filtersRef.current,
                search: query,
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500),
        []
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleFilter = (key, value) => {
        router.get(route('admin.products.index'), {
            ...filters,
            [key]: value,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    return (
        <AdminLayout activeTab="products" title="Products Management">
            <Head title="Products Management" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-[var(--color-deep-blue)] text-2xl font-bold">Products</h2>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </div>

                {/* Filters */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10 border-gray-300"
                        />
                    </div>
                    <Select value={filters.status || 'all'} onValueChange={(value) => handleFilter('status', value)}>
                        <SelectTrigger className="border-gray-300">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={filters.category_id || 'all'} onValueChange={(value) => handleFilter('category_id', value === 'all' ? '' : value)}>
                        <SelectTrigger className="border-gray-300">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Products Table */}
                {products.data && products.data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="text-[var(--color-deep-blue)] p-3 text-left text-sm font-semibold">Name</th>
                                    <th className="text-[var(--color-deep-blue)] p-3 text-left text-sm font-semibold">Category</th>
                                    <th className="text-[var(--color-deep-blue)] p-3 text-left text-sm font-semibold">Price</th>
                                    <th className="text-[var(--color-deep-blue)] p-3 text-left text-sm font-semibold">Stock</th>
                                    <th className="text-[var(--color-deep-blue)] p-3 text-left text-sm font-semibold">Status</th>
                                    <th className="text-[var(--color-deep-blue)] p-3 text-right text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3">
                                            <div className="text-[var(--color-deep-blue)] font-medium">{product.name}</div>
                                        </td>
                                        <td className="p-3 text-[var(--color-brown)]">{product.category?.name || 'N/A'}</td>
                                        <td className="p-3 text-[var(--color-deep-blue)] font-semibold">₵{Number(product.price).toLocaleString()}</td>
                                        <td className="p-3 text-[var(--color-brown)]">{product.stock_quantity}</td>
                                        <td className="p-3">
                                            <StatusBadge status={product.status} />
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('admin.products.show', product.id)}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination links={products.links} lastPage={products.last_page} className="mt-6" />
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Package className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="text-[var(--color-deep-blue)] mt-4 text-xl font-semibold">No products found</h3>
                        <p className="text-[var(--color-brown)] mt-2">Get started by creating a new product</p>
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="mt-6 bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </div>
                )}

                {/* Create Modal */}
                <FormModal
                    isOpen={isCreateModalOpen}
                    onClose={() => {
                        setIsCreateModalOpen(false);
                        createForm.reset();
                    }}
                    title="Create Product"
                    onSubmit={handleCreate}
                    isSubmitting={createForm.processing}
                >
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-[var(--color-deep-blue)]">Name</Label>
                            <Input
                                id="name"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                className="mt-1 border-gray-300"
                            />
                            {createForm.errors.name && <p className="mt-1 text-sm text-red-600">{createForm.errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="description" className="text-[var(--color-deep-blue)]">Description</Label>
                            <Textarea
                                id="description"
                                value={createForm.data.description}
                                onChange={(e) => createForm.setData('description', e.target.value)}
                                className="mt-1 border-gray-300"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price" className="text-[var(--color-deep-blue)]">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={createForm.data.price}
                                    onChange={(e) => createForm.setData('price', e.target.value)}
                                    className="mt-1 border-gray-300"
                                />
                                {createForm.errors.price && <p className="mt-1 text-sm text-red-600">{createForm.errors.price}</p>}
                            </div>
                            <div>
                                <Label htmlFor="stock_quantity" className="text-[var(--color-deep-blue)]">Stock Quantity</Label>
                                <Input
                                    id="stock_quantity"
                                    type="number"
                                    value={createForm.data.stock_quantity}
                                    onChange={(e) => createForm.setData('stock_quantity', e.target.value)}
                                    className="mt-1 border-gray-300"
                                />
                                {createForm.errors.stock_quantity && <p className="mt-1 text-sm text-red-600">{createForm.errors.stock_quantity}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="category_id" className="text-[var(--color-deep-blue)]">Category</Label>
                                <Select value={createForm.data.category_id || 'none'} onValueChange={(value) => createForm.setData('category_id', value === 'none' ? '' : value)}>
                                    <SelectTrigger className="mt-1 border-gray-300">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="status" className="text-[var(--color-deep-blue)]">Status</Label>
                                <Select value={createForm.data.status} onValueChange={(value) => createForm.setData('status', value)}>
                                    <SelectTrigger className="mt-1 border-gray-300">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="images" className="text-[var(--color-deep-blue)]">Product Images</Label>
                            <div className="mt-2">
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleCreateImageChange}
                                    className="border-gray-300"
                                />
                                {createForm.errors.images && <p className="mt-1 text-sm text-red-600">{createForm.errors.images}</p>}
                            </div>
                            {createImages.length > 0 && (
                                <div className="mt-4 grid grid-cols-4 gap-4">
                                    {createImages.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={getImagePreview(file)}
                                                alt={`Preview ${index + 1}`}
                                                className="h-24 w-full rounded border border-gray-200 object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeCreateImage(index)}
                                                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </FormModal>

                {/* Edit Modal */}
                <FormModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setEditingProduct(null);
                        editForm.reset();
                    }}
                    title="Edit Product"
                    onSubmit={handleUpdate}
                    isSubmitting={editForm.processing}
                >
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit_name" className="text-[var(--color-deep-blue)]">Name</Label>
                            <Input
                                id="edit_name"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                className="mt-1 border-gray-300"
                            />
                            {editForm.errors.name && <p className="mt-1 text-sm text-red-600">{editForm.errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="edit_description" className="text-[var(--color-deep-blue)]">Description</Label>
                            <Textarea
                                id="edit_description"
                                value={editForm.data.description}
                                onChange={(e) => editForm.setData('description', e.target.value)}
                                className="mt-1 border-gray-300"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_price" className="text-[var(--color-deep-blue)]">Price</Label>
                                <Input
                                    id="edit_price"
                                    type="number"
                                    step="0.01"
                                    value={editForm.data.price}
                                    onChange={(e) => editForm.setData('price', e.target.value)}
                                    className="mt-1 border-gray-300"
                                />
                                {editForm.errors.price && <p className="mt-1 text-sm text-red-600">{editForm.errors.price}</p>}
                            </div>
                            <div>
                                <Label htmlFor="edit_stock_quantity" className="text-[var(--color-deep-blue)]">Stock Quantity</Label>
                                <Input
                                    id="edit_stock_quantity"
                                    type="number"
                                    value={editForm.data.stock_quantity}
                                    onChange={(e) => editForm.setData('stock_quantity', e.target.value)}
                                    className="mt-1 border-gray-300"
                                />
                                {editForm.errors.stock_quantity && <p className="mt-1 text-sm text-red-600">{editForm.errors.stock_quantity}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="edit_category_id" className="text-[var(--color-deep-blue)]">Category</Label>
                                <Select value={editForm.data.category_id || 'none'} onValueChange={(value) => editForm.setData('category_id', value === 'none' ? '' : value)}>
                                    <SelectTrigger className="mt-1 border-gray-300">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="edit_status" className="text-[var(--color-deep-blue)]">Status</Label>
                                <Select value={editForm.data.status} onValueChange={(value) => editForm.setData('status', value)}>
                                    <SelectTrigger className="mt-1 border-gray-300">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="edit_images" className="text-[var(--color-deep-blue)]">Product Images</Label>
                            
                            {/* Existing Images */}
                            {editingProduct?.images && editingProduct.images.length > 0 && (
                                <div className="mt-2">
                                    <p className="text-[var(--color-brown)] mb-2 text-sm">Existing Images:</p>
                                    <div className="grid grid-cols-4 gap-4">
                                        {editingProduct.images
                                            .filter((img) => !imagesToDelete.includes(img.id))
                                            .map((image) => (
                                                <div key={image.id} className="relative">
                                                    <img
                                                        src={image.image_path}
                                                        alt="Product"
                                                        className="h-24 w-full rounded border border-gray-200 object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeExistingImage(image.id)}
                                                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {/* New Images Upload */}
                            <div className="mt-4">
                                <Input
                                    id="edit_images"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleEditImageChange}
                                    className="border-gray-300"
                                />
                                {editForm.errors.images && <p className="mt-1 text-sm text-red-600">{editForm.errors.images}</p>}
                            </div>

                            {/* New Image Previews */}
                            {editImages.length > 0 && (
                                <div className="mt-4 grid grid-cols-4 gap-4">
                                    {editImages.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={getImagePreview(file)}
                                                alt={`Preview ${index + 1}`}
                                                className="h-24 w-full rounded border border-gray-200 object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeEditImage(index)}
                                                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </FormModal>
            </div>
        </AdminLayout>
    );
}
