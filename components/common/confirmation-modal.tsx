import * as Dialog from '@radix-ui/react-dialog'

type ConfirmationModalProps = {
    title?: string
    question?: string
    btnConfirmTxt?: string
    isOpen: boolean
    handleCancel: () => void
    handleConfirm: () => void
}

function ConfirmationModal({ title = 'Action confirmation', question = 'Execute this action', btnConfirmTxt = 'Ok', isOpen, handleCancel, handleConfirm }: ConfirmationModalProps) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) handleCancel() }}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
                <Dialog.Content className="fixed top-20 left-1/2 -translate-x-1/2 w-[95%] sm:w-105 md:w-130 max-w-full bg-white rounded-lg shadow-xl z-50">
                    <div className='flex justify-between items-center pl-4 pr-2 pt-2'>
                        <h2 className='text-[18px] font-semibold'>
                            {title}
                        </h2>
                        <Dialog.Close asChild>
                            <button
                                className='p-1.5 rounded hover:bg-gray-100 cursor-pointer'
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleCancel()
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M11.78 2.22a.75.75 0 0 0-1.06 0L7 5.94 3.28 2.22a.75.75 0 0 0-1.06 1.06L5.94 7l-3.72 3.72a.75.75 0 1 0 1.06 1.06L7 8.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L8.06 7l3.72-3.72a.75.75 0 0 0 0-1.06z"/></svg>
                            </button>
                        </Dialog.Close>
                    </div>

                    <div className='px-4 mt-3'>
                        <span className='font-semibold text-lg'>
                            {question}
                        </span>
                    </div>

                    <div className='flex justify-between items-center w-full px-4 py-3 mt-2'>
                        <button
                            type="button"
                            className='h-8 px-4 rounded bg-red-400 text-white text-sm font-medium cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault()
                                handleCancel()
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className='h-8 px-4 rounded bg-background-secondary text-white text-sm font-medium cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault()
                                handleConfirm()
                            }}
                        >
                            {btnConfirmTxt}
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default ConfirmationModal
