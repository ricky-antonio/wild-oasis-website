"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";

const Filter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const activeFilter = searchParams.get("capacity") ?? "all";

    // console.log(searchParams)
    const handleFilter = (filter) => {
        const params = new URLSearchParams(searchParams);

        params.set("capacity", filter);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex border border-primary-800 transition-all duration-300">
            <FilterButton
                filter={"all"}
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                All Cabins
            </FilterButton>

            <FilterButton
                filter={"small"}
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                1&mdash;3 guests
            </FilterButton>

            <FilterButton
                filter={"medium"}
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                4&mdash;7 guests
            </FilterButton>

            <FilterButton
                filter={"large"}
                handleFilter={handleFilter}
                activeFilter={activeFilter}
            >
                8&mdash;12 guests
            </FilterButton>
        </div>
    );
};

export default Filter;
