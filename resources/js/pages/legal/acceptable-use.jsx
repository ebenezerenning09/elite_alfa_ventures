import { Head } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';

export default function AcceptableUse() {
    return (
        <EcommerceLayout>
            <Head title="Acceptable Use Policy - Elite Alfa Ventures" />
            
            <div className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--color-deep-blue)] sm:text-4xl">Acceptable Use Policy</h1>
                    <p className="mt-4 text-sm text-[var(--color-brown)]">Last Updated: March 2026</p>
                    
                    <div className="mt-10 space-y-8 text-gray-600 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">1. General Policy</h2>
                            <p className="mt-2">
                                This Acceptable Use Policy outlines the rules for using our platform. By using Elite Alfa Ventures, you agree to comply with these guidelines.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">2. Prohibited Activities</h2>
                            <p className="mt-2">You may not engage in any of the following activities:</p>
                            <ul className="mt-2 list-disc pl-5 space-y-1">
                                <li>Using the platform for any illegal or unauthorized purpose.</li>
                                <li>Attempting to gain unauthorized access to our systems or user accounts.</li>
                                <li>Interfering with the website's functionality or security.</li>
                                <li>Engaging in fraudulent transactions or misrepresenting your identity.</li>
                                <li>Scanning or testing our platform for vulnerabilities without authorization.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">3. Account Integrity</h2>
                            <p className="mt-2">
                                You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use of your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">4. Content Guidelines</h2>
                            <p className="mt-2">
                                Users may not upload or transmit content that is offensive, defamatory, or violates the intellectual property rights of others.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-[var(--color-deep-blue)]">5. Enforcement</h2>
                            <p className="mt-2">
                                We reserve the right to suspend or terminate accounts that violate this policy. We may also cooperate with legal authorities in cases of illegal activity.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
