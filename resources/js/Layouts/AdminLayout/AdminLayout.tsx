import { Book, Building, Home, LayoutGrid, Settings } from "lucide-react";
import { PropsWithChildren } from "react";

import { Toaster } from "@/Components/ui/sonner";
import { usePage } from "@inertiajs/react";
import Sidebar from "./Partials/Sidebar";
import SidebarResponsive from "./Partials/SidebarResponsive";

export const description =
    "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

const menus = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Dashboard",
                icon: Home,
                href: "/dashboard",
            },
        ],
    },
    {
        title: "Master",
        items: [
            {
                title: "Category",
                icon: LayoutGrid,
                href: "/admin/categories",
            },
            {
                title: "Publisher",
                icon: Building,
                href: "/admin/publishers",
            },
            {
                title: "Book",
                icon: Book,
                href: "/admin/books",
            },
            {
                title: "Penalty Settings",
                icon: Settings,
                href: "/admin/penalty-settings",
            },
        ],
    },
];

export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Toaster position="top-center" richColors />
            <div className="md:grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <Sidebar menus={menus} />
                <div className="flex flex-col">
                    <SidebarResponsive menus={menus} />
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
