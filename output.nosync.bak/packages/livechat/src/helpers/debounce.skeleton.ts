## File: packages/livechat/src/helpers/debounce.ts

```typescript
export const debounce = <TFunction extends (...args: any[]) => any>(
	func: TFunction,
	delay: number,
): {
	(this: ThisParameterType<TFunction>, ...args: Parameters<TFunction>): ThisParameterType<TFunction>;
	stop: () => void;
} => {
    /* Implementation Hidden */
};

```