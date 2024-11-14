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
import { Publisher, Category, PageSettings } from "@/types";
import { useForm } from "@inertiajs/react";
import React from "react";
import { toast } from "sonner";

interface Props {
    page_settings: PageSettings;
    publisher: Partial<Publisher>;
}

export default function Create({ page_settings, publisher }: Props) {
    interface Form {
        name: string;
        address: string;
        email: string;
        phone_number: string;
        _method: string;
    }
    const { reset, post, data, processing, errors, setData } = useForm<Form>({
        name: publisher.name ?? "",
        address: publisher.address ?? "",
        email: publisher.email ?? "",
        phone_number: publisher.phone_number ?? "",
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
                link={route("admin.publishers.index")}
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
                                    placeholder="Enter Publisher Name..."
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email*</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="my-2"
                                    placeholder="Enter Publisher Email..."
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div>
                                <Label htmlFor="phone_number">
                                    Phone Number*
                                </Label>
                                <Input
                                    id="phone_number"
                                    name="phone_number"
                                    type="text"
                                    className="my-2"
                                    placeholder="Enter Publisher phone Number..."
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                />
                                <InputError message={errors.phone_number} />
                            </div>
                            <div>
                                <Label htmlFor="address">Address*</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    type="text"
                                    className="my-2"
                                    autoFocus
                                    placeholder="Enter Publisher Address..."
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />
                                <InputError message={errors.address} />
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
