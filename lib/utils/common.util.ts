import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function clone<T>(a: T): T {
    return JSON.parse(JSON.stringify(a));
}

export function cn(...input: ClassValue[]): string {
    return twMerge(clsx(...input));
}

export async function delay(duration: number = 3000): Promise<null> {
    return new Promise(resolve =>
        setTimeout(resolve, duration)
    );
}

 