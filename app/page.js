import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Home() {
    return (
        <main className="mt-24">
            <Image
                src={bg}
                fill
                placeholder="blur"
                quality={80}
                className="object-cover object-center"
                alt="Mountains and forests with two cabins"
            />

            <div className="relative z-10 text-center h-[60vh] flex flex-col justify-center items-center">
                <h1 className="mb-10 text-5xl md:text-8xl font-normal tracking-tight text-primary-50 text-shadow-md">
                    Welcome to paradise.
                </h1>
                <Link
                    href="/cabins"
                    className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600 shadow-md shadow-primary-950"
                >
                    Explore luxury cabins
                </Link>
            </div>
        </main>
    );
}
