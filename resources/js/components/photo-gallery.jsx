import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function PhotoGallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    const photos = [
        {
            id: 1,
            title: 'Premium Watch Collection',
            url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
            category: 'Watches',
        },
        {
            id: 2,
            title: 'Exquisite Jewelry Display',
            url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
            category: 'Jewelry',
        },
        {
            id: 3,
            title: 'Designer Handbags',
            url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
            category: 'Bags',
        },
        {
            id: 4,
            title: 'Luxury Accessories',
            url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=600&fit=crop',
            category: 'Accessories',
        },
        {
            id: 5,
            title: 'Premium Watch Showcase',
            url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=600&fit=crop',
            category: 'Watches',
        },
        {
            id: 6,
            title: 'Elegant Jewelry Collection',
            url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=600&fit=crop',
            category: 'Jewelry',
        },
        {
            id: 7,
            title: 'Quality Craftsmanship',
            url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop',
            category: 'Accessories',
        },
        {
            id: 8,
            title: 'Luxury Product Display',
            url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop',
            category: 'Bags',
        },
    ];

    const openModal = (photo) => {
        setSelectedImage(photo);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction) => {
        if (!selectedImage) return;
        const currentIndex = photos.findIndex((p) => p.id === selectedImage.id);
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % photos.length;
        } else {
            newIndex = (currentIndex - 1 + photos.length) % photos.length;
        }
        setSelectedImage(photos[newIndex]);
    };

    return (
        <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-[var(--color-deep-blue)] text-4xl font-bold tracking-tight">
                        Our Products in Action
                    </h2>
                    <p className="text-[var(--color-brown)] mx-auto mt-4 max-w-2xl text-lg">
                        Real photos of our premium luxury products. See the quality and elegance we deliver.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {photos.map((photo) => (
                        <div
                            key={photo.id}
                            className="group relative cursor-pointer overflow-hidden rounded-lg"
                            onClick={() => openModal(photo)}
                        >
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <p className="font-semibold">{photo.title}</p>
                                    <p className="text-sm opacity-90">{photo.category}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={closeModal}>
                    <div className="relative max-w-4xl" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={closeModal}
                            className="absolute -right-4 -top-4 z-10 rounded-full bg-white p-2 text-gray-800 transition-colors hover:bg-gray-100"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => navigateImage('prev')}
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 transition-colors hover:bg-white"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => navigateImage('next')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 transition-colors hover:bg-white"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.title}
                            className="max-h-[90vh] w-full rounded-lg object-contain"
                        />
                        <div className="mt-4 text-center text-white">
                            <p className="text-lg font-semibold">{selectedImage.title}</p>
                            <p className="text-sm opacity-90">{selectedImage.category}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
