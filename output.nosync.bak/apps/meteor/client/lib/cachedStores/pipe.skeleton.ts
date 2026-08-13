## File: apps/meteor/client/lib/cachedStores/pipe.ts

```typescript
interface IPipeReturn<D> {
	slice(skip: number, limit: number): IPipeReturn<D>;
	sortByField(fieldName: keyof D, direction?: 1 | -1, fallback?: Array<keyof D>): IPipeReturn<D>;
	sortByField(fieldName: Array<keyof D>, direction?: 1 | -1, fallback?: Array<keyof D>): IPipeReturn<D>;
	apply(): D[];
	pipe(p: IPipeReturn<D>): IPipeReturn<D>;
}

interface IPipeReturnNoInitialData<D> {
	slice(skip: number, limit: number): IPipeReturnNoInitialData<D>;
	sortByField(fieldName: keyof D, direction?: 1 | -1, fallback?: Array<keyof D>): IPipeReturnNoInitialData<D>;
	sortByField(fieldName: Array<keyof D>, direction?: 1 | -1): IPipeReturnNoInitialData<D>;
	apply(arg: D[]): D[];
	pipe(p: IPipeReturnNoInitialData<D>): IPipeReturnNoInitialData<D>;
}

type PipeFunction<D> = (arg: D[]) => D[];

const merge =
	<D>(fn: PipeFunction<D>, inner: PipeFunction<D>): PipeFunction<D> =>
	(args) =>
		fn(inner(args));

export function pipe<D>(): IPipeReturnNoInitialData<D>;
export function pipe<D>(initialData: D[]): IPipeReturn<D>;
export function pipe<D>(initialData: D[], acc: PipeFunction<D>): IPipeReturn<D>;

export function pipe<D>(
	initialData?: any,
	acc: PipeFunction<D> = (arg) => [...arg],
): typeof initialData extends undefined ? IPipeReturnNoInitialData<D> : IPipeReturn<D> {
    /* Implementation Hidden */
}

```