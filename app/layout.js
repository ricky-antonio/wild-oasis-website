import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";

export const metadata = {
    title: {
      template: "%s - The Wild Oasis",
      default: "Welcome to The Wild Oasis"
    },
    description: "Your next luxury getaway, surrounded by beautiful mountains and thick forests.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-primary-950 text-primary-100 min-h-screen">
                <Logo />
                <Navigation />
                <main>{children}</main>
                <footer>Copyright 2025 The Wild Oasis</footer>
            </body>
        </html>
    );
}
