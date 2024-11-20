import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import AdminLayout from "@/Layouts/AdminLayout";
import { flashMessage, conditionList } from "@/lib/utils";
import { BookReturn, Borrowing } from "@/types";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

interface Props {
    borrowing: Borrowing;
    bookReturn: BookReturn
}
export default function Create({ borrowing, bookReturn }: Props) {
    const { data, errors, post, setData } = useForm({
        condition: bookReturn ? (bookReturn.penalty?.condition ?? "Good") : "",
        notes: bookReturn?.penalty?.notes ?? "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("admin.returns.store", borrowing.invoice), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);

                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    return (
        <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-5">
                        <div>
                            <Label>Name</Label>
                            <Input
                                value={borrowing.user.name}
                                disabled
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label>Username</Label>
                            <Input
                                value={borrowing.user.username}
                                disabled
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                value={borrowing.user.email}
                                disabled
                                className="mt-2"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Book Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-5">
                        <div>
                            <Label>ISBN</Label>
                            <Input
                                disabled
                                defaultValue={borrowing.book.isbn}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label>Book Title</Label>
                            <Input
                                disabled
                                defaultValue={borrowing.book.title}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label>Book Author</Label>
                            <Input
                                disabled
                                defaultValue={borrowing.book.author}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label>Book Publisher</Label>
                            <Input
                                disabled
                                defaultValue={borrowing.book.publisher.name}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm col-span-full">
                <CardHeader>
                    <CardTitle>Borrowing Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-5">
                        <div>
                            <Label></Label>
                            <Input
                                disabled
                                defaultValue={borrowing.invoice}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label>Borrowed At</Label>
                            <Input
                                disabled
                                defaultValue={borrowing.borrowed_at}
                                className="mt-2"
                                type="date"
                            />
                        </div>

                        <div>
                            <Label>Due At</Label>
                            <Input
                                disabled
                                defaultValue={borrowing.due_at}
                                className="mt-2"
                                type="date"
                            />
                        </div>
                        <div>
                            <Label>Returned At</Label>
                            <Input
                                disabled
                                defaultValue={bookReturn?.returned_at}
                                className="mt-2"
                                type="date"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Status</Label>
                            <Select
                                value={data.condition}
                                onValueChange={(e) => setData("condition", e)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    {conditionList.map((condition) => (
                                        <SelectItem
                                            key={condition.value}
                                            value={condition.value}
                                        >
                                            {condition.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.condition} />
                        </div>

                        <div>
                            <Label>Notes</Label>
                            <Textarea
                                className="mt-2"
                                placeholder="Extra Notes..."
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                            />

                            <InputError message={errors.notes} />
                        </div>

                        <div className="flex justify-end gap-5">
                            <Button variant={"link"} className="text-red-500">
                                Reset
                            </Button>
                            <Button>Submit</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}

Create.layout = (page: React.ReactElement) => <AdminLayout children={page} />;
