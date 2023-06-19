const headers = [
	{
		key: 'cross-origin-embedder-policy',
		value: 'credentialless',
	},
	{
		key: 'cross-origin-opener-policy',
		value: 'same-origin',
	},
]

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: { esmExternals: 'loose' },
	async headers() {
		return [
			{
				source: '/',
				headers,
			},
			{
				source: '/(.*?)',
				headers,
			},
		]
	},
}

module.exports = nextConfig
