import { ActionDialog } from "@/Components/ActionDialog";
import { Button } from "@/Components/ui/button";
import { flashMessage } from "@/lib/utils";
import { Header, Publisher, Renderers } from "@/types";
import { Link, router } from "@inertiajs/react";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

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
            <div className="flex justify-end items-center gap-2">
                <Button variant={'default'} asChild size={'sm'}>
                    <Link href={route('admin.publishers.edit', item.id)}>
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
                    title="Delete publisher?"
                    description="Are you sure you want to delete this publisher?"
                    action={() =>
                        router.delete(
                            route("admin.publishers.destroy", item.id),
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
        ),
    };

    return {
        tableHeaders,
        renderers,
    };
};
