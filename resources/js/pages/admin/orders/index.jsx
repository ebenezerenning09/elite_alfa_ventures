import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/components/admin/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Eye, Search } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import FormModal from '@/components/admin/FormModal';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import Pagination from '@/components/pagination';
import { debounce } from 'lodash';

export default function OrdersIndex({ orders, filters }) {
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const filtersRef = useRef(filters);

    // Keep filters ref updated
    useEffect(() => {
        filtersRef.current = filters;
    }, [filters]);

    const statusForm = useForm({
        status: '',
    });

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query) => {
            router.get(route('admin.orders.index'), {
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

    const handleStatusUpdate = (order) => {
        setSelectedOrder(order);
        statusForm.setData('status', order.status);
        setIsStatusModalOpen(true);
    };

    const handleSubmitStatus = (e) => {
        e.preventDefault();
        router.post(route('admin.orders.update-status', selectedOrder.id), statusForm.data, {
            onSuccess: () => {
                setIsStatusModalOpen(false);
                setSelectedOrder(null);
            },
        });
    };

    const handleFilter = (key, value) => {
        router.get(route('admin.orders.index'), {
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
        <AdminLayout activeTab="orders" title="Orders Management">
            <Head title="Orders Management" />

            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-[var(--color-deep-blue)] text-2xl font-bold">Orders</h2>
                </div>

                {/* Filters */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search orders..."
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
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        type="date"
                        placeholder="Start Date"
                        value={filters.start_date || ''}
                        onChange={(e) => handleFilter('start_date', e.target.value)}
                        className="border-gray-300"
                    />
                    <Input
                        type="date"
                        placeholder="End Date"
                        value={filters.end_date || ''}
                        onChange={(e) => handleFilter('end_date', e.target.value)}
                        className="border-gray-300"
                    />
                </div>

                {/* Orders Table */}
                {orders.data && orders.data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="text-[var(--color-deep-blue)] p-3 text-left text-sm font-semibold">Order #</th>
                                    <th className="text-[var(--color-deep-blue)] p-3 text-left text-sm font-semibold">Customer</th>
                                    <th className="text-[var(--color-deep-blue)] p-3 text-left text-sm font-semibold">Amount</th>
                                    <th className="text-[var(--color-deep-blue)] p-3 text-left text-sm font-semibold">Status</th>
                                    <th className="text-[var(--color-deep-blue)] p-3 text-left text-sm font-semibold">Date</th>
                                    <th className="text-[var(--color-deep-blue)] p-3 text-right text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3">
                                            <div className="text-[var(--color-deep-blue)] font-medium">#{order.order_number}</div>
                                        </td>
                                        <td className="p-3 text-[var(--color-brown)]">{order.user?.name || order.user?.email || 'N/A'}</td>
                                        <td className="p-3 text-[var(--color-deep-blue)] font-semibold">₵{Number(order.total_amount).toLocaleString()}</td>
                                        <td className="p-3">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="p-3 text-[var(--color-brown)] text-sm">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('admin.orders.show', order.id)}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleStatusUpdate(order)}
                                                    className="border-[var(--color-mustard-gold)] text-[var(--color-mustard-gold)] hover:bg-[var(--color-mustard-gold)]/10"
                                                >
                                                    Update Status
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination links={orders.links} lastPage={orders.last_page} className="mt-6" />
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="text-[var(--color-deep-blue)] mt-4 text-xl font-semibold">No orders found</h3>
                    </div>
                )}

                {/* Status Update Modal */}
                <FormModal
                    isOpen={isStatusModalOpen}
                    onClose={() => {
                        setIsStatusModalOpen(false);
                        setSelectedOrder(null);
                    }}
                    title="Update Order Status"
                    onSubmit={handleSubmitStatus}
                    isSubmitting={statusForm.processing}
                >
                    <div>
                        <Label htmlFor="status" className="text-[var(--color-deep-blue)]">Status</Label>
                        <Select value={statusForm.data.status} onValueChange={(value) => statusForm.setData('status', value)}>
                            <SelectTrigger className="mt-1 border-gray-300">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </FormModal>
            </div>
        </AdminLayout>
    );
}
