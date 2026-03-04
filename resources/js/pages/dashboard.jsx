import { Head } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Link } from '@inertiajs/react';
import { ShoppingBag, Package, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
    return (
        <EcommerceLayout>
            <Head title="Dashboard - Elite Alfa Ventures" />
            
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-8 pt-4">
                    <h1 className="text-[var(--color-deep-blue)] text-4xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-[var(--color-brown)] mt-3 text-lg">Welcome back! Here's your overview.</p>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-gray-200/50 bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
                            <CardTitle className="text-[var(--color-brown)] text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-[var(--color-mustard-gold)]" />
                        </CardHeader>
                        <CardContent className="pt-2">
                            <div className="text-[var(--color-deep-blue)] text-2xl font-bold">0</div>
                            <p className="text-[var(--color-brown)] mt-2 text-xs">No orders yet</p>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200/50 bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
                            <CardTitle className="text-[var(--color-brown)] text-sm font-medium">Products</CardTitle>
                            <Package className="h-4 w-4 text-[var(--color-mustard-gold)]" />
                        </CardHeader>
                        <CardContent className="pt-2">
                            <div className="text-[var(--color-deep-blue)] text-2xl font-bold">8</div>
                            <p className="text-[var(--color-brown)] mt-2 text-xs">Available items</p>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200/50 bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
                            <CardTitle className="text-[var(--color-brown)] text-sm font-medium">Customers</CardTitle>
                            <Users className="h-4 w-4 text-[var(--color-mustard-gold)]" />
                        </CardHeader>
                        <CardContent className="pt-2">
                            <div className="text-[var(--color-deep-blue)] text-2xl font-bold">0</div>
                            <p className="text-[var(--color-brown)] mt-2 text-xs">Registered users</p>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200/50 bg-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
                            <CardTitle className="text-[var(--color-brown)] text-sm font-medium">Revenue</CardTitle>
                            <TrendingUp className="h-4 w-4 text-[var(--color-mustard-gold)]" />
                        </CardHeader>
                        <CardContent className="pt-2">
                            <div className="text-[var(--color-deep-blue)] text-2xl font-bold">₵0</div>
                            <p className="text-[var(--color-brown)] mt-2 text-xs">Total sales</p>
                        </CardContent>
                    </Card>
                    </div>

                {/* Quick Actions */}
                <div className="mb-8 pt-2">
                    <h2 className="text-[var(--color-deep-blue)] mb-5 text-2xl font-bold">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="/shop">
                            <Card className="border-gray-200/50 bg-white transition-all duration-300 hover:border-[var(--color-mustard-gold)]/30 hover:shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-[var(--color-deep-blue)]">Shop Products</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-[var(--color-brown)] text-sm">Browse and shop our collection</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/categories">
                            <Card className="border-gray-200/50 bg-white transition-all duration-300 hover:border-[var(--color-mustard-gold)]/30 hover:shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-[var(--color-deep-blue)]">View Categories</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-[var(--color-brown)] text-sm">Explore by category</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/cart">
                            <Card className="border-gray-200/50 bg-white transition-all duration-300 hover:border-[var(--color-mustard-gold)]/30 hover:shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-[var(--color-deep-blue)]">Shopping Cart</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-[var(--color-brown)] text-sm">View your cart items</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="pt-2">
                    <h2 className="text-[var(--color-deep-blue)] mb-5 text-2xl font-bold">Recent Activity</h2>
                    <Card className="border-gray-200/50 bg-white">
                        <CardContent className="p-6 pt-4">
                            <p className="text-[var(--color-brown)] text-center text-sm">No recent activity to display</p>
                        </CardContent>
                    </Card>
                </div>
            </main>


        </EcommerceLayout>
    );
}

