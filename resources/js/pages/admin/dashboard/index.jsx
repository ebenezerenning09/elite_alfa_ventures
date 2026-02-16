import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/components/admin/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, CreditCard, Users, TrendingUp, DollarSign } from 'lucide-react';
import DateRangePicker from '@/components/admin/DateRangePicker';
import { useState } from 'react';
import StatusBadge from '@/components/admin/StatusBadge';

export default function Dashboard({ stats, financials, recent_orders, recent_payments }) {
    const [startDate, setStartDate] = useState(financials.start_date);
    const [endDate, setEndDate] = useState(financials.end_date);

    const handleDateRangeChange = () => {
        router.get(route('admin.dashboard'), {
            start_date: startDate,
            end_date: endDate,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout activeTab="dashboard" title="Admin Dashboard">
            <Head title="Admin Dashboard" />

            <div className="p-6">
                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[var(--color-brown)] text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-4 w-4 text-[var(--color-mustard-gold)]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-[var(--color-deep-blue)] text-2xl font-bold">{stats.total_products}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[var(--color-brown)] text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-[var(--color-mustard-gold)]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-[var(--color-deep-blue)] text-2xl font-bold">{stats.total_orders}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[var(--color-brown)] text-sm font-medium">Total Payments</CardTitle>
                            <CreditCard className="h-4 w-4 text-[var(--color-mustard-gold)]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-[var(--color-deep-blue)] text-2xl font-bold">{stats.total_payments}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[var(--color-brown)] text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-[var(--color-mustard-gold)]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-[var(--color-deep-blue)] text-2xl font-bold">{stats.total_users}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Financials Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-[var(--color-deep-blue)]">Financial Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <DateRangePicker
                                startDate={startDate}
                                endDate={endDate}
                                onStartDateChange={setStartDate}
                                onEndDateChange={setEndDate}
                            />
                            <Button
                                onClick={handleDateRangeChange}
                                className="mt-4 bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90"
                            >
                                Apply Filter
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-[var(--color-mustard-gold)]" />
                                    <span className="text-[var(--color-brown)] text-sm font-medium">Total Revenue</span>
                                </div>
                                <div className="text-[var(--color-deep-blue)] mt-2 text-2xl font-bold">
                                    ₵{Number(financials.total_revenue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                    <span className="text-[var(--color-brown)] text-sm font-medium">Payments Count</span>
                                </div>
                                <div className="text-[var(--color-deep-blue)] mt-2 text-2xl font-bold">{financials.payments_count}</div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-blue-500" />
                                    <span className="text-[var(--color-brown)] text-sm font-medium">Avg Order Value</span>
                                </div>
                                <div className="text-[var(--color-deep-blue)] mt-2 text-2xl font-bold">
                                    ₵{Number(financials.average_order_value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-green-500" />
                                    <span className="text-[var(--color-brown)] text-sm font-medium">Successful</span>
                                </div>
                                <div className="text-[var(--color-deep-blue)] mt-2 text-2xl font-bold">{financials.successful_payments}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Orders and Payments */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[var(--color-deep-blue)]">Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recent_orders && recent_orders.length > 0 ? (
                                <div className="space-y-3">
                                    {recent_orders.map((order) => (
                                        <Link
                                            key={order.id}
                                            href={route('admin.orders.show', order.id)}
                                            className="block rounded-lg border border-gray-200 bg-white p-3 transition-all hover:shadow-md"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-[var(--color-deep-blue)] font-semibold">#{order.order_number}</div>
                                                    <div className="text-[var(--color-brown)] text-sm">{order.user?.email}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[var(--color-deep-blue)] font-bold">₵{Number(order.total_amount).toLocaleString()}</div>
                                                    <StatusBadge status={order.status} className="mt-1" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[var(--color-brown)] text-center">No recent orders</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[var(--color-deep-blue)]">Recent Payments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recent_payments && recent_payments.length > 0 ? (
                                <div className="space-y-3">
                                    {recent_payments.map((payment) => (
                                        <Link
                                            key={payment.id}
                                            href={route('admin.payments.show', payment.id)}
                                            className="block rounded-lg border border-gray-200 bg-white p-3 transition-all hover:shadow-md"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-[var(--color-deep-blue)] font-semibold">{payment.payment_reference}</div>
                                                    <div className="text-[var(--color-brown)] text-sm">{payment.user?.email}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[var(--color-deep-blue)] font-bold">₵{Number(payment.amount).toLocaleString()}</div>
                                                    <StatusBadge status={payment.status} className="mt-1" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[var(--color-brown)] text-center">No recent payments</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
