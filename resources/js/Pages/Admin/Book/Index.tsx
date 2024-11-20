import AdminTable from "@/Components/AdminTable";
import HeaderWithLink from "@/Components/HeaderWithLink";

import { Card, CardContent, CardHeader } from "@/Components/ui/card";

import AdminLayout from "@/Layouts/AdminLayout";
import { Book, MetaPagination, State } from "@/types";

import React from "react";
import { useBookTable } from "./hooks/UseBookTable";

interface Props {
    books: {
        data: Book[];
        meta: MetaPagination;
    };
    state: State;
}

export default function Index({ books, state }: Props) {
    const { headers } = useBookTable();

    return (
        <div>
            <HeaderWithLink
                title="Books"
                subtitle="List of all your books"
                link={route("admin.books.create")}
                label="Create"
            />

            <Card className="shadow-none">
                <CardHeader></CardHeader>
                <CardContent>
                    <AdminTable
                        params={state}
                        headers={headers}
                        data={books.data}
                        meta={books.meta}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

Index.layout = (page: React.ReactElement) => <AdminLayout children={page} />;
