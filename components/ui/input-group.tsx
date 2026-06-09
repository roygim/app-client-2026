import React from 'react'
import { cn } from '@/lib/utils/common.util'

interface InputGroupProps {
    startElement?: React.ReactNode
    endElement?: React.ReactNode
    children: React.ReactNode
    className?: string
}

export function InputGroup({ startElement, endElement, children, className }: InputGroupProps) {
    const child = React.Children.only(children) as React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>

    const clonedChild = React.cloneElement(child, {
        className: cn(
            child.props.className,
            startElement ? 'pl-8' : '',
            endElement ? 'pr-8' : '',
        ),
    })

    return (
        <div className={cn('relative', className)}>
            {startElement && (
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    {startElement}
                </span>
            )}
            {clonedChild}
            {endElement && (
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500">
                    {endElement}
                </span>
            )}
        </div>
    )
}
