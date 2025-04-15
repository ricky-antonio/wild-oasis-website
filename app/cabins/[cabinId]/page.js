import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export const generateMetadata = async ({ params }) => {
    const { name } = await getCabin(params.cabinId);
    return {
        title: `Cabin ${name}`,
    };
};

export const generateStaticParams = async () => {
    const cabins = await getCabins();
    const ids = cabins.map((cabin) => ({
        cabinId: String(cabin.id),
    }));

    return ids;
};

const Page = async ({ params }) => {
    const cabin = await getCabin(params.cabinId);

    const {
        id,
        name,
        max_capacity,
        regular_price,
        discount,
        image,
        description,
    } = cabin;

    return (
        <div className="mx-auto mt-8 max-w-6xl">
            <div className="mb-24 grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 px-10 py-3">
                <div className="relative -translate-x-3 scale-[1.15]">
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,
                    33vw"
                    <Image
                        src={image}
                        alt={`Cabin ${name}`}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                    />
                </div>

                <div>
                    <h3 className="mb-5 w-[150%] translate-x-[-254px] bg-primary-950 p-6 pb-1 text-7xl font-black text-accent-100">
                        Cabin {name}
                    </h3>

                    <p className="mb-10 text-lg text-primary-300">
                        <TextExpander>
                            {description}
                        </TextExpander>
                    </p>

                    <ul className="mb-7 flex flex-col gap-4">
                        <li className="flex items-center gap-3">
                            <UsersIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                For up to{" "}
                                <span className="font-bold">
                                    {max_capacity}
                                </span>{" "}
                                guests
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <MapPinIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                Located in the heart of the{" "}
                                <span className="font-bold">Dolomites</span>{" "}
                                (Italy)
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                Privacy <span className="font-bold">100%</span>{" "}
                                guaranteed
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="text-center text-5xl font-semibold">
                    Reserve today. Pay on arrival.
                </h2>
            </div>
        </div>
    );
};

export default Page;
