import { Link } from '@inertiajs/react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/cart-store';
import { useState } from 'react';

export function ProductCard({ product }) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        setIsAdding(true);
        addToCart({
            ...product,
            quantity: 1,
        });
        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <Card className="group flex h-full flex-col overflow-hidden border-gray-200/50 bg-white transition-all duration-300 hover:shadow-xl hover:border-[var(--color-mustard-gold)]/30">
            <Link href={`/products/${product.id}`} className="block flex-1">
                <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-off-white)]">
                    {product.images && product.images.length > 0 && product.images[0]?.image_path ? (
                        <img
                            src={product.images[0].image_path}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-off-white)] to-gray-100">
                            <span className="text-6xl opacity-20">📦</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <CardContent className="flex flex-1 flex-col p-5">
                    <h3 className="text-[var(--color-deep-blue)] mb-2 font-semibold line-clamp-2 text-lg leading-tight">
                        {product.name}
                    </h3>
                    <p className="text-[var(--color-brown)] mb-4 flex-1 text-sm leading-relaxed line-clamp-2">
                        {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-[var(--color-deep-blue)] text-2xl font-bold">
                            ₵{Number(product.price).toLocaleString()}
                        </span>
                    </div>
                </CardContent>
            </Link>
            <CardFooter className="p-5 pt-0">
                <Button
                    className="w-full bg-[var(--color-deep-blue)] text-white transition-all duration-300 hover:bg-[var(--color-deep-blue)]/90 hover:shadow-md"
                    onClick={handleAddToCart}
                    disabled={isAdding}
                >
                    {isAdding ? 'Added!' : 'Add to Cart'}
                </Button>
            </CardFooter>
        </Card>
    );
}
