import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("admin-auth")
    
    return NextResponse.json({ authenticated: authCookie?.value === "authenticated" })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ authenticated: false })
  }
}

