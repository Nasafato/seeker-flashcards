"use server"

import type { LoginData } from "@/lib/auth"
import { login as serverLogin } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { cookies as _cookies } from "next/headers"

export async function login(data: LoginData) {
  const cookies = await _cookies();
  try {
    const session = await serverLogin(data);

    cookies.set('seeker_session', session.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: session.expirySeconds,
      sameSite: 'lax',
      path: '/'
    })

    revalidatePath("/", "layout")

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: error instanceof Error ? error.message : "Invalid email or password. Please try again.",
    }
  }
}

