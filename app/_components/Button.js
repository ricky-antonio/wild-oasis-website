"use client"
import { useFormStatus } from "react-dom";

const Button = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 shadow-md shadow-primary-950"
        >
            {pending ? "updating..." :  children }
        </button>
    );
};

export default Button;
