"use client"

import * as Toast from '@radix-ui/react-toast'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/common.util'
import { Spinner } from './spinner'

type ToastType = 'success' | 'error' | 'loading' | string

interface ToastItem {
    id: string
    title?: string
    description?: string
    type?: ToastType
}

let addToast: ((item: ToastItem) => void) | null = null

export const toaster = {
    create(opts: Omit<ToastItem, 'id'>) {
        addToast?.({ ...opts, id: crypto.randomUUID() })
    }
}

export function Toaster() {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    useEffect(() => {
        addToast = (item) => setToasts(prev => [...prev, item])
        return () => { addToast = null }
    }, [])

    return (
        <Toast.Provider swipeDirection="right">
            {toasts.map(toast => (
                <Toast.Root
                    key={toast.id}
                    className={cn(
                        'flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg bg-white w-72',
                        'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-2',
                        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
                    )}
                    onOpenChange={(open) => {
                        if (!open) setToasts(prev => prev.filter(t => t.id !== toast.id))
                    }}
                >
                    <span className={cn(
                        'mt-0.5 shrink-0',
                        toast.type === 'success' && 'text-info-success',
                        toast.type === 'error' && 'text-info-error',
                        toast.type === 'loading' && 'text-gray-500'
                    )}>
                        {toast.type === 'loading' ? (
                            <Spinner />
                        ) : toast.type === 'success' ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm3.78 4.61L6.5 9.89 4.22 7.61a.75.75 0 0 0-1.06 1.06l2.81 2.81a.75.75 0 0 0 1.06 0l5.81-5.81a.75.75 0 0 0-1.06-1.06z"/></svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 4a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-4.5A.75.75 0 0 0 8 4zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>
                        )}
                    </span>
                    <div className="flex-1 min-w-0">
                        {toast.title && (
                            <Toast.Title className="text-sm font-semibold text-gray-900">
                                {toast.title}
                            </Toast.Title>
                        )}
                        {toast.description && (
                            <Toast.Description className="text-sm text-gray-600">
                                {toast.description}
                            </Toast.Description>
                        )}
                    </div>
                    <Toast.Close className="shrink-0 text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M11.78 2.22a.75.75 0 0 0-1.06 0L7 5.94 3.28 2.22a.75.75 0 0 0-1.06 1.06L5.94 7l-3.72 3.72a.75.75 0 1 0 1.06 1.06L7 8.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L8.06 7l3.72-3.72a.75.75 0 0 0 0-1.06z"/></svg>
                    </Toast.Close>
                </Toast.Root>
            ))}
            <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 outline-none" />
        </Toast.Provider>
    )
}
