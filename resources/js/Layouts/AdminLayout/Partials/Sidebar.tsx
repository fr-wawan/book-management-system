import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Menu } from "@/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";

export default function Sidebar({ menus }: { menus: Menu[] }) {
    const { url } = usePage();
    return (
        <div className="hidden border-r bg-white md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        href="/"
                        className="flex items-center gap-4 font-semibold"
                    >
                        <Avatar>
                            <AvatarImage
                                src="/images/logo.webp"
                                alt="PinjamBaca"
                            />
                        </Avatar>
                        <span className="">PinjamBaca</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-3">
                        {menus.map((menu) => (
                            <div key={menu.title}>
                                <p className="my-3 mb-4">{menu.title}</p>
                                <div className="grid gap-3">
                                    {menu.items.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className={cn(
                                                url.startsWith(item.href)
                                                    ? "bg-primary text-white"
                                                    : "text-muted-foreground hover:bg-primary hover:text-white ",
                                                "flex items-center text-sm gap-3 rounded-lg px-3 py-3 transition-colors duration-150"
                                            )}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
