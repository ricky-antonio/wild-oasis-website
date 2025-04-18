"use client";

import {
    differenceInDays,
    isPast,
    isSameDay,
    isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

const isAlreadyBooked = (range, datesArr) => {
    return (
        range.from &&
        range.to &&
        datesArr.some((date) =>
            isWithinInterval(date, { start: range.from, end: range.to })
        )
    );
};

const DateSelector = ({ settings, cabin, bookedDates }) => {
    const { range, setRange, resetRange } = useReservation();

    const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
    const { regular_price, discount } = cabin;

    const num_nights = differenceInDays(displayRange.to, displayRange.from);
    const cabin_price = num_nights * (regular_price - discount);

    // SETTINGS
    const minBookingLength = settings.min_booking_length;
    const maxBookingLength = settings.max_booking_length;

    const handleRange = (range) => {
        if (range === undefined) return;

        if (range.from) setRange(range);
    };

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                className="place-self-center pt-12"
                mode="range"
                onSelect={(range) => handleRange(range)}
                selected={displayRange}
                min={minBookingLength}
                max={maxBookingLength}
                fromMonth={new Date()}
                fromDate={new Date()}
                toYear={new Date().getFullYear() + 5}
                captionLayout="dropdown"
                numberOfMonths={1}
                disabled={(curDate) =>
                    isPast(curDate) ||
                    bookedDates.some((date) => isSameDay(date, curDate))
                }
            />

            <div className="flex py-5 items-center justify-between bg-accent-500 px-8 text-primary-800 flex-wrap">
                <div className="flex items-baseline gap-6">
                    <p className="flex items-baseline gap-2">
                        {discount > 0 ? (
                            <>
                                <span className="text-2xl">
                                    ${regular_price - discount}
                                </span>
                                <span className="font-semibold text-primary-700 line-through">
                                    ${regular_price}
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl">${regular_price}</span>
                        )}
                        <span className="">/night</span>
                    </p>
                    {num_nights ? (
                        <>
                            <p className="bg-accent-600 px-3 py-2 text-2xl">
                                <span>&times;</span> <span>{num_nights}</span>
                            </p>
                        </>
                    ) : null}
                </div>

                <div className="flex items-baseline gap-6">
                    {num_nights ? (
                        <>
                            <p>
                                <span className="text-lg font-bold uppercase">
                                    Total
                                </span>{" "}
                                <span className="text-2xl font-semibold">
                                    ${cabin_price}
                                </span>
                            </p>
                        </>
                    ) : null}
                </div>

                {range.from || range.to ? (
                    <button
                        className="border border-primary-800 px-4 py-2 text-sm font-semibold shadow-md shadow-primary-950"
                        onClick={() => resetRange()}
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default DateSelector;
