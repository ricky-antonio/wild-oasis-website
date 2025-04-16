import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import LoginMessage from "./LoginMessage";

const Reservation = async ({ cabin }) => {
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id),
    ]);
    const session = await getServerSession(authOptions);

    return (
        <div className="grid min-h-[100px] grid-cols-[auto_auto] border border-primary-800">
            <DateSelector
                settings={settings}
                bookedDates={bookedDates}
                cabin={cabin}
            />
            {session?.user ? (
                <ReservationForm cabin={cabin} user={session.user} />
            ) : (
                <LoginMessage />
            )}
        </div>
    );
};

export default Reservation;
