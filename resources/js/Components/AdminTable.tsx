import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { UseFilter } from "@/hooks/UseFilter";
import { cn } from "@/lib/utils";
import { Header, MetaPagination, State } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ArrowDownUp, Undo2 } from "lucide-react";
import React, { useState } from "react";

interface TableProps<T> {
    headers: Header[];
    data: T[];
    renderers: { [key: string]: (item: T) => React.ReactNode };
    actions?: { [key: number]: (item: T) => React.ReactNode };
    params: State;
    meta: MetaPagination;
}

const AdminTable = <T extends { id: number;[key: string]: any }>({
    headers,
    data,
    renderers,
    actions,
    meta,
    ...props
}: TableProps<T>) => {
    const { url } = usePage();
    const [params, setParams] = useState(props.params);

    const onSortable = (field: string) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === "asc" ? "desc" : "asc",
        });
    };

    UseFilter({
        route: url,
        values: params,
        only: [],
    });

    return (
        <div>
            <div className="flex w-full flex-col gap-4 sm:flex-row items-center">
                <Input
                    className="w-full sm:w-1/4"
                    placeholder="Search..."
                    value={params.search}
                    onChange={(e) =>
                        setParams((prev) => ({
                            ...prev,
                            search: e.target.value,
                        }))
                    }
                />
                <Select
                    value={String(params.load)}
                    onValueChange={(e) =>
                        setParams({ ...params, load: Number(e) })
                    }
                >
                    <SelectTrigger className="w-full sm:w-24">
                        <SelectValue placeholder="Load" />
                    </SelectTrigger>
                    <SelectContent>
                        {[3, 10, 25, 50, 75, 100].map((number) => (
                            <SelectItem key={number} value={String(number)}>
                                {number}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    variant={"destructive"}
                    onClick={() => setParams(props.params)}
                >
                    <Undo2 className="mr-2 h-4 w-4" />
                    Clear
                </Button>
            </div>
            <div className="my-8 flow-root">
                <div className="">
                    <div className="overflow-x-auto w-full">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    {headers.map((header) => (
                                        <th
                                            key={header.key}
                                            className={cn(
                                                header.align === "end" &&
                                                "text-end",
                                                header.align === "center" &&
                                                "text-center",
                                                (header.align === "left" ||
                                                    !header.align) &&
                                                "text-left",
                                                "px-2 py-3.5 text-sm font-semibold text-muted-foreground "
                                            )}
                                            scope="col"
                                        >
                                            <Button
                                                variant="ghost"
                                                className="group inline-flex"
                                                onClick={() =>
                                                    header.sortable
                                                        ? onSortable(header.key)
                                                        : null
                                                }
                                            >
                                                {header.label}
                                                {header.sortable && (
                                                    <span className="ml-2 flex-none rounded text-muted-foreground">
                                                        <ArrowDownUp className="h-5 w-5" />
                                                    </span>
                                                )}
                                            </Button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        {headers.map((header) => (
                                            <td
                                                key={header.key}
                                                className="whitespace-nowrap px-6 py-8 text-sm  text-foreground"
                                            >
                                                {renderers[header.key]
                                                    ? renderers[header.key](
                                                        item
                                                    )
                                                    : item[header.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="justify-between flex">
                <p className="text-muted-foreground text-sm">
                    Showing {meta.from} of {meta.total}
                </p>
                {meta.last_page > 1 && (
                    <div className="flex items-center gap-x-1">
                        {meta.links.map((link) => (
                            <Button
                                size={"sm"}
                                variant={link.active ? "default" : "outline"}
                                asChild
                                key={link.label}
                            >
                                <Link
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                ></Link>
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTable;
