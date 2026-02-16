import { Head } from '@inertiajs/react';
import EcommerceLayout from '@/layouts/ecommerce-layout';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            category: 'General',
            questions: [
                {
                    question: 'What is Elite Alfa Ventures?',
                    answer: 'Elite Alfa Ventures is a premier e-commerce platform specializing in luxury goods including watches, jewelry, designer handbags, and premium accessories. We offer authentic, high-quality products with exceptional customer service.',
                },
                {
                    question: 'Are your products authentic?',
                    answer: 'Yes, absolutely! We guarantee the authenticity of all our products. We work directly with trusted suppliers and verify each item before it reaches our customers.',
                },
                {
                    question: 'Do you ship internationally?',
                    answer: 'Currently, we ship within Ghana only. We deliver to all enabled regions including Ashanti and Western North. More regions will be added soon.',
                },
            ],
        },
        {
            category: 'Orders & Shipping',
            questions: [
                {
                    question: 'How long does delivery take?',
                    answer: 'Delivery times vary by region. Typically, orders are processed within 1-2 business days and delivered within 3-7 business days depending on your location.',
                },
                {
                    question: 'What are your shipping charges?',
                    answer: 'Shipping charges are calculated at checkout based on your delivery address. The exact amount will be shown before you complete your payment.',
                },
                {
                    question: 'Can I track my order?',
                    answer: 'Yes! Once your order is shipped, you will receive a tracking number via email. You can also view your order status in your account dashboard.',
                },
                {
                    question: 'What if I receive a damaged item?',
                    answer: 'We take great care in packaging our products. However, if you receive a damaged item, please contact us immediately within 48 hours of delivery, and we will arrange for a replacement or refund.',
                },
            ],
        },
        {
            category: 'Payments',
            questions: [
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept payments through Paystack, which supports major credit cards, debit cards, and mobile money. All payments are processed securely.',
                },
                {
                    question: 'Is my payment information secure?',
                    answer: 'Yes, absolutely! We use Paystack, a PCI DSS compliant payment processor. We never store your payment card details on our servers. All transactions are encrypted and secure.',
                },
                {
                    question: 'When will I be charged?',
                    answer: 'Your payment is processed immediately when you complete your order. You will receive a confirmation email once the payment is successful.',
                },
                {
                    question: 'What is your refund policy?',
                    answer: 'We offer refunds for items returned within 7 days of delivery, provided they are in their original condition with tags attached. Refunds are processed within 5-10 business days.',
                },
            ],
        },
        {
            category: 'Account & Returns',
            questions: [
                {
                    question: 'How do I create an account?',
                    answer: 'Click on "Register" in the top navigation, fill in your details, and verify your email address. Creating an account allows you to track orders, save addresses, and manage your profile.',
                },
                {
                    question: 'Can I change my delivery address?',
                    answer: 'Yes! You can add, edit, or delete delivery addresses in your account dashboard under "Addresses". You can also set a default address for faster checkout.',
                },
                {
                    question: 'How do I return an item?',
                    answer: 'To return an item, contact our customer service team with your order number. We will provide you with return instructions. Items must be returned in original condition within 7 days of delivery.',
                },
                {
                    question: 'How can I update my profile information?',
                    answer: 'You can update your profile information including name, phone number, and delivery addresses in your account dashboard under "Profile" and "Addresses" sections.',
                },
            ],
        },
    ];

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    let questionIndex = 0;

    return (
        <EcommerceLayout>
            <Head>
                <title>Frequently Asked Questions - Elite Alfa Ventures | Kumasi, Ghana</title>
                <meta name="description" content="Find answers to common questions about Elite Alfa Ventures. Learn about our products, orders, shipping, payments, returns, and more. Serving customers in Kumasi, KNUST, and across Ghana." />
                <meta name="keywords" content="FAQ, frequently asked questions, Elite Alfa Ventures, Kumasi, Ghana, luxury goods, shipping, payments, returns" />
            </Head>

            <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="rounded-full bg-[var(--color-deep-blue)]/10 p-4">
                            <HelpCircle className="h-12 w-12 text-[var(--color-deep-blue)]" />
                        </div>
                    </div>
                    <h1 className="text-[var(--color-deep-blue)] text-4xl font-bold tracking-tight sm:text-5xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-[var(--color-brown)] mx-auto mt-4 max-w-2xl text-lg">
                        Find answers to common questions about our products, orders, shipping, and more.
                    </p>
                </div>

                {/* FAQ Sections */}
                <div className="space-y-8">
                    {faqs.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-[var(--color-deep-blue)] mb-6 text-2xl font-bold">
                                {section.category}
                            </h2>
                            <div className="space-y-4">
                                {section.questions.map((faq, faqIndex) => {
                                    const currentIndex = questionIndex++;
                                    const isOpen = openIndex === currentIndex;

                                    return (
                                        <div
                                            key={faqIndex}
                                            className="rounded-lg border border-gray-200 bg-[var(--color-off-white)] transition-all"
                                        >
                                            <button
                                                onClick={() => toggleQuestion(currentIndex)}
                                                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
                                            >
                                                <span className="text-[var(--color-deep-blue)] font-semibold">
                                                    {faq.question}
                                                </span>
                                                <ChevronDown
                                                    className={`h-5 w-5 text-[var(--color-brown)] transition-transform ${
                                                        isOpen ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </button>
                                            {isOpen && (
                                                <div className="border-t border-gray-200 p-4">
                                                    <p className="text-[var(--color-brown)] leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Still Have Questions */}
                <div className="mt-12 rounded-lg border border-gray-200 bg-[var(--color-deep-blue)] p-8 text-center text-white">
                    <h2 className="mb-4 text-2xl font-bold">Still have questions?</h2>
                    <p className="mb-6 opacity-90">
                        Can't find the answer you're looking for? Please reach out to our friendly team.
                    </p>
                    <a
                        href={route('contact.index')}
                        className="inline-block rounded-md bg-white px-6 py-3 font-semibold text-[var(--color-deep-blue)] transition-all hover:bg-gray-100"
                    >
                        Contact Us
                    </a>
                </div>
            </main>
        </EcommerceLayout>
    );
}
