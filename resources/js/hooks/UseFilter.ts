import { router } from "@inertiajs/react";
import { debounce, pickBy } from "lodash";
import { useCallback, useEffect } from "react";

interface Props {
    route: string;
    values: any;
    only: string[];
    wait?: number;
}
export function UseFilter({ route, values, only, wait = 300 }: Props) {
    const reload = useCallback(
        debounce((query) => {
            router.get(route, pickBy(query), {
                only: only,
                preserveState: true,
                preserveScroll: true,
            });
        }, wait),
        []
    );

    useEffect(() => reload(values), [values, reload]);

    return { values };
}
