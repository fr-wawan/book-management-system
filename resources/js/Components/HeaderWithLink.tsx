import React from "react";
import Header from "./Header";
import { Button } from "./ui/button";
import { Link } from "@inertiajs/react";

interface Props {
    title: string;
    subtitle: string;
    link: string;
    label: string;
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
}

export default function HeaderWithLink({
    title,
    subtitle,
    link,
    label,
    variant,
}: Props) {
    return (
        <div className="flex justify-between items-center mb-8">
            <Header title={title} subtitle={subtitle} />
            <Button asChild variant={variant ?? "default"}>
                <Link href={link}>{label}</Link>
            </Button>
        </div>
    );
}
