import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

const Cabin = ({ cabin }) => {
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
        <div className="mb-24 grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-[3fr_4fr] gap-20 border border-primary-800 px-10 py-3">
            <div className="relative md:-translate-x-3 md:scale-[1.15] ">
                <Image
                    src={image}
                    alt={`Cabin ${name}`}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                />
            </div>

            <div>
                <h3 className="mb-5 md:w-[150%] md:translate-x-[-254px] bg-primary-950 p-6 pb-1 text-7xl font-black text-accent-100">
                    Cabin {name}
                </h3>

                <p className="mb-10 text-lg text-primary-300">
                    <TextExpander>{description}</TextExpander>
                </p>

                <ul className="mb-7 flex flex-col gap-4">
                    <li className="flex items-center gap-3">
                        <UsersIcon className="h-5 w-5 text-primary-600" />
                        <span className="text-lg">
                            For up to{" "}
                            <span className="font-bold">{max_capacity}</span>{" "}
                            guests
                        </span>
                    </li>
                    <li className="flex items-center gap-3">
                        <MapPinIcon className="h-5 w-5 text-primary-600" />
                        <span className="text-lg">
                            Located in the heart of the{" "}
                            <span className="font-bold">Dolomites</span> (Italy)
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
    );
};

export default Cabin;
