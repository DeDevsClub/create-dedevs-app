const { request, gql } = require('graphql-request');

const ANALYTICS_BASE_URL = 'https://hn-ping2.hashnode.com';
const HASHNODE_ADVANCED_ANALYTICS_URL = 'https://user-analytics.hashnode.com';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;
const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;

const getBasePath = () => {
	if (BASE_URL && BASE_URL.indexOf('/') !== -1) {
		return BASE_URL.substring(BASE_URL.indexOf('/'));
	}
	return undefined;
};

const getRedirectionRules = async () => {
	try {
		// Check if required environment variables are set
		if (!GQL_ENDPOINT || !host) {
			console.warn('Missing required environment variables for GraphQL request. Skipping redirection rules.');
			return [];
		}

		const query = gql`
			query GetRedirectionRules {
				publication(host: "${host}") {
					id
					redirectionRules {
						source
						destination
						type
					}
				}
			}
		`;

		// Use the GraphQL request with explicit options for Node.js environment
		const data = await request({
			url: GQL_ENDPOINT,
			document: query,
			requestHeaders: {
				'Content-Type': 'application/json',
			},
		});

		if (!data?.publication) {
			console.warn('No publication data found. Please ensure you have set the env var NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST correctly.');
			return [];
		}

		const redirectionRules = data.publication.redirectionRules || [];

		// convert to next.js redirects format
		const redirects = redirectionRules
			.filter((rule) => {
				// Hashnode gives an option to set a wildcard redirect,
				// but it doesn't work properly with Next.js
				// the solution is to filter out all the rules with wildcard and use static redirects for now
				return rule.source.indexOf('*') === -1;
			})
			.map((rule) => {
				return {
					source: rule.source,
					destination: rule.destination,
					permanent: rule.type === 'PERMANENT',
				};
			});

		return redirects;
	} catch (error) {
		console.warn('Error fetching redirection rules:', error);
		// Return empty array as fallback
		return [];
	}
};

/**
 * @type {import('next').NextConfig}
 */
const config = {
	transpilePackages: ['@starter-kit/utils'],
	basePath: getBasePath(),
	experimental: {
		scrollRestoration: true,
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.hashnode.com',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/ping/data-event',
				destination: `${ANALYTICS_BASE_URL}/api/data-event`,
			},
			{
				source: '/api/analytics',
				destination: `${HASHNODE_ADVANCED_ANALYTICS_URL}/api/analytics`,
			},
		];
	},
	async redirects() {
		try {
			return await getRedirectionRules();
		} catch (error) {
			console.warn('Error in redirects configuration:', error);
			return [];
		}
	},
};

module.exports = config;
