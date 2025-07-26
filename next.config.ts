import type { NextConfig } from 'next'
import path from 'path'

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
	},
	webpack: config => {
		config.resolve.alias = {
			...config.resolve.alias,
			'@': path.resolve(__dirname, './src')
		}
		return config
	}
}

export default nextConfig
