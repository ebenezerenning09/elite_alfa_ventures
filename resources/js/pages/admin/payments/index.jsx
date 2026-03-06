import AdminLayout from '@/components/admin/Layout';
import StatusBadge from '@/components/admin/StatusBadge';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { CreditCard, Eye, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function PaymentsIndex({ payments, filters, summary }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const filtersRef = useRef(filters);

    // Keep filters ref updated
    useEffect(() => {
        filtersRef.current = filters;
    }, [filters]);

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query) => {
            router.get(
                route('admin.payments.index'),
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
            route('admin.payments.index'),
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
        <AdminLayout activeTab="payments" title="Payments Management">
            <Head title="Payments Management" />

            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[var(--color-deep-blue)]">Payments</h2>
                </div>

                {/* Summary Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm font-medium text-[var(--color-brown)]">Total Revenue</div>
                        <div className="mt-1 text-2xl font-bold text-[var(--color-deep-blue)]">
                            ₵{Number(summary.total_revenue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm font-medium text-[var(--color-brown)]">Successful Payments</div>
                        <div className="mt-1 text-2xl font-bold text-[var(--color-deep-blue)]">{summary.successful_payments}</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-4">
                        <div className="text-sm font-medium text-[var(--color-brown)]">Failed Payments</div>
                        <div className="mt-1 text-2xl font-bold text-[var(--color-deep-blue)]">{summary.failed_payments}</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-5">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search payments..."
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
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        value={filters.payment_method || 'all'}
                        onValueChange={(value) => handleFilter('payment_method', value === 'all' ? '' : value)}
                    >
                        <SelectTrigger className="border-gray-300">
                            <SelectValue placeholder="Payment Method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Methods</SelectItem>
                            <SelectItem value="paystack">Paystack</SelectItem>
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

                {/* Payments Table */}
                {payments.data && payments.data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">#</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Reference</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Customer</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Email</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Amount</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Status</th>
                                    <th className="p-3 text-left text-sm font-semibold text-[var(--color-deep-blue)]">Date</th>
                                    <th className="p-3 text-right text-sm font-semibold text-[var(--color-deep-blue)]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.data.map((payment, index) => (
                                    <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 text-sm text-[var(--color-brown)]">{payments.from ? payments.from + index : index + 1}</td>
                                        <td className="p-3">
                                            <div className="font-medium text-[var(--color-deep-blue)]">{payment.payment_reference}</div>
                                        </td>
                                        <td className="p-3 text-[var(--color-brown)]">{payment.user?.name || 'N/A'}</td>
                                        <td className="p-3 text-[var(--color-brown)]">{payment.user?.email || 'N/A'}</td>
                                        <td className="p-3 font-semibold text-[var(--color-deep-blue)]">
                                            ₵{Number(payment.amount).toLocaleString()}
                                        </td>
                                        <td className="p-3">
                                            <StatusBadge status={payment.status} />
                                        </td>
                                        <td className="p-3 text-sm text-[var(--color-brown)]">
                                            {payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex justify-end">
                                                <Link href={route('admin.payments.show', payment.id)}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination links={payments.links} lastPage={payments.last_page} className="mt-6" />
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <CreditCard className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-xl font-semibold text-[var(--color-deep-blue)]">No payments found</h3>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
