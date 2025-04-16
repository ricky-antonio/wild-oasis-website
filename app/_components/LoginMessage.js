import Link from "next/link";

const LoginMessage = () => {
    return (
        <div className="grid bg-primary-800">
            <p className="self-center py-12 text-center text-xl">
                Please{" "}
                <Link href="/login" className="text-accent-500 underline">
                    login
                </Link>{" "}
                to reserve this&nbsp;cabin 
            </p>
        </div>
    );
};

export default LoginMessage;
