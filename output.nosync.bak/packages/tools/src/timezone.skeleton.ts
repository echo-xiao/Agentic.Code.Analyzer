## File: packages/tools/src/timezone.ts

```typescript
// Zones where Node/browser Intl returns a legacy IANA name instead of the
// current canonical one. Workaround until Temporal lands (~late 2026).
// Source: https://data.iana.org/time-zones/tzdb/backward
// Ref: https://github.com/tc39/proposal-temporal/issues/3249
const LEGACY_TO_CANONICAL: Record<string, string> = {
	'America/Buenos_Aires': 'America/Argentina/Buenos_Aires',
	'America/Catamarca': 'America/Argentina/Catamarca',
	'America/Cordoba': 'America/Argentina/Cordoba',
	'America/Godthab': 'America/Nuuk',
	'America/Indianapolis': 'America/Indiana/Indianapolis',
	'America/Jujuy': 'America/Argentina/Jujuy',
	'America/Louisville': 'America/Kentucky/Louisville',
	'America/Mendoza': 'America/Argentina/Mendoza',
	'Asia/Calcutta': 'Asia/Kolkata',
	'Asia/Katmandu': 'Asia/Kathmandu',
	'Asia/Rangoon': 'Asia/Yangon',
	'Asia/Saigon': 'Asia/Ho_Chi_Minh',
	'Atlantic/Faeroe': 'Atlantic/Faroe',
	'Europe/Kiev': 'Europe/Kyiv',
	'Pacific/Enderbury': 'Pacific/Kanton',
};

export const canonicalizeTimezone = (name: string): string => {
    /* Implementation Hidden */
};

export const getTimezoneNames = (): string[] => {
    /* Implementation Hidden */
};

export const guessTimezoneFromOffset = (offset: string | number): string => {
    /* Implementation Hidden */
};

export const guessTimezone = (): string => {
    /* Implementation Hidden */
};

```