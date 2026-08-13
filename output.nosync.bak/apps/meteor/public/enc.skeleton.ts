## File: apps/meteor/public/enc.js

```typescript
self.addEventListener('install', function (event) {
	event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', function (event) {
	event.waitUntil(self.clients.claim()); // Become available to all pages
});

function base64Decode(string) {
    /* Implementation Hidden */
}

function base64DecodeString(string) {
    /* Implementation Hidden */
}

const decrypt = async (key, iv, file) => {
    /* Implementation Hidden */
};

const getUrlParams = (url) => {
    /* Implementation Hidden */
};

self.addEventListener('fetch', (event) => {
	if (!event.request.url.includes('/file-decrypt/')) {
		return;
	}

	try {
		const { url, key, iv, name, type } = getUrlParams(event.request.url);

		const requestToFetch = new Request(url, {
			...event.request,
			mode: 'cors',
		});

		event.respondWith(
			caches.match(requestToFetch).then((response) => {
				if (response) {
					return response;
				}

				return fetch(requestToFetch)
					.then(async (res) => {
						const file = await res.arrayBuffer();

						if (res.status !== 200 || file.byteLength === 0) {
							console.error('Failed to fetch file', { req: requestToFetch, res });
							return res;
						}

						const result = await decrypt(key, iv, file);

						const newHeaders = new Headers(res.headers);
						newHeaders.set('Content-Disposition', 'inline; filename="' + name + '"');
						newHeaders.set('Content-Type', type);

						const response = new Response(result, {
							status: res.status,
							statusText: res.statusText,
							headers: newHeaders,
						});

						await caches.open('v1').then((cache) => {
							cache.put(requestToFetch, response.clone());
						});

						return response;
					})
					.catch((error) => {
						console.error('Fetching failed:', error);

						throw error;
					});
			}),
		);
	} catch (error) {
		console.error(error);
		throw error;
	}
});

self.addEventListener('message', async (event) => {
	if (event.data.type !== 'attachment-download') {
		return;
	}

	const requestToFetch = new Request(event.data.url);

	const { url, key, iv } = getUrlParams(event.data.url);
	const res = (await caches.match(requestToFetch)) ?? (await fetch(url));

	const file = await res.arrayBuffer();
	const result = await decrypt(key, iv, file);
	event.source.postMessage({
		id: event.data.id,
		type: 'attachment-download-result',
		result,
	});
	// .catch((error) => {
	// 	console.error('Posting message failed:', error);
	// 	event.source.postMessage({
	// 		id: event.data.id,
	// 		type: 'attachment-download-result',
	// 		error,
	// 	});
	// });
});

```