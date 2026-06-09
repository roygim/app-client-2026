'use client'

import { toaster } from '@/components/ui/toaster';
import useUsers from '@/lib/hooks/useUsers';
import { ResponseError } from '@/lib/types';
import { delay } from '@/lib/utils/common.util';
import { Box, InputGroup, Input, Button, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FaRegEye, FaUserAlt } from 'react-icons/fa'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

interface AddInputs {
    firstName: string
    lastName: string
    email: string
    newPassword: string
    confirmNewPassword: string
}

function AddUser() {
    const router = useRouter()
    const { addUserMutation } = useUsers()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const { mutateAsync: addUserAsync } = addUserMutation()

    const {
        handleSubmit,
        control,
        watch,
        formState: { errors }
    } = useForm<AddInputs>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            newPassword: '',
            confirmNewPassword: '',
        }
    })

    let pwd = watch("newPassword")

    const addUserSubmit: SubmitHandler<AddInputs> = async (data) => {
        if (isLoading)
            return

        const { firstName, lastName, email, newPassword } = data

        try {
            setError('')
            setIsLoading(true)
            // await delay()
            const res = await addUserAsync({ firstName, lastName, email, password: newPassword })

            if (res && res.success) {
                toaster.create({
                    description: "User added successfully",
                    type: "success"
                })
                router.push(`/`)
            } else {
                setError("error occurred")
            }
        } catch (error: any) {
            const errType = error?.response?.data?.error
            if (errType) {
                switch (errType) {
                    case ResponseError.InValidRequest:
                        setError("error occurred")
                        break;
                    default:
                        setError("error occurred")
                        break;
                }
            } else {
                setError("error occurred")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box bg="white" borderWidth='1px' borderRadius='lg' padding='24px' paddingBottom={error ? '0' : '24px'} shadow='lg' className='w-full sm:max-w-[468px]'>
            <form onSubmit={handleSubmit(addUserSubmit)}>
                <div className='space-y-4'>
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
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'required field',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'email not valid'
                            }
                        }}
                        render={({ field }) =>
                            <div>
                                <InputGroup
                                    startElement={<MdEmail />}
                                >
                                    <Input
                                        {...field}
                                        border="1px solid"
                                        borderColor="gray.300"
                                        placeholder='email'
                                    />
                                </InputGroup>
                                {
                                    errors.email &&
                                    <span className='inline-block pt-[4px] pr-[8px] text-sm text-info-error'>
                                        {errors.email.message}
                                    </span>
                                }
                            </div>
                        }
                    />
                    <Controller
                        name="newPassword"
                        control={control}
                        rules={{
                            required: 'required field',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/,
                                message: 'password not valid. 8-12 letters, At least one number, one uppercase letter and one special character'
                            }
                        }}
                        render={({ field }) =>
                            <div>
                                <InputGroup
                                    startElement={<RiLockPasswordFill />}
                                    endElement={
                                        <button
                                            type='button'
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                setShowPassword(true)
                                            }}
                                            onMouseUp={(e) => {
                                                e.preventDefault()
                                                setShowPassword(false)
                                            }}
                                        >
                                            <FaRegEye />
                                        </button>
                                    }
                                >
                                    <Input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        border="1px solid"
                                        borderColor="gray.300"
                                        placeholder='password'
                                    />
                                </InputGroup>
                                {
                                    errors.newPassword &&
                                    <span className='inline-block pt-[4px] pr-[8px] text-sm text-info-error'>
                                        {errors.newPassword.message}
                                    </span>
                                }
                            </div>
                        }
                    />
                    <Controller
                        name="confirmNewPassword"
                        control={control}
                        rules={{
                            required: 'required field',
                            validate: value => value.trim() === pwd.trim() || "confirm password not valid"
                        }}
                        render={({ field }) =>
                            <div>
                                <InputGroup
                                    startElement={<RiLockPasswordFill />}
                                >
                                    <Input
                                        {...field}
                                        type='password'
                                        border="1px solid"
                                        borderColor="gray.300"
                                        placeholder='confirm password'
                                    />
                                </InputGroup>
                                {
                                    errors.confirmNewPassword &&
                                    <span className='inline-block pt-[4px] pr-[8px] text-sm text-info-error'>
                                        {errors.confirmNewPassword.message}
                                    </span>
                                }
                            </div>
                        }
                    />
                </div>
                <Button
                    type='submit'
                    variant='solid'
                    width='full'
                    borderRadius='4px'
                    className='mt-8 bg-background-secondary'
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner size="sm" mr={2} /> : 'Add User'}
                </Button>
            </form>
            {
                error &&
                <div className='flex  justify-center py-3'>
                    <span className='text-sm text-info-error'>
                        {error}
                    </span>
                </div>
            }
        </Box>
    )
}

export default AddUser