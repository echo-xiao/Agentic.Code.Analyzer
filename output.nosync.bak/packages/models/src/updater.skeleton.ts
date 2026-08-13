## File: packages/models/src/updater.ts

```typescript
import type { Updater, SetProps, UnsetProps, IncProps, AddToSetProps } from '@rocket.chat/model-typings';
import type { UpdateFilter } from 'mongodb';

type ArrayElementType<T> = T extends (infer E)[] ? E : T;

type Keys<T extends { _id: string }> = keyof SetProps<T>;

export class UpdaterImpl<T extends { _id: string }> implements Updater<T> {
	private _set: Map<Keys<T>, any> | undefined;

	private _unset: Set<keyof UnsetProps<T>> | undefined;

	private _inc: Map<keyof IncProps<T>, number> | undefined;

	private _addToSet: Map<keyof AddToSetProps<T>, any[]> | undefined;

	private dirty = false;

	set<K extends keyof SetProps<T>>(key: K, value: SetProps<T>[K]) {
        /* Implementation Hidden */
    }

	unset<K extends keyof UnsetProps<T>>(key: K): Updater<T> {
        /* Implementation Hidden */
    }

	inc<K extends keyof IncProps<T>>(key: K, value: number): Updater<T> {
        /* Implementation Hidden */
    }

	addToSet<K extends keyof AddToSetProps<T>>(key: K, value: ArrayElementType<AddToSetProps<T>[K]>): Updater<T> {
        /* Implementation Hidden */
    }

	hasChanges() {
        /* Implementation Hidden */
    }

	private _hasChanges(filter: UpdateFilter<T>) {
        /* Implementation Hidden */
    }

	public getRawUpdateFilter() {
        /* Implementation Hidden */
    }

	getUpdateFilter() {
        /* Implementation Hidden */
    }
}

export type { Updater };

```