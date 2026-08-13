## File: apps/meteor/client/meteor/minimongo/IdMap.ts

```typescript
import { clone } from './common';

interface IIdMap<TId, TValue> {
	get(id: TId): TValue | undefined;
	set(id: TId, value: TValue): void;
	remove(id: TId): void;
	has(id: TId): boolean;
	empty(): boolean;
	clear(): void;
	forEach(iterator: (value: TValue, key: TId) => boolean | void): void;
	forEachAsync(iterator: (value: TValue, key: TId) => Promise<boolean | void>): Promise<void>;
	size(): number;
}

export class IdMap<TId, TValue> implements IIdMap<TId, TValue> {
	private _map: Map<TId, TValue> = new Map();

	get(id: TId): TValue | undefined {
        /* Implementation Hidden */
    }

	set(id: TId, value: TValue): void {
        /* Implementation Hidden */
    }

	remove(id: TId): void {
        /* Implementation Hidden */
    }

	has(id: TId): boolean {
        /* Implementation Hidden */
    }

	empty(): boolean {
        /* Implementation Hidden */
    }

	clear(): void {
        /* Implementation Hidden */
    }

	forEach(callback: (value: TValue, id: TId) => boolean | void): void {
        /* Implementation Hidden */
    }

	async forEachAsync(callback: (value: TValue, id: TId) => Promise<boolean | void>): Promise<void> {
        /* Implementation Hidden */
    }

	size(): number {
        /* Implementation Hidden */
    }

	setDefault(id: TId, def: TValue): TValue {
        /* Implementation Hidden */
    }

	clone(): IdMap<TId, TValue> {
        /* Implementation Hidden */
    }
}

```