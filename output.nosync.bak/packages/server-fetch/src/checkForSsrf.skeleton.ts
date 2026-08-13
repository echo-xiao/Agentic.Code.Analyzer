## File: packages/server-fetch/src/checkForSsrf.ts

```typescript
import { isTruthy } from '@rocket.chat/tools';

import {
	allowlistedIpResolved,
	isIpInAnyRange,
	isIpValid,
	isValidDomain,
	normalizeAllowlistEntry,
	normalizeHostForAllowlistMatch,
	nslookup,
	parseIpv4WithPort,
} from './helpers';

export const parseSsrfAllowlist = (value: string): string[] => {
    /* Implementation Hidden */
};

function getEffectiveAllowlist(allowListRaw: string[]): string[] {
    /* Implementation Hidden */
}

/** Normalize allowList (string or string[]) to a single effective list. Parses raw string in this single place. */
function toEffectiveAllowlist(allowList?: string | string[]): string[] {
    /* Implementation Hidden */
}

function isInAllowlist(hostOrIp: string, port: string | undefined, allowlist: string[]): boolean {
    /* Implementation Hidden */
}

/**
 * Returns whether the URL is allowed by SSRF rules.
 * @param input - URL or host to check
 * @param allowList - Optional raw string (newline/comma-separated) or array of allowed hosts/IPs/CIDRs. Parsed inside.
 */
export const checkForSsrf = async (input: string, allowList?: string | string[]): Promise<boolean> => {
    /* Implementation Hidden */
};

/**
 * SSRF check with resolved IP for pinning. allowList is optional; string is parsed in this single place.
 */
export const checkForSsrfWithIp = async (
	input: string,
	allowList?: string | string[],
): Promise<{ allowed: false } | { allowed: true; resolvedIp: string }> => {
    /* Implementation Hidden */
};

```