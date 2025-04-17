// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//     // Get token from request
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//     // Redirect to login if no valid token is found
//     if (!token) {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }

//     // Allow the request to continue if token exists
//     return NextResponse.next();
// }

// // Configure which routes the middleware applies to
// export const config = {
//     matcher: ["/account/:path*"], // Protect /account and all its subpaths
// };

export { default } from "next-auth/middleware"

export const config = { matcher: ["/account/:path*"] }