import AdminLayout from '@/components/admin/Layout';
import CreateProductModal from '@/components/admin/products/CreateProductModal';
import EditProductModal from '@/components/admin/products/EditProductModal';
import StatusBadge from '@/components/admin/StatusBadge';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { Edit, Eye, Package, Plus, Search, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

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

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query) => {
            router.get(
                route('admin.products.index'),
                {
                    ...filtersRef.current,
                    search: query,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }, 500),
        [],
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleFilter = (key, value) => {
        router.get(
            route('admin.products.index'),
            {
                ...filters,
                [key]: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
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
                    <h2 className="text-2xl font-bold text-[var(--color-deep-blue)]">Products</h2>
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
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="border-gray-300 pl-10"
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
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">#</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Name</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Category</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Price</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Stock</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Status</th>
                                    <th className="p-3 text-right text-sm font-semibold text-[var(--color-deep-blue)]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.map((product, index) => (
                                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 text-sm text-[var(--color-brown)]">{products.from ? products.from + index : index + 1}</td>
                                        <td className="p-3">
                                            <div className="font-medium text-[var(--color-deep-blue)]">{product.name}</div>
                                        </td>
                                        <td className="p-3 text-[var(--color-brown)]">{product.category?.name || 'N/A'}</td>
                                        <td className="p-3 font-semibold text-[var(--color-deep-blue)]">₵{Number(product.price).toLocaleString()}</td>
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
                                                    size="icon"
                                                    onClick={() => handleEditClick(product)}
                                                    className="text-blue-600 hover:bg-blue-50"
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
                    <div className="py-12 text-center">
                        <Package className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-xl font-semibold text-[var(--color-deep-blue)]">No products found</h3>
                        <p className="mt-2 text-[var(--color-brown)]">Get started by creating a new product</p>
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="mt-6 bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Product
                        </Button>
                    </div>
                )}

                <CreateProductModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} categories={categories} />

                <EditProductModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setEditingProduct(null);
                    }}
                    product={editingProduct}
                    categories={categories}
                />
            </div>
        </AdminLayout>
    );
}
