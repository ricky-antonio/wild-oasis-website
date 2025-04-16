import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";

const Reservation = async ({ cabin }) => {
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id),
    ]);

    return (
        <div className="grid grid-cols-[auto_auto] border border-primary-800 min-h-[100px]">
            <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
            <ReservationForm cabin={cabin} />
        </div>
    );
};

export default Reservation;
