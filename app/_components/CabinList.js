import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

const CabinList = async ({ filter }) => {
    const cabins = await getCabins();

    let filteredCabins;
    if (filter === "all") filteredCabins = cabins;
    if (filter === "small")
        filteredCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
    if (filter === "medium")
        filteredCabins = cabins.filter((cabin) => cabin.max_capacity >=4  && cabin.max_capacity <= 7);
    if (filter === "large")
        filteredCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);
    

    if (!cabins.length) return null;

    return (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
            {filteredCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );
};

export default CabinList;
