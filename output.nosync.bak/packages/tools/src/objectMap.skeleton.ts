## File: packages/tools/src/objectMap.ts

```typescript
export function objectMap<TObject extends Record<string, any> = Record<string, any>, K extends keyof TObject | string = keyof TObject>(
	object: TObject,
	cb: (value: { key: K; value: TObject[K] }) => { key: string | number | symbol; value: any } | undefined,
	recursive?: false,
): Record<string, any>;
export function objectMap<TObject extends Record<string, any> = Record<string, any>>(
	object: TObject,
	cb: (value: { key: string | number | symbol; value: any }) => { key: string | number | symbol; value: any } | undefined,
	recursive: true,
): Record<string, any>;
export function objectMap<TObject extends Record<string, any> = Record<string, any>, K extends keyof TObject | string = keyof TObject>(
	object: TObject,
	cb: (value: { key: K; value: any }) => { key: string | number | symbol; value: any } | undefined,
	recursive: false,
): Record<string, any>;
export function objectMap<TObject extends Record<string, any> = Record<string, any>, K extends keyof TObject | string = keyof TObject>(
	object: TObject,
	cb: (value: { key: K | string; value: any }) => { key: string | number | symbol; value: any } | undefined,
	recursive = false,
): Record<string, any> {
    /* Implementation Hidden */
}

```