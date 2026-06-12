'use client'

import { toaster } from '@/components/ui/toaster';
import { InputGroup } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import useUsers from '@/lib/hooks/useUsers';
import { ResponseError, UserRole } from '@/lib/types';
import { useUserStore } from '@/lib/zustand/user';
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

            const res = await loginUserAsync({ email, password })

            if (res && res.user) {
                toaster.create({
                    description: "User login successfully",
                    type: "success"
                })
                saveUser(res.user)
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
                    case ResponseError.UserNotFound:
                        setError("User not found")
                        break;
                    case ResponseError.InvalidPassword:
                        setError("Invalid password")
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
        <div className={`w-full sm:max-w-117 bg-surface border border-surface-border rounded-lg p-6 shadow-lg${error ? ' pb-0' : ''}`}>
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
                                <InputGroup startElement={<MdEmail />}>
                                    <input
                                        {...field}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-background-secondary"
                                        placeholder='email'
                                    />
                                </InputGroup>
                                {errors.email &&
                                    <span className='inline-block pt-1 pr-2 text-sm text-info-error'>
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
                                    <input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-background-secondary"
                                        placeholder='password'
                                    />
                                </InputGroup>
                                {errors.password &&
                                    <span className='inline-block pt-1 pr-2 text-sm text-info-error'>
                                        {errors.password.message}
                                    </span>
                                }
                            </div>
                        }
                    />
                </div>
                <button
                    type='submit'
                    className='w-full mt-8 h-9 rounded bg-background-secondary text-white font-medium flex items-center justify-center disabled:opacity-50 cursor-pointer'
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner className="mr-2" /> : 'Login'}
                </button>
            </form>
            {error &&
                <div className='flex justify-center py-3'>
                    <span className='text-sm text-info-error'>
                        {error}
                    </span>
                </div>
            }
        </div>
    )
}

export default LoginUser
