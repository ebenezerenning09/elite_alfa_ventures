import React from 'react';

export function Logo({ className = '', imgClassName = '', ...props }) {
    return (
        <div className={`flex items-center ${className}`} {...props}>
            <img 
                src="/LOGO/logo.png" 
                alt="Elite Alfa Ventures" 
                className={`h-12 w-auto object-contain ${imgClassName}`}
            />
        </div>
    );
}
