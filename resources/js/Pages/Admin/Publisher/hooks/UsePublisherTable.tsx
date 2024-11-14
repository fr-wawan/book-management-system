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
import { flashMessage } from "@/lib/utils";
import { toast } from "sonner";
import { Publisher, Header, Renderers } from "@/types";

export const UsePublisherTable = () => {
    const tableHeaders: Header[] = [
        {
            key: "name",
            label: "Name",
            sortable: true,
        },
        {
            key: "email",
            label: "Email",
            sortable: true,
        },
        {
            key: "address",
            label: "Address",
            sortable: false,
        },
        {
            key: "phone_number",
            label: "Phone Number",
            sortable: false,
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
        },
    ];

    const renderers: Renderers<Publisher> = {
        action: (item: Publisher) => (
            <div className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link
                                href={route("admin.publishers.edit", item.id)}
                            >
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
                                title="Delete Publishers?"
                                description="Are you sure you want to delete this publishers?"
                                action={() =>
                                    router.delete(
                                        route(
                                            "admin.publishers.destroy",
                                            item.id
                                        ),
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
