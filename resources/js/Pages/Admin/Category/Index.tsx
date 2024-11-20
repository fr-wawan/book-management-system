import AdminTable from "@/Components/AdminTable";
import HeaderWithLink from "@/Components/HeaderWithLink";

import { Card, CardContent, CardHeader } from "@/Components/ui/card";

import AdminLayout from "@/Layouts/AdminLayout";
import { Category, Header, MetaPagination, Renderers, State } from "@/types";

import React, { useState } from "react";
import { useCategoryTable } from "./hooks/UseCategoryTable";

interface Props {
    categories: {
        data: Category[];
        meta: MetaPagination;
    };
    state: State;
}

export default function Index({ categories, state }: Props) {
    const { headers } = useCategoryTable();

    return (
        <div>
            <HeaderWithLink
                title="Categories"
                subtitle="List of all your categories"
                link={route("admin.categories.create")}
                label="Create"
            />

            <Card className="shadow-none">
                <CardHeader></CardHeader>
                <CardContent className="">
                    <AdminTable
                        params={state}
                        headers={headers}
                        data={categories.data}
                        meta={categories.meta}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

Index.layout = (page: React.ReactElement) => <AdminLayout children={page} />;
