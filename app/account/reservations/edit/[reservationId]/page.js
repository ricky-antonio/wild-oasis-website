import Button from "@/app/_components/Button";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

const Page = async ({ params }) => {
    
    const { id, num_guests, observations, cabin_id } = await getBooking(params.reservationId, {
        cache: "no-store", // Disable caching
    });

    const { max_capacity } = await getCabin(cabin_id);

    return (
        <div>
            <h2 className="mb-7 text-2xl font-semibold text-accent-400">
                Edit Reservation #{id}
            </h2>

            <form
                className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
                action={updateBooking}
            >
                <input type="hidden" name="bookingId" value={id} />

                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        name="num_guests"
                        id="numGuests"
                        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                        defaultValue={num_guests}
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
                        className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
                        defaultValue={observations}
                    />
                </div>

                <div className="flex items-center justify-end gap-6">
                    <Button>Update reservation</Button>
                </div>
            </form>
        </div>
    );
};

export default Page;
