import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

const Navigation = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="z-10 text-xl bg">
            <ul className="flex items-center gap-16">
                <li>
                    <Link
                        href="/cabins"
                        className="transition-colors hover:text-accent-400"
                    >
                        Cabins
                    </Link>
                </li>
                <li>
                    <Link
                        href="/about"
                        className="transition-colors hover:text-accent-400"
                    >
                        About
                    </Link>
                </li>
                <li>
                    {session?.user?.image ? (
                        <Link
                            href="/account"
                            className="transition-colors hover:text-accent-400 flex items-center gap-4"
                        >
                            <img src={session.user.image} className="h-8 rounded-full" alt="user image" referrerPolicy="no-referrer" />
                            <span>Guest area</span>
                        </Link>
                    ) : (
                        <Link
                            href="/account"
                            className="transition-colors hover:text-accent-400"
                        >
                            Guest area
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
