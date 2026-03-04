import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Head } from '@inertiajs/react';

export default function Privacy() {
    return (
        <EcommerceLayout>
            <Head title="Privacy Policy - Elite Alfa Ventures" />

            <div className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--color-deep-blue)] sm:text-4xl">Privacy Policy</h1>
                    <p className="mt-4 text-sm text-[var(--color-brown)]">Last Updated: March 2026</p>

                    <div className="mt-10 space-y-8 leading-relaxed text-gray-600">
                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">1. Information We Collect</h2>
                            <p className="mt-2">
                                We collect information you provide directly to us, such as your name, email address, shipping address, and phone
                                number when you create an account or make a purchase.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">2. Payment Information</h2>
                            <p className="mt-2">
                                We do not store your credit card or bank details. All payment transactions will be handled securely by Paystack.
                                Paystack collects and processes your payment data according to their own privacy policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">3. How We Use Your Information</h2>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                <li>To process and fulfill your orders.</li>
                                <li>To communicate with you about your account and purchases.</li>
                                <li>To send you marketing communications (if you have opted in).</li>
                                <li>To improve our website and customer service.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">4. Sharing Your Information</h2>
                            <p className="mt-2">
                                We share your information with third-party service providers only as necessary to provide our services, such as
                                delivery companies and payment processors like Paystack.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">5. Data Security</h2>
                            <p className="mt-2">
                                We implement industry-standard security measures to protect your personal information. However, no method of
                                transmission over the internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">6. Your Rights</h2>
                            <p className="mt-2">
                                You have the right to access, correct, or delete your personal information. You can manage your account settings or
                                contact us for assistance.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
