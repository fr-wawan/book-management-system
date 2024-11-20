import { usePage } from "@inertiajs/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FlashMessage {
    message: string;
    type: "error" | "success" | "info";
}

export function flashMessage(params: ReturnType<typeof usePage>): FlashMessage {
    return params.props.flash_message as FlashMessage;
}

export const BORROWING_STATUS = {
    BORROWED: "Borrowed",
    RETURNED: "Returned",
}

export const BOOK_RETURN_STATUS = {
    COMPLETED: "completed",
    PENDING: "pending",
    PENALTY: "penalty",
}

export const conditionList = [
    {
        label: "Good",
        value: "good"
    },
    {
        label: "Damaged",
        value: "damage"
    },
    {
        label: "Lost",
        value: "lost"
    }
]

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(amount);
}
