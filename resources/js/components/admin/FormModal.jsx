import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

export default function FormModal({ isOpen, onClose, title, children, onSubmit, submitLabel = 'Save', isSubmitting = false, submitButtonClass = '' }) {
    const handleClose = (open) => {
        if (!open && !isSubmitting) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent 
                className="bg-white text-gray-900 border-gray-200 sm:max-w-2xl max-h-[98vh] p-0" 
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
                <div className="flex flex-col h-full max-h-[98vh]">
                    <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4">
                        <DialogTitle className="text-[var(--color-deep-blue)] text-xl font-bold">{title}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
                        <div className="flex-1 overflow-y-auto px-6 space-y-4">
                            {children}
                        </div>

                        <DialogFooter className="flex-shrink-0 gap-2 sm:gap-0 px-6 py-4 border-t border-gray-200 bg-white">
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
