## File: packages/livechat/src/helpers/throttle.ts

```typescript
export const throttle = <TFunction extends (...args: any[]) => any>(
	func: TFunction,
	limit: number,
): {
	(this: ThisParameterType<TFunction>, ...args: Parameters<TFunction>): void;
} => {
    /* Implementation Hidden */
};

```