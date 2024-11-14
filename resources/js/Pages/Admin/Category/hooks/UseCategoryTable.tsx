import { Category, Header, Renderers } from "@/types";
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

export const useCategoryTable = () => {
    const tableHeaders: Header[] = [
        {
            key: "name",
            label: "Name",
            sortable: true,
        },
        {
            key: "slug",
            label: "Slug",
            sortable: true,
        },
        {
            key: "cover",
            label: "Cover",
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

    const renderers: Renderers<Category> = {
        cover: (item: Category) => (
            <Avatar>
                <AvatarImage src={item.cover} className="object-cover" />
                <AvatarFallback>{item.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
        ),
        action: (item: Category) => (
            <div className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem asChild>
                            <Link
                                href={route("admin.categories.edit", item.slug)}
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
                                title="Delete Categories?"
                                description="Are you sure you want to delete this categories?"
                                action={() =>
                                    router.delete(
                                        route(
                                            "admin.categories.destroy",
                                            item.slug
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
