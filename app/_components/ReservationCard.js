import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
    formatDistance(parseISO(dateStr), new Date(), {
        addSuffix: true,
    }).replace("about ", "");

const ReservationCard = ({ booking, onDelete }) => {
    const {
        id,
        guest_id,
        start_date,
        end_date,
        num_nights,
        total_price,
        num_guests,
        status,
        created_at,
        cabins: { name, image },
    } = booking;

    return (
        <div className="flex border border-primary-800">
            <div className="relative aspect-square h-32">
                <Image
                    src={image}
                    alt={`Cabin ${name}`}
                    className="border-r border-primary-800 object-cover"
                    fill
                />
            </div>

            <div className="flex flex-grow flex-col px-6 py-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                        {num_nights} nights in Cabin {name}
                    </h3>
                    {isPast(new Date(start_date)) ? (
                        <span className="flex h-7 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200">
                            past
                        </span>
                    ) : (
                        <span className="flex h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200">
                            upcoming
                        </span>
                    )}
                </div>

                <p className="text-lg text-primary-300">
                    {format(new Date(start_date), "EEE, MMM dd yyyy")} (
                    {isToday(new Date(start_date))
                        ? "Today"
                        : formatDistanceFromNow(start_date)}
                    ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
                </p>

                <div className="mt-auto flex items-baseline gap-5">
                    <p className="text-xl font-semibold text-accent-400">
                        ${total_price}
                    </p>
                    <p className="text-primary-300">&bull;</p>
                    <p className="text-lg text-primary-300">
                        {num_guests} guest{num_guests > 1 && "s"}
                    </p>
                    <p className="ml-auto text-sm text-primary-400">
                        Booked{" "}
                        {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
                    </p>
                </div>
            </div>

            <div className="flex w-[100px] flex-col border-l border-primary-800">
                {!isPast(start_date) && (
                    <>
                        <Link
                            href={`/account/reservations/edit/${id}`}
                            className="group flex flex-grow items-center gap-2 border-b border-primary-800 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900"
                        >
                            <PencilSquareIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
                            <span className="mt-1">Edit</span>
                        </Link>
                        <DeleteReservation bookingId={id} onDelete={onDelete} />
                    </>
                )}
            </div>
        </div>
    );
};

export default ReservationCard;
