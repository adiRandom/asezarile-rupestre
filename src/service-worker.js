console.log('hey');

self.addEventListener('fetch', event => {
	// Prevent the default, and handle the request ourselves.
	event.respondWith(async function () {
		// Try to get the response from a cache.
		const cachedResponse = await caches.match(event.request);
		// Return it if we found one.
		if (cachedResponse) return cachedResponse;
		// If we didn't find a match in the cache, use the network.
		return fetch(event.request).then(async function (response) {
			return caches.open('my-cache').then(async function (cache) {
				return response;
			})
		})
	}());

	fetch(event.request).then(async function (response) {
		caches.open('my-cache').then(async function (cache) {
			cache.put(event.request, response);
		})
	})

});

