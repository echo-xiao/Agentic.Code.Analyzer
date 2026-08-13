## File: packages/core-services/src/lib/proxify.ts

```typescript
import { api } from '../api';

type Promisify<T> = {
	[K in keyof T as T[K] extends (...params: any[]) => unknown ? K : never]: T[K] extends (...params: any[]) => Promise<any>
		? T[K]
		: T[K] extends (...params: infer P) => infer R
			? (...params: P) => Promise<R>
			: never;
};

function handler<T extends object>(namespace: string): ProxyHandler<T> {
    /* Implementation Hidden */
}

export function proxify<T>(namespace: string): Promisify<T> {
    /* Implementation Hidden */
}

```