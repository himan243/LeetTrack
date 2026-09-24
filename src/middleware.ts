import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'

const PUBLIC_ROUTES = ['/login', '/signup']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r))

  const sessionCookie = req.cookies.get('session')?.value
  const session = await decrypt(sessionCookie)
  const isAuthenticated = !!session

  // Redirect authenticated users away from login/signup
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Redirect unauthenticated users to login
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
