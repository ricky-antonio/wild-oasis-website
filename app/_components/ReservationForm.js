"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import Button from "./Button";

const ReservationForm = ({ cabin, user }) => {
    const { range, resetRange } = useReservation();
    const { max_capacity, regular_price, discount, id } = cabin;

    const start_date = range.from;
    const end_date = range.to;

    const num_nights = differenceInDays(end_date, start_date);
    const cabin_price = num_nights * (regular_price - discount);

    const bookingData = {
        start_date,
        end_date,
        num_nights,
        cabin_price,
        cabin_id: id,
    };

    const createBookingWithData = createBooking.bind(null, bookingData);

    return (
        <div className="scale-[1.01]">
            <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
                <p>Logged in as</p>

                <div className="flex items-center gap-4">
                    <img
                        // Important to display google profile images
                        referrerPolicy="no-referrer"
                        className="h-8 rounded-full"
                        src={user.image}
                        alt={user.name}
                    />
                    <p>{user.name}</p>
                </div>
            </div>

            <form
                action={async (formData) => {
                    await createBookingWithData(formData);
                    resetRange();
                }}
                className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
            >
                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        name="num_guests"
                        id="numGuests"
                        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                        required
                    >
                        <option value="" key="">
                            Select number of guests...
                        </option>
                        {Array.from(
                            { length: max_capacity },
                            (_, i) => i + 1,
                        ).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="observations">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations"
                        id="observations"
                        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                        placeholder="Any pets, allergies, special requirements, etc.?"
                    />
                </div>

                <div className="flex items-center justify-end gap-6">
                    {!(start_date && end_date) ? (
                        <p className="text-base text-primary-300">
                            Start by selecting dates
                        </p>
                    ) : (
                        <Button>Reserve now</Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;
