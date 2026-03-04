import EcommerceLayout from '@/layouts/ecommerce-layout';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <EcommerceLayout>
            <Head title="Terms and Conditions - Elite Alfa Ventures" />

            <div className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--color-deep-blue)] sm:text-4xl">Terms and Conditions</h1>
                    <p className="mt-4 text-sm text-[var(--color-brown)]">Last Updated: March 2026</p>

                    <div className="mt-10 space-y-8 leading-relaxed text-gray-600">
                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">1. Introduction</h2>
                            <p className="mt-2">
                                Welcome to Elite Alfa Ventures. By accessing or using our website, you agree to be bound by these Terms and
                                Conditions. Please read them carefully before making any purchase.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">2. Product Authenticity</h2>
                            <p className="mt-2">
                                Elite Alfa Ventures specializes in premium luxury items. We guarantee the authenticity of all products sold on our
                                platform. Our items are sourced from authorized distributors and reputable suppliers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">3. Pricing and Payments</h2>
                            <p className="mt-2">
                                All prices are listed in Ghana Cedis (GHS) unless otherwise stated. We reserve the right to change prices without
                                notice. Payments will be processed securely via Paystack. By completing a transaction, you agree to the payment terms
                                of our third-party processor.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">4. Shipping and Delivery</h2>
                            <p className="mt-2">
                                We offer delivery within Ghana. Delivery times are estimates and may vary. We are not responsible for delays caused by
                                third party delivery services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">5. Returns and Refunds</h2>
                            <p className="mt-2">
                                Due to the nature of luxury goods, returns are only accepted for items that are defective or incorrect upon delivery.
                                Notification must be made within 48 hours of receipt. Items must be in original condition with all tags and packaging.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">6. Limitation of Liability</h2>
                            <p className="mt-2">
                                Elite Alfa Ventures shall not be liable for any indirect, incidental, or consequential damages arising from the use of
                                our services or the purchase of products.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">7. Governing Law</h2>
                            <p className="mt-2">
                                These terms are governed by the laws of the Republic of Ghana. Any disputes shall be attempted to be resolved mutually first. If a resolution cannot be reached, the dispute shall be resolved in the courts of Ghana.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
