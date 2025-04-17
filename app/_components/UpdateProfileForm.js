import { updateProfile } from "../_lib/actions";
import Button from "./Button";

const UpdateProfileForm = ({children, guest}) => {
    
    const {full_name, email, nationality, national_id, country_flag} = guest;

    return (
        <form action={updateProfile} className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg">
            <div className="space-y-2">
                <label>Full name</label>
                <input
                    name="full_name"
                    defaultValue={full_name}
                    disabled
                    className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>

            <div className="space-y-2">
                <label>Email address</label>
                <input
                    name="email"
                    defaultValue={email}
                    disabled
                    className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="nationality">Where are you from?</label>
                    <img
                        name="country_flag"
                        src={country_flag}
                        alt="Country flag"
                        className="h-5 rounded-sm"
                    />
                </div>

                {children}
            </div>

            <div className="space-y-2">
                <label htmlFor="nationalID">National ID number</label>
                <input
                    name="national_id"
                    defaultValue={national_id}
                    className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                />
            </div>

            <div className="flex items-center justify-end gap-6">
                <Button>Update profile</Button>
            </div>
        </form>
    );
};

export default UpdateProfileForm;
