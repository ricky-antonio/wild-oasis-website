import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
    subsets: ["latin"],
    display: "swap",
});
import "@/app/_styles/globals.css";
import Header from "./_components/Header";

export const metadata = {
    title: {
        template: "%s - The Wild Oasis",
        default: "Welcome to The Wild Oasis",
    },
    description:
        "Your next luxury getaway, surrounded by beautiful mountains and thick forests.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${josefin.className} flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
            >
                <Header />
                <div className="flex-1 px-8 py-12">
                    <main className="mx-auto max-w-7xl">{children}</main>
                </div>
            </body>
        </html>
    );
}
