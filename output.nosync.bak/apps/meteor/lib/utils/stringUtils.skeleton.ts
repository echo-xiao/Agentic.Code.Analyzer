## File: apps/meteor/lib/utils/stringUtils.ts

```typescript
import { escapeRegExp } from '@rocket.chat/string-helpers';
import DOMPurify from 'dompurify';

export function truncate(str: string, length: number): string {
    /* Implementation Hidden */
}

function makeString(object: unknown): string {
    /* Implementation Hidden */
}

function defaultToWhiteSpace(characters: unknown): string {
    /* Implementation Hidden */
}

const nativeTrim = String.prototype.trim;
const nativeTrimLeft = String.prototype.trimLeft;
const nativeTrimRight = String.prototype.trimRight;

export function trim(_str: unknown, _characters?: unknown): string {
    /* Implementation Hidden */
}

export function ltrim(_str: unknown, _characters: unknown): string {
    /* Implementation Hidden */
}

export function rtrim(_str: unknown, _characters: unknown): string {
    /* Implementation Hidden */
}

export function capitalize(_str: unknown, lowercaseRest: boolean): string {
    /* Implementation Hidden */
}

export function stripTags(str: unknown): string {
    /* Implementation Hidden */
}

export function strLeft(_str: unknown, _sep: unknown): string {
    /* Implementation Hidden */
}

export function strRight(_str: unknown, _sep: unknown): string {
    /* Implementation Hidden */
}

export function strRightBack(_str: unknown, _sep: unknown): string {
    /* Implementation Hidden */
}

export function numberFormat(_number: number, dec: number, dsep?: string, tsep?: string): string {
    /* Implementation Hidden */
}

export function pad(_str: unknown, _length: number, padStr?: string, type: 'right' | 'left' | 'both' = 'right') {
    /* Implementation Hidden */
}

export function lrpad(str: unknown, length: number, padStr?: string): string {
    /* Implementation Hidden */
}

```