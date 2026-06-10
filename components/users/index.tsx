'use client'

import useUsers from '@/lib/hooks/useUsers'
import { User } from '@/lib/types'
import { cn } from '@/lib/utils/common.util'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { FiPlusCircle } from 'react-icons/fi'
import EditUserModal from '../authorization/edit-user-modal'
import ConfirmationModal from '../common/confirmation-modal'
import { toaster } from '@/components/ui/toaster';

function Users() {
    const router = useRouter();
    const { getUserQuery, deleteUserMutation } = useUsers()
    const [editUser, setEditUser] = useState<User | null>(null)
    const [deleteUserId, setDeleteUserId] = useState<number>(0)
    const [deleteQuestion, setDeleteQuestion] = useState<string>()
    const queryClient = useQueryClient()

    const { data: users, isLoading, isSuccess, isError, error } = getUserQuery()
    const { mutateAsync: deleteUserAsync, isPending: isDeletePending } = deleteUserMutation()

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const handleEditUserClick = (user: User) => {
        setEditUser(user)
        setIsEditOpen(true)
    }

    const handleCloseEditModal = async (refresh: boolean) => {
        if (refresh) {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
        setEditUser(null)
        setIsEditOpen(false)
    }

    const handleDeleteUserClick = (user: User) => {
        setDeleteUserId(user.id)
        setDeleteQuestion(`Continue delete ${user.firstname} ${user.lastname}?`)
        setIsDeleteOpen(true)
    }

    const handleDeleteUserCancel = () => {
        setDeleteUserId(0)
        setIsDeleteOpen(false)
    }

    const handleDeleteUserConfirm = async () => {
        if (deleteUserId === 0)
            return

        if (isDeletePending)
            return

        try {
            const res = await deleteUserAsync({ userId: deleteUserId })
            if (res && res.success) {
                toaster.create({
                    description: "User deleted successfully",
                    type: "success"
                })
                queryClient.invalidateQueries({ queryKey: ['users'] })
            }
        } catch (error: any) {
            console.log('error', error);
            const errStatus = error?.response?.status
            toaster.create({
                description: errStatus === 401 ? "error occurred - unauthorized" : "error occurred",
                type: "error"
            })
        } finally {
            setDeleteUserId(0)
            setIsDeleteOpen(false)
        }
    }

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                Error occurred - {(error as Error).message}
            </div>
        )
    }

    if (isSuccess && (!users || users.length == 0)) {
        return (
            <div>
                No results
            </div>
        )
    }

    if (!users)
        return

    return (
        <>
            <div>
                <h1 className={cn("text-3xl font-bold mb-6", "underline")}>
                    Users:
                </h1>
                <div className='overflow-x-auto'>
                    <table className="w-full">
                        <thead>
                            <tr className="text-center font-semibold uppercase tracking-widest bg-background-secondary">
                                <th className='px-5 py-3 '>
                                    id
                                </th>
                                <th className='px-5 py-3'>
                                    name
                                </th>
                                <th className='px-5 py-3'>
                                    email
                                </th>
                                <th className='px-5 py-3'>
                                </th>
                                <th className='px-5 py-3'>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => (
                                    <tr key={index} className='text-center'>
                                        <td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
                                            {user.id}
                                        </td>
                                        <td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
                                            {(user.firstname && user.lastname)? `${user.firstname} ${user.lastname}`: ''}
                                        </td>
                                        <td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
                                            {user.email}
                                        </td>
                                        <td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
                                            <button
                                                className='cursor-pointer'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleEditUserClick(user)
                                                }}
                                            >
                                                <FaRegEdit className='inline' />
                                            </button>
                                        </td>
                                        <td className='border-b border-gray-200 bg-white px-5 py-5 text-sm'>
                                            <button
                                                className='cursor-pointer'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleDeleteUserClick(user)
                                                }}
                                            >
                                                <FaRegTrashAlt className='inline' />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='pt-3 pl-2'>
                    <button
                        className='cursor-pointer'
                        onClick={(e) => router.push('/register')}
                    >
                        <FiPlusCircle size={32} className='text-background-tertiary' />
                    </button>
                </div>
            </div>
            <ConfirmationModal
                title='Delete User'
                question={deleteQuestion}
                btnConfirmTxt='Delete'
                isOpen={isDeleteOpen}
                handleCancel={handleDeleteUserCancel}
                handleConfirm={handleDeleteUserConfirm}
            />
            {editUser && <EditUserModal isOpen={isEditOpen} handleCloseModal={handleCloseEditModal} user={editUser} />}
        </>
    )
}

export default Users