import ReservationCard from "@/app/_components/ReservationCard"
import { getBookings } from "@/app/_lib/data-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

export const metadata = {
    title: "Reservations",
  };
  

const Page = async () => {
    const session = await getServerSession(authOptions);

    const bookings = await getBookings(session.user.guestId)

    return (
        <div>
            <h2 className="mb-7 text-2xl font-semibold text-accent-400">
                Your reservations
            </h2>

            {bookings.length === 0 ? (
                <p className="text-lg">
                    You have no reservations yet. Check out our{" "}
                    <a className="text-accent-500 underline" href="/cabins">
                        luxury cabins &rarr;
                    </a>
                </p>
            ) : (
                <ul className="space-y-6">
                    {bookings.map((booking) => (
                        <ReservationCard booking={booking} key={booking.id} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Page;
