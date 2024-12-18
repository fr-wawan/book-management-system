import HeaderWithLink from "@/Components/HeaderWithLink";
import React from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import AdminLayout from "@/Layouts/AdminLayout";
import AdminTable from "@/Components/AdminTable";
import { Publisher, MetaPagination, State } from "@/types";
import { UsePublisherTable } from "./hooks/UsePublisherTable";

interface Props {
    publishers: {
        data: Publisher[];
        meta: MetaPagination;
    };
    state: State;
}

export default function Index({ publishers, state }: Props) {
    const { headers } = UsePublisherTable();
    return (
        <div>
            <HeaderWithLink
                title="Publishers"
                subtitle="List of all your publishers"
                link={route("admin.publishers.create")}
                label="Create"
            />

            <Card className="shadow-none">
                <CardHeader></CardHeader>
                <CardContent>
                    <AdminTable
                        params={state}
                        headers={headers}
                        data={publishers.data}
                        meta={publishers.meta}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

Index.layout = (page: React.ReactElement) => <AdminLayout children={page} />;
