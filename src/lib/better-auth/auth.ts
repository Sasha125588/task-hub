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

	socialProviders: {
		google: {
			prompt: 'select_account',
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
		},
		github: {
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!
		}
	},

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false
	},
	trustedOrigins: [
		'http://localhost:3000',
		(process.env.NEXT_PUBLIC_VERCEL_URL
			? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
			: undefined) as string
	],
	plugins: [nextCookies()]
})
