import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { Pool } from 'pg'
import { Resend } from 'resend'

import { VerifyEmail } from '@/emails/VerifyEmail'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export const auth = betterAuth({
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			resend.emails.send({
				from: 'TaskHub <onboarding@resend.dev>',
				to: process.env.NEXT_PUBLIC_MY_EMAIL!,
				subject: 'Verify your email',
				react: VerifyEmail({ username: user.name, verifyUrl: url })
			})
		}
	},
	database: new Pool({
		connectionString: process.env.NEXT_PUBLIC_DATABASE_URL
	}),

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false
	},
	plugins: [nextCookies()],
	trustedOrigins: [
		'http://localhost:3000',
		(process.env.NEXT_PUBLIC_VERCEL_URL
			? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
			: undefined) as string
	]
})
