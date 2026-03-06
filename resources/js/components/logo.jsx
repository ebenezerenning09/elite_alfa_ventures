export function Logo({ className = '', imgClassName = '', ...props }) {
    return (
        <div className={`flex items-center ${className}`} {...props}>
            <img
                src="/LOGO/logo.png"
                alt="Elite Alfa Ventures"
                className={`h-12 w-auto object-contain ${imgClassName}`}
                style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.8)) drop-shadow(0 0 1px rgba(255,255,255,0.8))' }}
            />
        </div>
    );
}
