"use client";

import { signIn } from "next-auth/react";

const SignInButton = () => {
    const handleSignIn = async () => {
        await signIn("google", { callbackUrl: "/account" });
    };

    return (
        <button
            onClick={handleSignIn}
            className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium"
        >
            <img
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google logo"
                height="24"
                width="24"
            />
            <span>Continue with Google</span>
        </button>
    );
};

export default SignInButton;
