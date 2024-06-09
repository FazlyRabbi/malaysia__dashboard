import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const auth = !!req.auth;

  if (!auth && req?.auth?.user?.role !== "admin") {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
});

export const config = {
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: [
    "/",
    "/banners",
    "/robi/dataPack",
    "/robi/minutePack",
    "/robi/bundlePack",
    "/bl/bundlePack",
    "/bl/minutePack",
    "/tale/dataPack",
    "/bl/bundlePack",
    "/bl/minutePack",
    "/bl/dataPack",
    "/gp/bundlePack",
    "/gp/minutePack",
    "/gp/dataPack",
    "/orders",
  ],
};
