import { Book, Header, Renderers } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Link, router } from "@inertiajs/react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { EllipsisVertical } from "lucide-react";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { ActionDialog } from "@/Components/ActionDialog";
import { flashMessage, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export const useBookTable = () => {
    const tableHeaders: Header[] = [
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
        },
        {
            key: "action",
            label: "Action",
            sortable: false,
            align: "end",
        },
    ];

    const renderers: Renderers<Book> = {
        price: (item: Book) => <span>{formatCurrency(item.price)}</span>,
        cover: (item: Book) => (
            <Avatar>
                <AvatarImage src={item.cover} className="object-cover" />
                <AvatarFallback>{item.title.substring(0, 1)}</AvatarFallback>
            </Avatar>
        ),
        action: (item: Book) => (
            <div className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link href={route("admin.books.edit", item.slug)}>
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuGroup>
                            <ActionDialog
                                trigger={
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        Delete
                                    </DropdownMenuItem>
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
                                                const flash =
                                                    flashMessage(success);
                                                if (flash)
                                                    toast[flash.type](
                                                        flash.message
                                                    );
                                            },
                                        }
                                    )
                                }
                            />
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    };

    return {
        tableHeaders,
        renderers,
    };
};
