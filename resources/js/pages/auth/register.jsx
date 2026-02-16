import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register"/>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-[var(--color-deep-blue)] font-medium">Name</Label>
                        <Input 
                            id="name" 
                            type="text" 
                            required 
                            autoFocus 
                            tabIndex={1} 
                            autoComplete="name" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)} 
                            disabled={processing} 
                            placeholder="Full name"
                            className="border-gray-300 focus:border-[var(--color-mustard-gold)] focus:ring-[var(--color-mustard-gold)]/20"
                        />
                        <InputError message={errors.name} className="mt-2"/>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[var(--color-deep-blue)] font-medium">Email address</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            required 
                            tabIndex={2} 
                            autoComplete="email" 
                            value={data.email} 
                            onChange={(e) => setData('email', e.target.value)} 
                            disabled={processing} 
                            placeholder="email@example.com"
                            className="border-gray-300 focus:border-[var(--color-mustard-gold)] focus:ring-[var(--color-mustard-gold)]/20"
                        />
                        <InputError message={errors.email}/>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-[var(--color-deep-blue)] font-medium">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            required 
                            tabIndex={3} 
                            autoComplete="new-password" 
                            value={data.password} 
                            onChange={(e) => setData('password', e.target.value)} 
                            disabled={processing} 
                            placeholder="Password"
                            className="border-gray-300 focus:border-[var(--color-mustard-gold)] focus:ring-[var(--color-mustard-gold)]/20"
                        />
                        <InputError message={errors.password}/>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="text-[var(--color-deep-blue)] font-medium">Confirm password</Label>
                        <Input 
                            id="password_confirmation" 
                            type="password" 
                            required 
                            tabIndex={4} 
                            autoComplete="new-password" 
                            value={data.password_confirmation} 
                            onChange={(e) => setData('password_confirmation', e.target.value)} 
                            disabled={processing} 
                            placeholder="Confirm password"
                            className="border-gray-300 focus:border-[var(--color-mustard-gold)] focus:ring-[var(--color-mustard-gold)]/20"
                        />
                        <InputError message={errors.password_confirmation}/>
                    </div>

                    <Button 
                        type="submit" 
                        className="mt-2 w-full bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90 transition-all duration-300 shadow-md hover:shadow-lg" 
                        tabIndex={5} 
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin"/>}
                        Create account
                    </Button>
                </div>

                <div className="text-[var(--color-brown)] text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} className="text-[var(--color-deep-blue)] font-medium hover:text-[var(--color-mustard-gold)] transition-colors no-underline hover:no-underline" tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}

