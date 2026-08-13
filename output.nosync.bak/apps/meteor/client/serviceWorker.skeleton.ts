## File: apps/meteor/client/serviceWorker.ts

```typescript
const KEY = 'sw_last_reload';
const RELOAD_WINDOW = 1000 * 10;

function reload() {
    /* Implementation Hidden */
}

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/enc.js', {
			scope: '/',
		})
		.then((reg) => {
			if (reg.active) {
				console.log('service worker: installed');
				if (!navigator.serviceWorker.controller) {
					reload();
				}
			}
		})
		.catch((err) => {
			console.log(`registration failed: ${err}`);
		});
}

```