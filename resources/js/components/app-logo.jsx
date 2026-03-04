import { Logo } from './logo';

export default function AppLogo() {
    return (<>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md overflow-hidden">
                <Logo className="h-6" imgClassName="h-full w-auto" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold text-[var(--color-deep-blue)]">Elite Alfa Ventures</span>
            </div>
        </>);
}

