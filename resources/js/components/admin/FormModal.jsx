import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LoaderCircle } from 'lucide-react';

export default function FormModal({
    isOpen,
    onClose,
    title,
    children,
    onSubmit,
    submitLabel = 'Save',
    isSubmitting = false,
    submitButtonClass = '',
}) {
    const handleClose = (open) => {
        if (!open && !isSubmitting) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent
                className="max-h-[98vh] border-gray-200 bg-white p-0 text-gray-900 sm:max-w-2xl"
                onInteractOutside={(e) => {
                    if (!isSubmitting) {
                        e.preventDefault();
                    }
                }}
                onEscapeKeyDown={(e) => {
                    if (!isSubmitting) {
                        onClose();
                    } else {
                        e.preventDefault();
                    }
                }}
            >
                <div className="flex h-full max-h-[98vh] flex-col">
                    <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4">
                        <DialogTitle className="text-xl font-bold text-[var(--color-deep-blue)]">{title}</DialogTitle>
                        <DialogDescription className="sr-only">Form dialog content for {title}</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col overflow-hidden">
                        <div className="flex-1 space-y-4 overflow-y-auto px-6">{children}</div>

                        <DialogFooter className="flex-shrink-0 gap-2 border-t border-gray-200 bg-white px-6 py-4 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="border-gray-300 text-[var(--color-brown)] hover:bg-gray-50"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-[var(--color-deep-blue)] text-white hover:bg-[var(--color-deep-blue)]/90 ${submitButtonClass}`}
                            >
                                {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                {submitLabel}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
