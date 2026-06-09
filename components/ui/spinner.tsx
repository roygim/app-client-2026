export function Spinner({ className }: { className?: string }) {
    return (
        <div
            className={`w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin${className ? ` ${className}` : ''}`}
        />
    )
}
