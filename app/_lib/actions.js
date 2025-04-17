"use server";

import { NextResponse } from "next/server";

export async function signInAction() {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"; // Ensure base URL
    const signInUrl = `${baseUrl}/api/auth/signin/google?callbackUrl=/account`; // Construct URL

    return NextResponse.redirect(signInUrl); // Return server-side redirect
}