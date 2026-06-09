
import useUsers from '@/lib/hooks/useUsers'
import { User } from '@/lib/types'
import React from 'react'
import { toaster } from '@/components/ui/toaster';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
import { FaUserAlt } from 'react-icons/fa';

type EditUserModalProps = {
    user: User
    isOpen: boolean
    handleCloseModal: (refresh: boolean) => void
}

interface EditInpusts {
    firstName: string
    lastName: string
}

function EditUserModal({ user, isOpen, handleCloseModal }: EditUserModalProps) {
    const { editUserMutation } = useUsers()

    const { mutateAsync: editUserAsync, isPending: isEditPending } = editUserMutation()

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<EditInpusts>({
        defaultValues: {
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? ''
        }
    })

    const editUserSubmit: SubmitHandler<EditInpusts> = async (data) => {
        if (isEditPending)
            return

        const { firstName, lastName } = data

        try {
            const res = await editUserAsync({ userId: user.id, firstName, lastName })

            if (res && res.success) {
                toaster.create({
                    description: "User edit successfully",
                    type: "success"
                })
                closeModal(true)
            } else {
                toaster.create({
                    description: "error occurred",
                    type: "error"
                })
            }
        } catch (error: any) {
            console.log('error', error);
            toaster.create({
                description: "error occurred",
                type: "error"
            })
        }
    }

    const closeModal = (refresh: boolean = false) => {
        reset({
            firstName: '',
            lastName: ''
        })
        handleCloseModal(refresh)
    }

    return (
        <>
            <DialogRoot open={isOpen}
                onOpenChange={(details) => {
                    if (!details.open) closeModal()
                }}
            >
                <DialogPositioner pt="80px">
                    <DialogBackdrop bg="blackAlpha.600" />
                    <DialogContent
                        w={{ base: '95%', sm: '420px', md: '520px' }}
                        maxW="100%"
                    >
                        <form onSubmit={handleSubmit(editUserSubmit)}>
                            <div className='flex justify-between items-center pl-4 pr-2 pt-2'>
                                <h2 className='text-[18px] font-semibold'>
                                    Edit User
                                </h2>
                                <CloseButton
                                    onClick={(e) => {
                                        e.preventDefault()
                                        closeModal()
                                    }}
                                />
                            </div>
                            <DialogBody marginTop="12px">
                                <div className='space-y-5'>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        rules={{
                                            required: 'required field',
                                            minLength: { value: 2, message: 'minimum 2 letters' }
                                        }}
                                        render={({ field }) =>
                                            <div>
                                                <InputGroup
                                                    startElement={<FaUserAlt />}
                                                >
                                                    <Input
                                                        {...field}
                                                        border="1px solid"
                                                        borderColor="gray.300"
                                                        placeholder='first name'
                                                    />
                                                </InputGroup>
                                                {
                                                    errors.firstName &&
                                                    <span className='inline-block pt-[4px] pr-[8px] text-sm text-info-error'>
                                                        {errors.firstName.message}
                                                    </span>
                                                }
                                            </div>
                                        }
                                    />
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        rules={{
                                            required: 'required field',
                                            minLength: { value: 2, message: 'minimum 2 letters' }
                                        }}
                                        render={({ field }) =>
                                            <div>
                                                <InputGroup
                                                    startElement={<FaUserAlt />}
                                                >
                                                    <Input
                                                        {...field}
                                                        border="1px solid"
                                                        borderColor="gray.300"
                                                        placeholder='last name'
                                                    />
                                                </InputGroup>
                                                {
                                                    errors.lastName &&
                                                    <span className='inline-block pt-[4px] pr-[8px] text-sm text-info-error'>
                                                        {errors.lastName.message}
                                                    </span>
                                                }
                                            </div>
                                        }
                                    />
                                </div>
                            </DialogBody>
                            <DialogFooter marginTop="8px">
                                <div className='flex justify-between  items-center w-full'>
                                    <Button
                                        type="button"
                                        variant='solid'
                                        className='bg-red-400'
                                        borderRadius='4px'
                                        disabled={isEditPending}
                                        height="32px"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            closeModal()
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant='solid'
                                        className='bg-background-secondary'
                                        borderRadius='4px'
                                        disabled={isEditPending}
                                        height="32px"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </DialogPositioner>
            </DialogRoot>
        </>
    )
}

export default EditUserModal