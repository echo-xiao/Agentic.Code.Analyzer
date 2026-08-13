## File: packages/livechat/src/helpers/createClassName.ts

```typescript
const flatMap = <T, U>(arr: T[], mapFunc: (elem: T, index: number, arr: T[]) => U | U[]) => {
    /* Implementation Hidden */
};

export const createClassName = (
	styles: Record<string, string>,
	elementName: string,
	modifiers = {},
	classes: (string | undefined)[] = [],
) => {
    /* Implementation Hidden */
};

```