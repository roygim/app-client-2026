'use client'

import { toaster } from '@/components/ui/toaster';
import { InputGroup } from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import useUsers from '@/lib/hooks/useUsers';
import { ResponseError } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FaRegEye, FaUserAlt } from 'react-icons/fa'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

interface AddInputs {
    firstname: string
    lastname: string
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
            firstname: '',
            lastname: '',
            email: '',
            newPassword: '',
            confirmNewPassword: '',
        }
    })

    let pwd = watch("newPassword")

    const addUserSubmit: SubmitHandler<AddInputs> = async (data) => {
        if (isLoading)
            return

        const { firstname, lastname, email, newPassword } = data

        try {
            setError('')
            setIsLoading(true)
            
            const res = await addUserAsync({ firstname, lastname, email, password: newPassword })

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
        <div className={`w-full sm:max-w-117 bg-surface border border-surface-border rounded-lg p-6 shadow-lg${error ? ' pb-0' : ''}`}>
            <form onSubmit={handleSubmit(addUserSubmit)}>
                <div className='space-y-4'>
                    <Controller
                        name="firstname"
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
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-background-secondary placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                        placeholder='first name'
                                    />
                                </InputGroup>
                                {errors.firstname &&
                                    <span className='inline-block pt-1 pr-2 text-sm text-info-error'>
                                        {errors.firstname.message}
                                    </span>
                                }
                            </div>
                        }
                    />
                    <Controller
                        name="lastname"
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
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-background-secondary placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                        placeholder='last name'
                                    />
                                </InputGroup>
                                {errors.lastname &&
                                    <span className='inline-block pt-1 pr-2 text-sm text-info-error'>
                                        {errors.lastname.message}
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
                                <InputGroup startElement={<MdEmail />}>
                                    <input
                                        {...field}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-background-secondary placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
                                    <input
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-background-secondary placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                        placeholder='password'
                                    />
                                </InputGroup>
                                {errors.newPassword &&
                                    <span className='inline-block pt-1 pr-2 text-sm text-info-error'>
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
                                <InputGroup startElement={<RiLockPasswordFill />}>
                                    <input
                                        {...field}
                                        type='password'
                                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-background-secondary placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                        placeholder='confirm password'
                                    />
                                </InputGroup>
                                {errors.confirmNewPassword &&
                                    <span className='inline-block pt-1 pr-2 text-sm text-info-error'>
                                        {errors.confirmNewPassword.message}
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
                    {isLoading ? <Spinner className="mr-2" /> : 'Add User'}
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

export default AddUser
