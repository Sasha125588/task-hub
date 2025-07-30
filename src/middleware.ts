import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/signin', '/signup', '/']

const privateRoutes = [
	'/dashboard',
	'/message',
	'/reports',
	'/schedule',
	'/team',
	'/insights',
	'/settings'
]

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request)
	const { pathname } = request.nextUrl

	const isAuthenticated = !!sessionCookie

	if (isAuthenticated && publicRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	if (!isAuthenticated && privateRoutes.some(route => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL('/signin', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		// Public routes
		'/',
		'/signin',
		'/signup',
		// Private routes
		'/dashboard/:path*',
		'/message/:path*',
		'/reports/:path*',
		'/schedule/:path*',
		'/team/:path*',
		'/insights/:path*',
		'/settings/:path*'
	]
}
