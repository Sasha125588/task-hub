import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
	// Проверяем маршруты dashboard с ID
	if (request.nextUrl.pathname.match(/^\/dashboard\/\d+$/)) {
		// Логируем для отладки
		console.log("Dashboard ID route:", request.nextUrl.pathname)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/dashboard/:path*"]
}
