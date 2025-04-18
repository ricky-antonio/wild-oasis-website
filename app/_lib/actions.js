"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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

export const updateBooking = async (formData) => {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("You must be logged in.");

    const bookingId = formData.get("bookingId");

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(Number(bookingId)))
        throw new Error("You do not have access to this booking.");

    const num_guests = Number(formData.get("num_guests"));
    const observations = formData.get("observations").slice(0, 1000);
    const updateData = { num_guests, observations };

    const { error } = await supabase
        .from("bookings")
        .update(updateData)
        .eq("id", bookingId);

    if (error) throw new Error("Booking could not be updated");

    revalidatePath(`/account/reservations/edit/${bookingId}`);

    redirect("/account/reservations");
};

export const createBooking = async (bookingData, formData) => {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("You must be logged in.");

    // console.log("----", bookingData);
    // console.log("----", formData);
    console.log(session.user);

    const { start_date, end_date, num_nights, cabin_price, cabin_id } =
        bookingData;

    const num_guests = Number(formData.get("num_guests"));
    const observations = formData.get("observations").slice(0, 1000);
    const newBooking = {
        start_date,
        end_date,
        num_nights,
        num_guests,
        cabin_price,
        extras_price: 0,
        total_price: cabin_price,
        status: "unconfirmed",
        has_breakfast: false,
        is_paid: false,
        observations,
        cabin_id,
        guest_id: session.user.guestId,
    };

    const { data, error } = await supabase
        .from("bookings")
        .insert([newBooking])

    if (error) {
        console.error(error);
        throw new Error("Booking could not be created");
    }

    revalidatePath(`/cabins/${bookingData.cabin_id}`);

    redirect("/account/thankyou");
};
