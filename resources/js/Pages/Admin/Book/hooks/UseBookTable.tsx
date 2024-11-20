import { ActionDialog } from "@/Components/ActionDialog";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { flashMessage, formatCurrency } from "@/lib/utils";
import { Book, Header } from "@/types";
import { Link, router } from "@inertiajs/react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

export const useBookTable = () => {
    const headers: Header[] = [
        {
            key: "title",
            label: "Title",
            sortable: true,
        },
        {
            key: "author",
            label: "Author",
            sortable: true,
        },
        {
            key: "cover",
            label: "Cover",
            sortable: true,
            cell: (item: Book) => (
                <Avatar>
                    <AvatarImage src={item.cover} className="object-cover" />
                    <AvatarFallback>
                        {item.title.substring(0, 1)}
                    </AvatarFallback>
                </Avatar>
            ),
        },
        {
            key: "stock",
            label: "Stock",
            sortable: false,
        },
        {
            key: "year",
            label: "Year",
            sortable: true,
        },
        {
            key: "isbn",
            label: "ISBN",
            sortable: true,
        },
        {
            key: "language",
            label: "Language",
            sortable: true,
        },
        {
            key: "pages",
            label: "Pages",
            sortable: true,
        },
        {
            key: "status",
            label: "Status",
            sortable: false,
        },
        {
            key: "price",
            label: "Price",
            sortable: true,
            cell: (item: Book) => <span>{formatCurrency(item.price)}</span>,
        },
        {
            key: "action",
            label: "Action",
            sortable: false,
            align: "end",
            cell: (item: Book) => (
                <div className="flex justify-end items-center gap-2">
                    <Button variant={"default"} asChild size={"sm"}>
                        <Link href={route("admin.books.edit", item.slug)}>
                            <Pencil />
                        </Link>
                    </Button>
                    <ActionDialog
                        trigger={
                            <Button variant={"destructive"} size={"sm"}>
                                <Trash />
                            </Button>
                        }
                        title="Delete book?"
                        description="Are you sure you want to delete this book?"
                        action={() =>
                            router.delete(
                                route("admin.books.destroy", item.slug),
                                {
                                    preserveScroll: true,
                                    preserveState: true,
                                    onSuccess: (success) => {
                                        const flash = flashMessage(success);
                                        if (flash)
                                            toast[flash.type](flash.message);
                                    },
                                }
                            )
                        }
                    />
                </div>
            ),
        },
    ];

    return {
        headers,
    };
};
