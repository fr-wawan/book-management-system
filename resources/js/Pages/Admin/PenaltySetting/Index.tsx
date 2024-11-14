import Header from "@/Components/Header";
import HeaderWithLink from "@/Components/HeaderWithLink";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import AdminLayout from "@/Layouts/AdminLayout/AdminLayout";
import { useForm } from "@inertiajs/react";
import React from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { flashMessage } from "@/lib/utils";
import { toast } from "sonner";
import { PenaltySetting } from "@/types";

interface Props {
    penaltySetting: PenaltySetting;
}
export default function Index({ penaltySetting }: Props) {
    const { put, reset, data, errors, setData } = useForm({
        late: penaltySetting?.late ?? "",
        damage: penaltySetting?.damage ?? "",
        lost: penaltySetting?.lost ?? "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(route("admin.penalty-settings.update", 0), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };
    return (
        <div>
            <div className="mb-8">
                <Header
                    title="Penalty Settings"
                    subtitle="Configure your penalty settings in here.Click submit to save changes"
                />
            </div>

            <Card>
                <CardContent className="my-5">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-5">
                            <div>
                                <Label htmlFor="late">
                                    Penalty Late (/day)
                                </Label>
                                <Input
                                    id="late"
                                    name="late"
                                    type="number"
                                    className="my-2"
                                    autoFocus
                                    placeholder="Enter Book late..."
                                    defaultValue={data.late}
                                    onChange={(e) =>
                                        setData("late", Number(e.target.value))
                                    }
                                />
                                <InputError message={errors.late} />
                            </div>
                            <div>
                                <Label htmlFor="damage">
                                    Penalty damage (%)
                                </Label>
                                <Input
                                    id="damage"
                                    name="damage"
                                    type="number"
                                    className="my-2"
                                    autoFocus
                                    placeholder="Enter Book damage..."
                                    defaultValue={data.damage}
                                    onChange={(e) =>
                                        setData(
                                            "damage",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                                <InputError message={errors.damage} />
                            </div>
                            <div>
                                <Label htmlFor="lost">Penalty lost (%)</Label>
                                <Input
                                    id="lost"
                                    name="lost"
                                    type="number"
                                    className="my-2"
                                    autoFocus
                                    placeholder="Enter Book lost..."
                                    defaultValue={data.lost}
                                    onChange={(e) =>
                                        setData("lost", Number(e.target.value))
                                    }
                                />
                                <InputError message={errors.lost} />
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

Index.layout = (page: React.ReactElement) => <AdminLayout children={page} />;
