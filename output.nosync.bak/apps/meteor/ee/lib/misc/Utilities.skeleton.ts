## File: apps/meteor/ee/lib/misc/Utilities.ts

```typescript
export class Utilities {
	static getI18nKeyForApp<TKey extends string, TAppId extends string>(key: TKey, appId: TAppId) {
        /* Implementation Hidden */
    }

	static curl(
		{
			method,
			params,
			auth,
			headers = {},
			url,
			query,
			content,
		}: {
			method: string;
			params?: Record<string, string>;
			auth?: string;
			headers?: Record<string, string>;
			url: string;
			query?: Record<string, string>;
			content?: unknown;
		},
		opts: {
			verbose?: boolean;
			headers?: boolean;
		} = {},
	) {
        /* Implementation Hidden */
    }
}

```