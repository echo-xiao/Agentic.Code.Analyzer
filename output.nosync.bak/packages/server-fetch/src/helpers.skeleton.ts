## File: packages/server-fetch/src/helpers.ts

```typescript
import { lookup } from 'node:dns';
import net from 'node:net';

import { domainPattern, ipv4Ranges, ipv4WithPortPattern, ipv6Ranges } from './constants';

export const isValidDomain = (domain: string) => domainPattern.test(domain);

export const unwrapBrackets = (address: string) => (address.startsWith('[') && address.endsWith(']') ? address.slice(1, -1) : address);

export const isIpValid = (ip: string): boolean => net.isIP(unwrapBrackets(ip)) !== 0;

export const isIpInCidrRange = (ip: string, cidr: string): boolean => {
    /* Implementation Hidden */
};

export const isIpInAnyRange = (ip: string): boolean => {
    /* Implementation Hidden */
};

export const normalizeAllowlistEntry = (entry: string): string => {
    /* Implementation Hidden */
};

export const normalizeHostForAllowlistMatch = (hostOrIp: string): string => {
    /* Implementation Hidden */
};

export const parseIpv4WithPort = (input: string): { ip: string; port?: string } | null => {
    /* Implementation Hidden */
};

export const allowlistedIpResolved = (ipOrDomain: string, port: string | undefined, wasUrlParsed: boolean): string => {
    /* Implementation Hidden */
};

export function nslookup(hostname: string): Promise<string> {
    /* Implementation Hidden */
}

export function checkDirectIp(ip: string): boolean {
    /* Implementation Hidden */
}

export function extractHostname(urlString: string): string | null {
    /* Implementation Hidden */
}

export function buildPinnedUrl(originalUrl: string, resolvedIp: string): string {
    /* Implementation Hidden */
}

```