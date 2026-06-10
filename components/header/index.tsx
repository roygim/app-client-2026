'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoIcon } from '@/assets/logo';
import logoIconSvg from "@/public/images/logo-icon.svg";
import Image from 'next/image';
import useUsers from '@/lib/hooks/useUsers';
import { useUserStore } from '@/lib/zustand/user'; 

function Header() {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const { loadUserMutation, logoutUserMutation } = useUsers()

    const user = useUserStore((state) => state.user)
    const saveUser = useUserStore((state) => state.saveUser)
    const isUserLogin = useUserStore((state) => state.isLogin)
    const removeUser = useUserStore((state) => state.removeUser)

    const {
        mutateAsync: loadUserAsync
    } = loadUserMutation()

    const {
        mutateAsync: logoutUserAsync
    } = logoutUserMutation()

    useEffect(() => {
        if (!mounted && !isUserLogin) {
            loadUser()
        }
        setMounted(true)
    }, [isUserLogin])

    const loadUser = async () => {
        try {
            const res = await loadUserAsync()
            if (res) {
                saveUser(res)
            }
        } catch (error) {
        }
    }

    const logoutUser = async () => {
        try {
            const res = await logoutUserAsync()

            if (res && res.success) {
                removeUser()
                router.push(`/`)
            }
        } catch (error) {
            alert('אירעה שגיאה')
        }
    }

    return (
        <nav className='flex justify-between items-center py-6 px-2 xl:px-0'>
            <Link href='/'>
                {/* <LogoIcon /> */}
                <div className='flex items-center gap-2'>
                    <Image
                        src={logoIconSvg}
                        alt="Follow us on Twitter"
                        width={24}
                        height={24}
                    />
                    <span className='text-xl font-semibold capitalize'>
                        my app
                    </span>
                </div>
            </Link>
            {
                !isUserLogin ?
                    <div className='flex items-center gap-2'>
                        <Link href='/login' className='text-sm font-semibold'>
                            Sign In
                        </Link>
                        <span className='pb-1'>
                            |
                        </span>
                        <Link href='/register' className='text-sm font-semibold'>
                            Sign Up
                        </Link>
                    </div>
                    :
                    <div className='flex items-center gap-2'>
                        <div className='text-sm font-semibold'>
                            Hi, <span className='capitalize'>{user?.firstname}</span>
                        </div>
                        <button
                            className='text-sm font-semibold cursor-pointer hover:underline'
                            onClick={logoutUser}
                        >
                            Logout
                            <span style={{ textDecoration: 'none' }}>&rarr;</span>
                        </button>
                    </div>
            }
        </nav>
    )
}

export default Header