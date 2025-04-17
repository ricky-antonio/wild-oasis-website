"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";

export const updateProfile = async (formData) => {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("You must be logged in.");

    const national_id = formData.get("national_id");
    const [nationality, country_flag] = formData.get("nationality").split("%");

    const regex = /^[a-zA-Z0-9]{6,12}$/;

    if (!regex.test(national_id))
        throw new Error("please provide valid National ID");

    const updateData = { nationality, country_flag, national_id };

    const { data, error } = await supabase
        .from("guests")
        .update(updateData)
        .eq("id", session.user.guestId);

    if (error) {
        console.error(error);
        throw new Error("Guest could not be updated");
    }

    revalidatePath("/account/profile");
};

export const deleteReservation = async (bookingId) => {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("You must be logged in.");

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(bookingId))
        throw new Error("You do not have access to this booking.");

    const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

    if (error) throw new Error("Booking could not be deleted");

    revalidatePath("/account/reservations");
};
