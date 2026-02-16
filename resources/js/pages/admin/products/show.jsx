import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/components/admin/Layout';
import { Button } from '@/components/ui/button';
import { Package, ArrowLeft } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductShow({ product }) {
    return (
        <AdminLayout activeTab="products" title={`Product: ${product.name}`}>
            <Head title={`Product: ${product.name}`} />

            <div className="p-6">
                <Link href={route('admin.products.index')}>
                    <Button variant="ghost" className="mb-4 text-[var(--color-brown)] hover:text-[var(--color-deep-blue)]">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Button>
                </Link>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[var(--color-deep-blue)]">Product Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Name</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 text-lg font-semibold">{product.name}</div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Description</div>
                                <div className="text-[var(--color-brown)] mt-1">{product.description || 'No description'}</div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Price</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 text-xl font-bold">₵{Number(product.price).toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Stock Quantity</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 text-lg font-semibold">{product.stock_quantity}</div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Status</div>
                                <div className="mt-1">
                                    <StatusBadge status={product.status} />
                                </div>
                            </div>
                            {product.category && (
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Category</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1">{product.category.name}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[var(--color-deep-blue)]">Product Images</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {product.images && product.images.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {product.images.map((image) => (
                                        <img
                                            key={image.id}
                                            src={image.image_path}
                                            alt={product.name}
                                            className="rounded-lg border border-gray-200"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[var(--color-brown)] text-center">No images available</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
