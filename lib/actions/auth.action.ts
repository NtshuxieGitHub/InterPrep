"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const oneWeek = 60 * 60 * 24 * 7;

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies(); // Await the promise

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: oneWeek * 1000, // 7 days
  });

  // Now we can safely set the cookie
  cookieStore.set("session", sessionCookie, {
    maxAge: oneWeek,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // Check if user already exists
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }

    await db.collection("users").doc(uid).set({ name, email });

    return { success: true, message: "Account created successfully. Sign in." };
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "auth/email-already-exists") {
      return { success: false, message: "This email is already in use" };
    }

    return {
      success: false,
      message: "Failed to create an account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account first.",
      };
    }

    await setSessionCookie(idToken);
    return { success: true, message: "Signed in successfully" };
  } catch (error: any) {
    console.error("Sign-in error:", error);

    if (error.code === "auth/user-not-found") {
      return {
        success: false,
        message: "No account found. Please sign up first.",
      };
    }

    return { success: false, message: "Failed to sign into account" };
  }
}
