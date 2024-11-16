import HeaderWithLink from "@/Components/HeaderWithLink";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AdminLayout from "@/Layouts/AdminLayout";
import { flashMessage } from "@/lib/utils";
import { Book, Category, PageSettings, Publisher } from "@/types";
import { useForm } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import React from "react";
import { toast } from "sonner";

interface Props {
    page_settings: PageSettings;
    book: Partial<Book>;
    categories: Category[];
    publishers: Publisher[];
}

export default function Create({
    page_settings,
    book,
    categories,
    publishers,
}: Props) {
    const languages = [
        "English",
        "Indonesian",
        "Japanese",
        "Korean",
        "Chinese",
    ];

    interface Form {
        title: string;
        author: string;
        year: number;
        isbn: string;
        language: string;
        summary: string;
        pages: number;
        cover: undefined | File;
        price: number;
        category_id: string | number;
        publisher_id: string | number;
        stock: number;
        _method: string;
    }

    const { reset, post, data, errors, setData } = useForm<Form>({
        title: book.title ?? "",
        author: book.author ?? "",
        year: book.year ?? new Date().getFullYear(),
        isbn: book.isbn ?? "",
        language: book.language ?? "",
        summary: book.summary ?? "",
        pages: book.pages ?? 1,
        cover: undefined,
        price: book.price ?? 0,
        publisher_id: book.publisher_id ?? "",
        category_id: book.category_id ?? "",
        stock: book.stock ?? 0,
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
                link={route("admin.books.index")}
                label="Back"
                variant="destructive"
            />

            <Card className="shadow-none">
                <CardContent className="py-5">
                    <form onSubmit={onHandleSubmit}>
                        <div className="grid gap-5">
                            <div>
                                <Label htmlFor="title">Title*</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="my-2"
                                    autoFocus
                                    placeholder="Enter Book Title..."
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div>
                                <Label htmlFor="author">Author*</Label>
                                <Input
                                    id="author"
                                    name="author"
                                    type="text"
                                    className="my-2"
                                    placeholder="Enter Book author..."
                                    value={data.author}
                                    onChange={(e) =>
                                        setData("author", e.target.value)
                                    }
                                />
                                <InputError message={errors.author} />
                            </div>

                            <div>
                                <Label className="mb-2" htmlFor="year">
                                    Year*
                                </Label>
                                <div className="my-2">
                                    <Select
                                        value={String(data.year)}
                                        onValueChange={(e) =>
                                            setData("year", Number(e))
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from(
                                                { length: 50 },
                                                (_, i) => (
                                                    <SelectItem
                                                        key={i}
                                                        value={String(
                                                            new Date().getFullYear() -
                                                            i
                                                        )}
                                                    >
                                                        {new Date().getFullYear() -
                                                            i}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <InputError
                                    message={errors.year}
                                    className=""
                                />
                            </div>

                            <div>
                                <Label htmlFor="isbn">ISBN*</Label>
                                <Input
                                    id="isbn"
                                    name="isbn"
                                    type="text"
                                    className="my-2"
                                    placeholder="Enter Book isbn..."
                                    value={data.isbn}
                                    onChange={(e) =>
                                        setData("isbn", e.target.value)
                                    }
                                />
                                <InputError message={errors.isbn} />
                            </div>

                            <div>
                                <Label className="mb-2" htmlFor="language">
                                    Language*
                                </Label>
                                <div className="my-2">
                                    <Select
                                        value={String(data.language)}
                                        onValueChange={(e) =>
                                            setData("language", e)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {languages.map((language) => (
                                                <SelectItem
                                                    value={language}
                                                    key={language}
                                                >
                                                    {language}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <InputError
                                    message={errors.language}
                                    className=""
                                />
                            </div>

                            <div>
                                <Label htmlFor="summary">Summary*</Label>
                                <Textarea
                                    id="summary"
                                    name="summary"
                                    className="my-2"
                                    placeholder="Enter Book summary..."
                                    value={data.summary}
                                    onChange={(e) =>
                                        setData("summary", e.target.value)
                                    }
                                />
                                <InputError message={errors.summary} />
                            </div>

                            <div>
                                <Label htmlFor="pages">Pages*</Label>
                                <Input
                                    id="pages"
                                    name="pages"
                                    type="number"
                                    className="my-2"
                                    placeholder="Enter Book pages..."
                                    defaultValue={data.pages}
                                    onChange={(e) =>
                                        setData("pages", Number(e.target.value))
                                    }
                                />
                                <InputError message={errors.pages} />
                            </div>

                            <div>
                                <Label htmlFor="cover">Cover*</Label>
                                <Input
                                    id="cover"
                                    name="cover"
                                    type="file"
                                    className="my-2"
                                    placeholder="Enter book Name..."
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

                            <div>
                                <Label htmlFor="price">Price*</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    className="my-2"
                                    placeholder="Enter book price..."
                                    defaultValue={data.price}
                                    onChange={(e) =>
                                        setData("price", Number(e.target.value))
                                    }
                                />
                                <InputError message={errors.price} />
                            </div>

                            <div>
                                <Label className="mb-2" htmlFor="categories">
                                    Category*
                                </Label>
                                <div className="my-2">
                                    <Select
                                        value={String(data.category_id)}
                                        onValueChange={(e) =>
                                            setData("category_id", Number(e))
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    value={String(category.id)}
                                                    key={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <InputError
                                    message={errors.category_id}
                                    className=""
                                />
                            </div>

                            <div>
                                <Label className="mb-2" htmlFor="publishers">
                                    Publisher*
                                </Label>
                                <div className="my-2">
                                    <Select
                                        value={String(data.publisher_id)}
                                        onValueChange={(e) =>
                                            setData("publisher_id", Number(e))
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select publisher" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {publishers.map((publisher) => (
                                                <SelectItem
                                                    value={String(publisher.id)}
                                                    key={publisher.id}
                                                >
                                                    {publisher.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <InputError
                                    message={errors.publisher_id}
                                    className=""
                                />
                            </div>

                            <div>
                                <Label htmlFor="stock">Stock*</Label>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    className="my-2"
                                    defaultValue={data.stock}
                                    placeholder="Enter book stock..."
                                    onChange={(e) =>
                                        setData("stock", Number(e.target.value))
                                    }
                                />
                                <InputError message={errors.stock} />
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
