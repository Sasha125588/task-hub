import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		viewTransition: true
	},
	images: {
		remotePatterns: [
			new URL('https://lh3.googleusercontent.com/**'),
			new URL('https://avatars.githubusercontent.com/**'),
			{ protocol: 'https', hostname: 'avatars.githubusercontent.com' }
		]
	}
}

export default nextConfig
