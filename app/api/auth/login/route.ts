import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// IMPORTANTE: Altere esta senha para uma senha segura
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    
    if (password === ADMIN_PASSWORD) {
      const cookieStore = await cookies()
      // Criar um token simples (em produção, use JWT)
      cookieStore.set("admin-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      })
      
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
}

