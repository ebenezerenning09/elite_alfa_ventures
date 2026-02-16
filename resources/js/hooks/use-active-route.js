import { usePage } from '@inertiajs/react';

export function useActiveRoute() {
    const { url } = usePage();

    const isActive = (href, exact = false) => {
        // Extract pathname from href (in case route() returns full URL)
        const hrefPath = href.includes('?') ? href.split('?')[0] : href.split('?')[0];
        const urlPath = url.includes('?') ? url.split('?')[0] : url;
        
        if (exact) {
            return urlPath === hrefPath || urlPath === hrefPath + '/' || urlPath + '/' === hrefPath;
        }
        
        // For shop pages with category query, check URL params
        if (href.includes('category=')) {
            const category = new URLSearchParams(href.split('?')[1] || '').get('category');
            const currentCategory = new URLSearchParams(url.split('?')[1] || '').get('category');
            return urlPath.startsWith('/shop') && category === currentCategory;
        }
        
        // For /shop without category, check if it's exactly /shop or /shop/ without category param
        if (hrefPath === '/shop') {
            const hasCategory = url.includes('category=');
            return (urlPath === '/shop' || urlPath === '/shop/') && !hasCategory;
        }
        
        return urlPath.startsWith(hrefPath);
    };

    return { isActive };
}
