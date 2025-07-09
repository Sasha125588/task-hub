import type { Metadata } from "next"

import { GradientBackground } from "@/components/ui/background-gradient"

export const metadata: Metadata = {
	title: "Login",
	description: "Login to your account"
}

export default function AuthLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<GradientBackground className="absolute z-0 h-screen w-full" />
			{children}
		</>
	)
}
