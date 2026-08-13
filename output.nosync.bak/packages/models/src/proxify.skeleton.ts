## File: packages/models/src/proxify.ts

```typescript
import type { IBaseModel } from '@rocket.chat/model-typings';

const lazyModels = new Map<string, () => IBaseModel<any>>();
const models = new Map<string, IBaseModel<any>>();

function handler<T extends object>(namespace: string): ProxyHandler<T> {
    /* Implementation Hidden */
}

export function registerModel<TModel extends IBaseModel<any, any, any>>(
	name: string,
	instance: TModel | (() => TModel),
	overwriteExisting = true,
): void {
    /* Implementation Hidden */
}

export function proxify<T>(namespace: string): T {
    /* Implementation Hidden */
}

```