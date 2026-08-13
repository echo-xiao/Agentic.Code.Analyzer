## File: apps/meteor/client/lib/absoluteUrl.ts

```typescript
// There is a good chance this module may be promoted to root lib/ in the future

import { baseURI } from './baseURI';
import { getRootUrlPathPrefix } from './meteorRuntimeConfig';

type AbsoluteUrlOptions = {
	rootUrl?: string;
	secure?: boolean;
	replaceLocalhost?: boolean;
};

export function absoluteUrl(path?: string, options?: AbsoluteUrlOptions): string {
    /* Implementation Hidden */
}

absoluteUrl.defaultOptions = {
	rootUrl: baseURI,
	secure: window.isSecureContext,
} as AbsoluteUrlOptions;

export function _relativeToSiteRootUrl(link: string): string {
    /* Implementation Hidden */
}

```