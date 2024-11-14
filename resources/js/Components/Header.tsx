import React from "react";

interface Props {
    title: string;
    subtitle: string;
}
export default function Header({ title, subtitle }: Props) {
    return (
        <div className="">
            <div className="mx-auto flex flex-col gap-x-8 lg:mx-0">
                <h3 className="text-2xl font-bold leading-relaxed text-foreground">
                    {title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground mt-1">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}
