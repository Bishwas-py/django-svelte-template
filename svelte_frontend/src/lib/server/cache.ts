type CacheControlParams = {
	headers: Headers;
	method: string;
};

export function generateCacheControl({ headers, method }: CacheControlParams): string {
	if (!headers || !method) return '';
	const cacheControl = headers.get('cache-control');
	if (cacheControl) return cacheControl;

	const maxAge = method === 'GET' ? 60 * 60 : 0;
	const sMaxAge = method === 'GET' ? 60 * 60 : 0;

	return [
		'public',
		`max-age=${maxAge}`,
		`s-maxage=${sMaxAge}`,
		'stale-while-revalidate=60',
		'stale-if-error=60'
	].join(', ');
}
