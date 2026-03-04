import { Head } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';

export default function ShippingReturns() {
    return (
        <EcommerceLayout>
            <Head title="Shipping & Returns - Elite Alfa Ventures" />
            
            <div className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--color-deep-blue)] sm:text-4xl">Shipping & Returns</h1>
                    <p className="mt-4 text-sm text-[var(--color-brown)]">Last Updated: March 2026</p>
                    
                    <div className="mt-10 space-y-8 text-gray-600 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">1. Shipping Policy (Ghana Only)</h2>
                            <p className="mt-2">
                                Elite Alfa Ventures currently delivers exclusively within the Republic of Ghana. We do not offer international shipping at this time.
                            </p>
                            <ul className="mt-4 list-disc pl-5 space-y-2">
                                <li><strong>Delivery Locations:</strong> We deliver to addresses across all major regions in Ghana, including Kumasi, Accra, Takoradi, and beyond.</li>
                                <li><strong>Delivery Times:</strong> Orders are typically processed within 1-2 business days. Delivery usually takes 3-7 business days depending on your specific location.</li>
                                <li><strong>Shipping Costs:</strong> Delivery is arranged upon order confirmation, and the shipping cost is borne by the buyer.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">2. Order Tracking</h2>
                            <p className="mt-2">
                                You can monitor the status of your order directly through your account dashboard. Our team will update your order progress as it moves from processing to delivery.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">3. Returns & Exchanges</h2>
                            <p className="mt-2">
                                At Elite Alfa Ventures, we take pride in the quality and authenticity of our luxury items. Due to the high-value nature of our products, we have a strict return policy:
                            </p>
                            <ul className="mt-4 list-disc pl-5 space-y-2">
                                <li><strong>Defective or Incorrect Items:</strong> Returns are only accepted if the item received is defective, damaged upon arrival, or incorrect.</li>
                                <li><strong>Notification Period:</strong> You must notify our customer service team within 48 hours of receiving your delivery to report any issues.</li>
                                <li><strong>Condition:</strong> To be eligible for a return, the item must be unused, in the same condition that you received it, and in its original packaging with all tags and certificates of authenticity included.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">4. Refund Process</h2>
                            <p className="mt-2">
                                After we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed via your original payment method or through a bank transfer within 5-10 business days.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">5. Verification Required</h2>
                            <p className="mt-2">
                                For high-value returns, we may require a verification process and photo/video evidence of the defect or damage before authorizing the return.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">6. Contact Us</h2>
                            <p className="mt-2">
                                For any questions regarding shipping or returns, please contact our support team at info@elitealfaventures.com or call us at +233 24 123 4567.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
