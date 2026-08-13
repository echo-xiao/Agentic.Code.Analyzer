## File: apps/meteor/tests/data/livechat/utils.ts

```typescript
export type DummyResponse<T, E = 'wrapped'> = E extends 'wrapped' ? { body: { [k: string]: T } } : { body: T };

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
	[Property in Key]-?: Type[Property];
};

export const sleep = (ms: number) => {
    /* Implementation Hidden */
};

export const parseMethodResponse = (response: any) => {
    /* Implementation Hidden */
};

```