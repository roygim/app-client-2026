import * as Dialog from '@radix-ui/react-dialog'
import useUsers from '@/lib/hooks/useUsers'
import { User } from '@/lib/types'
import React from 'react'
import { toaster } from '@/components/ui/toaster';
import { InputGroup } from '@/components/ui/input-group';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
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
        <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) closeModal() }}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
                <Dialog.Content className="fixed top-20 left-1/2 -translate-x-1/2 w-[95%] sm:w-105 md:w-130 max-w-full bg-white rounded-lg shadow-xl z-50">
                    <form onSubmit={handleSubmit(editUserSubmit)}>
                        <div className='flex justify-between items-center pl-4 pr-2 pt-2'>
                            <Dialog.Title className='text-[18px] font-semibold'>
                                Edit User
                            </Dialog.Title>
                            <Dialog.Close asChild>
                                <button
                                    className='p-1.5 rounded hover:bg-gray-100 cursor-pointer'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        closeModal()
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M11.78 2.22a.75.75 0 0 0-1.06 0L7 5.94 3.28 2.22a.75.75 0 0 0-1.06 1.06L5.94 7l-3.72 3.72a.75.75 0 1 0 1.06 1.06L7 8.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L8.06 7l3.72-3.72a.75.75 0 0 0 0-1.06z"/></svg>
                                </button>
                            </Dialog.Close>
                        </div>
                        <div className='px-4 mt-3'>
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
                                            <InputGroup startElement={<FaUserAlt />}>
                                                <input
                                                    {...field}
                                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-background-secondary"
                                                    placeholder='first name'
                                                />
                                            </InputGroup>
                                            {errors.firstName &&
                                                <span className='inline-block pt-1 pr-2 text-sm text-info-error'>
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
                                            <InputGroup startElement={<FaUserAlt />}>
                                                <input
                                                    {...field}
                                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-background-secondary"
                                                    placeholder='last name'
                                                />
                                            </InputGroup>
                                            {errors.lastName &&
                                                <span className='inline-block pt-1 pr-2 text-sm text-info-error'>
                                                    {errors.lastName.message}
                                                </span>
                                            }
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                        <div className='flex justify-between items-center w-full px-4 py-3 mt-2'>
                            <button
                                type="button"
                                className='h-8 px-4 rounded bg-red-400 text-white text-sm font-medium disabled:opacity-50 cursor-pointer'
                                disabled={isEditPending}
                                onClick={(e) => {
                                    e.preventDefault()
                                    closeModal()
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className='h-8 px-4 rounded bg-background-secondary text-white text-sm font-medium disabled:opacity-50 cursor-pointer'
                                disabled={isEditPending}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default EditUserModal
