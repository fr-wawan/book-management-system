import Header from "@/Components/Header";
import HeaderWithLink from "@/Components/HeaderWithLink";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AdminLayout from "@/Layouts/AdminLayout/AdminLayout";
import { flashMessage } from "@/lib/utils";
import { Category, PageSettings } from "@/types";
import { useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";

interface Props {
    page_settings: PageSettings;
    category: Partial<Category>;
}

export default function Create({ page_settings, category }: Props) {
    interface Form {
        name: string;
        cover: undefined | File;
        description: string;
        _method: string;
    }
    const { reset, post, data, processing, errors, setData } = useForm<Form>({
        name: category.name ?? "",
        cover: undefined,
        description: category.description ?? "",
        _method: page_settings.method,
    });

    function onHandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(page_settings.action, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    }
    return (
        <div>
            <HeaderWithLink
                title={page_settings.title}
                subtitle={page_settings.subtitle}
                link={route("admin.categories.index")}
                label="Back"
                variant="destructive"
            />

            <Card className="shadow-none">
                <CardContent className="py-5">
                    <form onSubmit={onHandleSubmit}>
                        <div className="grid gap-5">
                            <div>
                                <Label htmlFor="name">Name*</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="my-2"
                                    autoFocus
                                    placeholder="Enter Category Name..."
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div>
                                <Label htmlFor="name">Description*</Label>
                                <Textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    placeholder="Enter Category Description..."
                                    className="my-2"
                                />
                                <InputError message={errors.description} />
                            </div>
                            <div>
                                <Label htmlFor="name">Cover*</Label>
                                <Input
                                    id="cover"
                                    name="cover"
                                    type="file"
                                    className="my-2"
                                    placeholder="Enter Category Name..."
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            setData("cover", e.target.files[0]);
                                        }
                                    }}
                                />
                                <InputError message={errors.cover} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-5 mt-3">
                            <Button
                                variant={"ghost"}
                                className="text-red-500 hover:text-red-500"
                                type="button"
                                onClick={() => reset()}
                            >
                                Reset
                            </Button>
                            <Button>Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Create.layout = (page: React.ReactElement) => <AdminLayout children={page} />;
