export interface Category {
    id: number;
    name: string;
    slug: string;
    cover: string;
    description: string;
}

export interface Publisher {
    id: number;
    name: string;
    email: string;
    address: string;
    phone_number: string;
    created_at: string;
}

export interface Book {
    id: number;
    slug: string;
    title: string;
    author: string;
    year: number;
    language: string;
    pages: number;
    isbn: string;
    stock: number;
    status: string;
    category_id: number;
    publisher_id: number;
    summary: string;
    cover: string;
    price: number;
    publisher: Publisher;
    created_at: string;
}

export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface State {
    page: number;
    search: string;
    load: number;
    field: string;
    direction: string;
}

export interface Menu {
    title: string;
    items: {
        title: string;
        icon: React.ElementType;
        href: string;
    }[];
}

enum BorrowingStatus {
    RETURNED = "Returned",
    BORROWED = "Borrowed",
}

export interface Borrowing {
    id: number;
    invoice: string;
    user_id: number;
    book_id: number;
    user_name: string;
    book_title: string;
    borrowed_at: string;
    due_at: string;
    returned_at: string;
    status: BorrowingStatus;
    created_at: string;
    user: User;
    book: Book;
    bookReturn: BookReturn;
}

export interface PageSettings {
    title: string;
    subtitle: string;
    method: string;
    action: string;
}

export interface MetaPagination {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string;
        label: string;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export type Renderers<T> = {
    [K in keyof T]?: (item: T) => React.ReactNode;
} & {
    action: (item: T) => React.ReactNode;
};
import React from "react";

export interface Header<T = any> {
    key: string;
    label: string;
    sortable: boolean;
    align?: "left" | "center" | "end";
    cell?: (item: T) => React.ReactNode;
}

export interface PenaltySetting {
    id: number;
    late: number;
    damage: number;
    lost: number;
}

export interface Penalty {
    id: number;
    condition: string;
    condition_amount: number;
    late_amount: number;
    total_amount: number;
    status: string;
    notes: string;
}

type BookReturnStatus = "completed" | "penalty" | "pending";

export interface BookReturn {
    id: number;
    borrowing_id: number;
    borrowing: Borrowing;
    returned_at: string;
    penalty: Penalty;
    status: BookReturnStatus;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
