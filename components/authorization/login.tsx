'use client'

import { toaster } from '@/components/ui/toaster';
import useUsers from '@/lib/hooks/useUsers';
import { ResponseError, UserRole } from '@/lib/types';
import { delay } from '@/lib/utils/common.util';
import { useUserStore } from '@/lib/zustand/user/user.store';
import { Box, InputGroup, Input, Button, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FaRegEye } from 'react-icons/fa'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

interface LoginInputs {
    email: string
    password: string
}

function LoginUser() {
    const router = useRouter()
    const { loginUserMutation } = useUsers()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const saveUser = useUserStore((state) => state.saveUser)

    const { mutateAsync: loginUserAsync } = loginUserMutation()

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<LoginInputs>({
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const loginUserSubmit: SubmitHandler<LoginInputs> = async (data) => {
        if (isLoading)
            return

        const { email, password } = data

        try {
            setError('')
            setIsLoading(true)

            await delay()

            toaster.create({
                description: "User login successfully",
                type: "success"
            })

            saveUser({
                id: 12345,
                firstName: 'Roei',
                lastName: 'Grumet',
                email: 'roeig@shva.co.il',
                role: UserRole.Admin
            })

            router.push(`/`)

            // const res = await loginUserAsync({ email, password })

            // if (res && res.success && res.user) {
            //     toaster.create({
            //         description: "User login successfully",
            //         type: "success"
            //     })
            //     saveUser(res.user)
            //     router.push(`/`)
            // } else {
            //     setError("error occurred")
            // }
        } catch (error: any) {
            console.log('error', error);
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
            <form onSubmit={handleSubmit(loginUserSubmit)}>
                <div className='space-y-4'>
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
                        name="password"
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
                                            className='cursor-pointer'
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
                                    errors.password &&
                                    <span className='inline-block pt-[4px] pr-[8px] text-sm text-info-error'>
                                        {errors.password.message}
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
                    {isLoading ? <Spinner size="sm" mr={2} /> : 'Login'}
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

export default LoginUser