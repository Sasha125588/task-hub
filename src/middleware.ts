import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request)
	const { pathname } = request.nextUrl
	if (sessionCookie && ['/signin', '/', '/signup'].includes(pathname)) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}
	if ((!sessionCookie && pathname.startsWith('/dashboard')) || pathname === '/') {
		return NextResponse.redirect(new URL('/signin', request.url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard', '/signin', '/signup', '/', '/message']
}
