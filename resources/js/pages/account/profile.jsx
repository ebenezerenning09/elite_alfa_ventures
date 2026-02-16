import { Head, useForm } from '@inertiajs/react';
import AccountLayout from '@/layouts/account-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

export default function Profile({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user?.name || '',
        full_name: user?.full_name || '',
        phone: user?.phone || '',
        email: user?.email || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('account.profile.update'));
    };

    return (
        <AccountLayout activeTab="profile">
            <Head title="My Profile - Elite Alfa Ventures" />

            <div className="p-6">
                <div className="mb-6">
                    <h2 className="text-[var(--color-deep-blue)] text-2xl font-bold">My Profile</h2>
                    <p className="text-[var(--color-brown)] mt-2">Update your personal information</p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                    <div>
                        <Label htmlFor="name" className="text-[var(--color-deep-blue)]">
                            Username *
                        </Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 text-[var(--color-deep-blue)]"
                            required
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="full_name" className="text-[var(--color-deep-blue)]">
                            Full Name
                        </Label>
                        <Input
                            id="full_name"
                            value={data.full_name}
                            onChange={(e) => setData('full_name', e.target.value)}
                            className="mt-1 text-[var(--color-deep-blue)]"
                            placeholder="Your full name"
                        />
                        {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="phone" className="text-[var(--color-deep-blue)]">
                            Phone Number
                        </Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="mt-1 text-[var(--color-deep-blue)]"
                            placeholder="0241234567"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email" className="text-[var(--color-deep-blue)]">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            disabled
                            className="mt-1 bg-gray-50 text-[var(--color-deep-blue)]"
                        />
                        <p className="text-[var(--color-brown)] mt-1 text-xs">
                            Email cannot be changed. Contact support if you need to update it.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            className="bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AccountLayout>
    );
}
