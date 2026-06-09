import {
    DialogRoot,
    DialogContent,
    DialogBody,
    DialogFooter,
    DialogBackdrop,
    CloseButton,
    DialogPositioner,
    InputGroup,
    Input,
    Button,
} from '@chakra-ui/react'

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
        <DialogRoot open={isOpen}
            onOpenChange={(details) => {
                if (!details.open) handleCancel()
            }}
        >
            <DialogPositioner pt="80px">
                <DialogBackdrop bg="blackAlpha.600" />
                <DialogContent
                    w={{ base: '95%', sm: '420px', md: '520px' }}
                    maxW="100%"
                >
                    <div className='flex justify-between items-center pl-4 pr-2 pt-2'>
                        <h2 className='text-[18px] font-semibold'>
                            {title}
                        </h2>
                        <CloseButton
                            onClick={(e) => {
                                e.preventDefault()
                                handleCancel()
                            }}
                        />
                    </div>

                    <DialogBody marginTop="12px">
                        <span className='font-semibold text-lg'>
                            {question}
                        </span>
                    </DialogBody>

                    <DialogFooter marginTop="8px">
                        <div className='flex justify-between  items-center w-full'>
                            <Button
                                type="button"
                                variant='solid'
                                className='bg-red-400'
                                borderRadius='4px'
                                height="32px"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleCancel()
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                variant='solid'
                                className='bg-background-secondary'
                                borderRadius='4px'
                                height="32px"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleConfirm()
                                }}
                            >
                                {btnConfirmTxt}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </DialogPositioner>
        </DialogRoot>
    )
}

export default ConfirmationModal