// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// // This function can be marked `async` if using `await` inside
// export async function middleware(req, res) {
//   const session = await getToken({
//     req,
//     secret: `ASFSAAt-2sGQh2aYKSoCQyxGSDAFSADFASFR8y6aUy7`,
//     secureCookie: process.env.NODE_ENV === "production",
//   });

//   if (!session) {
//     return NextResponse.redirect(new URL("/signin", req.url));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/dashboard/:path*",
// };
