import AdminTable from "@/Components/AdminTable";
import HeaderWithLink from "@/Components/HeaderWithLink";

import { Card, CardContent, CardHeader } from "@/Components/ui/card";

import AdminLayout from "@/Layouts/AdminLayout";
import { Borrowing, MetaPagination, State } from "@/types";

import React from "react";
import { useBorrowingTable } from "./hooks/UseBorrowingTable";

interface Props {
    borrowings: {
        data: Borrowing[];
        meta: MetaPagination;
    };
    state: State;
}

export default function Index({ borrowings, state }: Props) {
    const { renderers, tableHeaders } = useBorrowingTable();

    return (
        <div>
            <HeaderWithLink
                title="Borrowings"
                subtitle="List of all your borrowings"
                link={route("admin.borrowings.create")}
                label="Create"
            />

            <Card className="shadow-none">
                <CardHeader></CardHeader>
                <CardContent>
                    <AdminTable
                        params={state}
                        headers={tableHeaders}
                        data={borrowings.data}
                        renderers={renderers}
                        meta={borrowings.meta}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

Index.layout = (page: React.ReactElement) => <AdminLayout children={page} />;
