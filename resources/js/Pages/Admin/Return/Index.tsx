import AdminTable from "@/Components/AdminTable";
import HeaderWithLink from "@/Components/HeaderWithLink";

import { Card, CardContent, CardHeader } from "@/Components/ui/card";

import AdminLayout from "@/Layouts/AdminLayout";
import { BookReturn, MetaPagination, State } from "@/types";

import React from "react";
import { useReturnTable } from "./hooks/UseReturnTable";
import Header from "@/Components/Header";

interface Props {
    returns: {
        data: BookReturn[];
        meta: MetaPagination;
    };
    state: State;
}

export default function Index({ returns, state }: Props) {
    const { headers } = useReturnTable();

    return (
        <div>
            <div className="mb-8">
                <Header
                    title="Book Returns"
                    subtitle="List of all your book returns"
                />
            </div>

            <Card className="shadow-none">
                <CardHeader></CardHeader>
                <CardContent>
                    <AdminTable
                        params={state}
                        headers={headers}
                        data={returns.data}
                        meta={returns.meta}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

Index.layout = (page: React.ReactElement) => <AdminLayout children={page} />;
