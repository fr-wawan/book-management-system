import { ActionDialog } from "@/Components/ActionDialog";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { flashMessage } from "@/lib/utils";
import { Category, Header, Renderers } from "@/types";
import { Link, router } from "@inertiajs/react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

export const useCategoryTable = () => {
    const headers: Header[] = [
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
            cell: (item: Category) => (
                <Avatar>
                    <AvatarImage src={item.cover} className="object-cover" />
                    <AvatarFallback>{item.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
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
            cell: (item: Category) => (
                <div className="flex justify-end items-center gap-2">
                    <Button variant={'default'} asChild size={'sm'}>
                        <Link href={route('admin.categories.edit', item.slug)}>
                            <Pencil />
                        </Link>
                    </Button>
                    <ActionDialog
                        trigger={
                            <Button
                                variant={'destructive'}
                                size={'sm'}
                            >
                                <Trash />
                            </Button>
                        }
                        title="Delete category?"
                        description="Are you sure you want to delete this category?"
                        action={() =>
                            router.delete(
                                route("admin.categories.destroy", item.slug),
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
                            )}
                    />
                </div>
            )
        },
    ];

    return {
        headers,
    };
};
