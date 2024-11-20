import { ActionDialog } from "@/Components/ActionDialog";
import { Button } from "@/Components/ui/button";
import { BORROWING_STATUS, flashMessage } from "@/lib/utils";
import { Borrowing, Header, Renderers } from "@/types";
import { Link, router } from "@inertiajs/react";
import { CreditCard, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

export const useBorrowingTable = () => {
    const headers: Header[] = [
        {
            key: "invoice",
            label: "Invoice",
            sortable: false,
        },
        {
            key: "user_name",
            label: "Name",
            sortable: true,
            cell: (item: Borrowing) => (
                <span className="text-primary">
                    {item.user_name}
                </span>
            )
        },
        {
            key: "book_title",
            label: "Book",
            sortable: false,
            cell: (item: Borrowing) => (
                <span className="text-primary">
                    {item.book_title}
                </span>
            )
        },
        {
            key: "borrowed_at",
            label: "Borrowed At",
            sortable: true,
        },
        {
            key: "due_at",
            label: "Due At",
            sortable: true,
        },
        {
            key: "created_at",
            label: "Created At",
            sortable: true,
        },
        {
            key: "action",
            label: "Action",
            sortable: false,
            align: "end",
            cell: (item: Borrowing) => (
                <div className="flex justify-end items-center gap-2">
                    {item.status === BORROWING_STATUS.BORROWED && (
                        <Button
                            variant={"default"}
                            asChild
                            size={"sm"}
                            className="bg-blue-600 hover:bg-blue-500"
                        >
                            <Link href={route("admin.returns.show", item.invoice)}>
                                <CreditCard />
                            </Link>
                        </Button>
                    )}
                    <Button variant={"default"} asChild size={"sm"}>
                        <Link href={route("admin.borrowings.edit", item.invoice)}>
                            <Pencil />
                        </Link>
                    </Button>
                    <ActionDialog
                        trigger={
                            <Button variant={"destructive"} size={"sm"}>
                                <Trash />
                            </Button>
                        }
                        title="Delete borrowing?"
                        description="Are you sure you want to delete this borrowing?"
                        action={() =>
                            router.delete(
                                route("admin.borrowings.destroy", item.invoice),
                                {
                                    preserveScroll: true,
                                    preserveState: true,
                                    onSuccess: (success) => {
                                        const flash = flashMessage(success);
                                        if (flash) toast[flash.type](flash.message);
                                    },
                                }
                            )
                        }
                    />
                </div>
            )
        },
    ] as const;

    return {
        headers,
    };
};
