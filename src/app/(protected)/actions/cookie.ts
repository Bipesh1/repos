"use server";
import { cookies } from "next/headers";

export async function setTokenCookie(token: string) {
  (await cookies()).set("refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none", // necessary for cross-site if your frontend/backend differ
    maxAge: 72 * 60 * 60, // in seconds (72 hours)
    path: "/",
  });
  return true;
}