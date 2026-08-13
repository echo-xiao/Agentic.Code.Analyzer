## File: apps/meteor/server/lib/http/call.ts

```typescript
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { HTTP } from 'meteor/http';
import { URL, URLSearchParams } from 'meteor/url';

import { truncate } from '../../../lib/utils/stringUtils';

// Code extracted from https://github.com/meteor/meteor/blob/master/packages/deprecated/http
// Modified to:
//   - Respect proxy envvars such as HTTP_PROXY and NO_PROXY
//   - Respect HTTP_DEFAULT_TIMEOUT envvar or use 20s when it is not set

const envTimeout = parseInt(process.env.HTTP_DEFAULT_TIMEOUT || '', 10);
const defaultTimeout = !isNaN(envTimeout) ? envTimeout : 20000;

type HttpCallOptions = {
	content?: string | URLSearchParams;
	data?: Record<string, any>;
	query?: string;
	params?: Record<string, string>;
	auth?: string;
	headers?: Record<string, string>;
	timeout?: number;
	followRedirects?: boolean;
	referrer?: string;
	integrity?: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
interface HTTPResponse {
	statusCode?: number;
	headers?: { [id: string]: string };
	content?: string;
	data?: any;
	ok?: boolean;
	redirected?: boolean;
}

type callbackFn = (error: Error | undefined, result?: HTTPResponse) => void;

// Fill in `response.data` if the content-type is JSON.
function populateData(response: Record<string, any>): void {
    /* Implementation Hidden */
}

function makeErrorByStatus(statusCode: number, content: string): Error {
    /* Implementation Hidden */
}

function _call(httpMethod: string, url: string, options: HttpCallOptions, callback: callbackFn): void {
    /* Implementation Hidden */
}

function httpCallAsync(httpMethod: string, url: string, options: HttpCallOptions, callback: callbackFn): void;
function httpCallAsync(httpMethod: string, url: string, callback: callbackFn): void;
function httpCallAsync(httpMethod: string, url: string, optionsOrCallback: HttpCallOptions | callbackFn = {}, callback?: callbackFn): void {
    /* Implementation Hidden */
}

export const httpCall = async (httpMethod: string, url: string, options: HttpCallOptions) => {
    /* Implementation Hidden */
};

```