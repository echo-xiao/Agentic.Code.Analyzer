## File: packages/server-fetch/src/index.ts

```typescript
import http from 'node:http';
import https from 'node:https';

import { Logger } from '@rocket.chat/logger';
import { censorUrl } from '@rocket.chat/tools';
import { AbortController } from 'abort-controller';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch, { Response } from 'node-fetch';
import { getProxyForUrl } from 'proxy-from-env';

import { checkForSsrfWithIp, parseSsrfAllowlist } from './checkForSsrf';
import { MAX_REDIRECTS, redirectStatus } from './constants';
import { buildPinnedUrl, checkDirectIp, extractHostname } from './helpers';
import { parseRequestOptions } from './parsers';
import type { ExtendedFetchOptions } from './types';

const logger = new Logger('ExternalRequest');

function getFetchAgent<U extends string>(
	url: U,
	allowSelfSignedCerts?: boolean,
	originalHostname?: string,
): http.Agent | https.Agent | null | HttpsProxyAgent<U> | HttpProxyAgent<U> {
    /* Implementation Hidden */
}

async function getFetchAgentWithValidation<U extends string>(
	url: U,
	allowSelfSignedCerts?: boolean,
	ignoreSsrfValidation?: boolean,
	allowList?: string | string[],
): Promise<{
	agent: http.Agent | https.Agent | null | HttpsProxyAgent<U> | HttpProxyAgent<U>;
	pinnedUrl: string;
	originalHostname?: string;
	resolvedIp?: string;
}> {
    /* Implementation Hidden */
}

function getTimeout(timeout?: number) {
    /* Implementation Hidden */
}

function followRedirect(response: fetch.Response, redirectCount = 0) {
    /* Implementation Hidden */
}

export async function serverFetch(input: string, options?: ExtendedFetchOptions, allowSelfSignedCerts?: boolean): Promise<Response> {
    /* Implementation Hidden */
}

export { Response };
export type { ExtendedFetchOptions };
export { parseSsrfAllowlist };

```