import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { BOOK_RETURN_STATUS, cn, formatCurrency } from "@/lib/utils";
import { BookReturn, Header } from "@/types";
import { Link } from "@inertiajs/react";
import { EditIcon, EyeIcon } from "lucide-react";

export function useReturnTable() {
    const headers: Header[] = [
        {
            key: "invoice",
            label: "Invoice",
            sortable: false,
            cell: (item: BookReturn) => (
                <span>{item.borrowing.invoice}</span>
            )
        },
        {
            key: "user.name",
            label: "Name",
            sortable: true,
            cell: (item: BookReturn) => (
                <span className="text-primary">
                    {item.borrowing.user.name}
                </span>
            )
        },
        {
            key: "book.title",
            label: "Book",
            sortable: true,
            cell: (item: BookReturn) => (
                <span className="text-primary">
                    {item.borrowing.book.title}
                </span>
            )
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            cell: (item: BookReturn) => (
                <Badge
                    variant={item.status === BOOK_RETURN_STATUS.PENDING ? "default" : "destructive"}
                    className={cn("capitalize", item.status === BOOK_RETURN_STATUS.COMPLETED && "bg-green-600 hover:bg-green-700")}
                >
                    {item.status}
                </Badge>
            )
        },
        {
            key: "borrowed_at",
            label: "Borrowed At",
            sortable: true,
            cell: (item: BookReturn) => (
                <span>
                    {item.borrowing.borrowed_at}
                </span>
            )
        },
        {
            key: "due_at",
            label: "Due At",
            sortable: true,
            cell: (item: BookReturn) => (
                <span>
                    {item.borrowing.due_at}
                </span>
            )
        },
        {
            key: "returned_at",
            label: "Returned At",
            sortable: true,
        },
        {
            key: "penalty_price",
            label: "Penalty",
            sortable: false,
            cell: (item: BookReturn) => (
                <span
                    className={cn("font-semibold underline", item.penalty?.total_amount ? "text-red-500" : "text-green-600")}
                >
                    {formatCurrency(item.penalty?.total_amount ?? 0)}
                </span>
            )
        },
        {
            key: "penalty_condition",
            label: "Condition",
            sortable: false,
            cell: (item: BookReturn) => (
                <Badge
                    variant={item.penalty?.condition ? "destructive" : "default"}
                    className="capitalize"
                >
                    {item.penalty?.condition ?? "Good"}
                </Badge>
            )
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
            cell: (item: BookReturn) => (
                item.status === BOOK_RETURN_STATUS.PENDING ? (
                    <span>wip</span>
                ) : (
                    <Button asChild size={'sm'} >
                        <Link href={route('admin.returns.show', item.borrowing.invoice)}>
                            <EyeIcon />
                        </Link>
                    </Button>
                )
            )
        },
    ];

    return {
        headers,
    };
}
