import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/components/admin/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UserShow({ user }) {
    return (
        <AdminLayout activeTab="users" title={`User: ${user.name}`}>
            <Head title={`User: ${user.name}`} />

            <div className="p-6">
                <Link href={route('admin.users.index')}>
                    <Button variant="ghost" className="mb-4 text-[var(--color-brown)] hover:text-[var(--color-deep-blue)]">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Users
                    </Button>
                </Link>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[var(--color-deep-blue)]">User Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Name</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 text-lg font-semibold">{user.name}</div>
                            </div>
                            {user.full_name && (
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Full Name</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1">{user.full_name}</div>
                                </div>
                            )}
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Email</div>
                                <div className="text-[var(--color-deep-blue)] mt-1">{user.email}</div>
                            </div>
                            {user.phone && (
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Phone</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1">{user.phone}</div>
                                </div>
                            )}
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Status</div>
                                <div className="mt-1">
                                    <StatusBadge status={user.is_active ? 'active' : 'inactive'} />
                                </div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Member Since</div>
                                <div className="text-[var(--color-brown)] mt-1">{new Date(user.created_at).toLocaleDateString()}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[var(--color-deep-blue)]">Account Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Total Orders</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 text-2xl font-bold">{user.orders_count || 0}</div>
                            </div>
                            <div>
                                <div className="text-[var(--color-brown)] text-sm font-medium">Total Payments</div>
                                <div className="text-[var(--color-deep-blue)] mt-1 text-2xl font-bold">{user.payments_count || 0}</div>
                            </div>
                            {user.addresses && user.addresses.length > 0 && (
                                <div>
                                    <div className="text-[var(--color-brown)] text-sm font-medium">Saved Addresses</div>
                                    <div className="text-[var(--color-deep-blue)] mt-1 text-lg font-semibold">{user.addresses.length}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {user.orders && user.orders.length > 0 && (
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-[var(--color-deep-blue)]">Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {user.orders.slice(0, 5).map((order) => (
                                    <Link
                                        key={order.id}
                                        href={route('admin.orders.show', order.id)}
                                        className="block rounded-lg border border-gray-200 p-3 transition-all hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-[var(--color-deep-blue)] font-semibold">#{order.order_number}</div>
                                                <div className="text-[var(--color-brown)] text-sm">{new Date(order.created_at).toLocaleDateString()}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[var(--color-deep-blue)] font-bold">₵{Number(order.total_amount).toLocaleString()}</div>
                                                <StatusBadge status={order.status} className="mt-1" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
