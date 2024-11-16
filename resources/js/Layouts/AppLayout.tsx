import { Toaster } from "sonner";
import { Book, Building, Home, LayoutGrid, Settings } from "lucide-react";
import { PropsWithChildren } from "react";

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
                href: "/categories",
            },
            {
                title: "Publisher",
                icon: Building,
                href: "/publishers",
            },
            {
                title: "Book",
                icon: Book,
                href: "/books",
            },
        ],
    },
];

export default function AppLayout({ children }: PropsWithChildren) {
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
