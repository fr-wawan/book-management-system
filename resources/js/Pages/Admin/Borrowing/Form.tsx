import HeaderWithLink from "@/Components/HeaderWithLink";
import InputError from "@/Components/InputError";
import { Card, CardContent } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { SelectContent, SelectValue, Select, SelectItem, SelectTrigger } from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import AdminLayout from "@/Layouts/AdminLayout";
import { Book, Borrowing, PageSettings, User } from "@/types";
import { useForm } from "@inertiajs/react";
import { flashMessage } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/Components/ui/button";

interface Props {
    borrowing: Borrowing;
    books: Book[];
    users: User[];
    page_settings: PageSettings;
}

export default function Form({ borrowing, page_settings, books, users }: Props) {
    const { reset, data, errors, post, setData } = useForm({
        user_id: borrowing.user_id ?? "",
        book_id: borrowing.book_id ?? "",
        borrowing_date: borrowing.borrowed_at ?? new Date().toISOString().split("T")[0],
        due_at: borrowing.due_at ?? new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        _method: page_settings.method
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(page_settings.action, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);

                if (flash) toast[flash.type](flash.message);
            }

        })
    }
    return (
        <>
            <HeaderWithLink
                title={page_settings.title}
                subtitle={page_settings.subtitle}
                link={route("admin.books.index")}
                label="Back"
                variant="destructive"
            />

            <Card className="shadow-none">
                <CardContent className="py-5">
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-5">
                            <div>
                                <Label className="mb-2" htmlFor="year">
                                    Name*
                                </Label>
                                <div className="my-2">
                                    <Select
                                        value={String(data.user_id)}
                                        onValueChange={(e) =>
                                            setData("user_id", Number(e))
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select User" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem value={String(user.id)} key={user.id}>
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <InputError
                                    message={errors.user_id}
                                />
                            </div>
                            <div>
                                <Label className="mb-2" htmlFor="year">
                                    Book*
                                </Label>
                                <div className="my-2">
                                    <Select
                                        value={String(data.book_id)}
                                        onValueChange={(e) =>
                                            setData("book_id", Number(e))
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Book" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {books.map((book) => (
                                                <SelectItem value={String(book.id)} key={book.id}>
                                                    {book.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <InputError
                                    message={errors.book_id}
                                />
                            </div>
                            <div>
                                <Label htmlFor="borrowing_date">Borrowing Date</Label>

                                <Input
                                    type="date"
                                    name="borrowing_date"
                                    defaultValue={data.borrowing_date}
                                    className="mt-2"
                                    disabled
                                />
                            </div>
                            <div>
                                <Label htmlFor="return_date">Due At</Label>

                                <Input
                                    type="date"
                                    name="return_date"
                                    defaultValue={data.due_at}
                                    className="mt-2"
                                    disabled
                                />
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
        </>
    )
}

Form.layout = (page: React.ReactElement) => <AdminLayout children={page} />;
