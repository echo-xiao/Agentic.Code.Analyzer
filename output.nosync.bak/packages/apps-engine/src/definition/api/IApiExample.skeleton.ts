## File: packages/apps-engine/src/definition/api/IApiExample.ts

```typescript
/**
 * Represents the parameters of an api example.
 */
export interface IApiExample {
	params?: { [key: string]: string };
	query?: { [key: string]: string };
	headers?: { [key: string]: string };
	content?: any;
}

/**
 * Decorator to describe api examples
 */
export function example(options: IApiExample) {
    /* Implementation Hidden */
}

```