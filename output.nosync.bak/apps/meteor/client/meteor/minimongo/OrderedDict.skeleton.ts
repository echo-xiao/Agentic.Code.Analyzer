## File: apps/meteor/client/meteor/minimongo/OrderedDict.ts

```typescript
type ElementType<TKey, TValue> = {
	key: TKey;
	value: TValue;
	next: ElementType<TKey, TValue> | null;
	prev: ElementType<TKey, TValue> | null;
};

function element<TKey, TValue>(
	key: TKey,
	value: TValue,
	next: ElementType<TKey, TValue> | null,
	prev: ElementType<TKey, TValue> | null = null,
): ElementType<TKey, TValue> {
    /* Implementation Hidden */
}

export class OrderedDict<TKey extends string, TValue> {
	private _dict: Record<string, ElementType<TKey, TValue>> = Object.create(null);

	private _first: ElementType<TKey, TValue> | null = null;

	private _last: ElementType<TKey, TValue> | null = null;

	private _size = 0;

	_k(key: TKey): string {
        /* Implementation Hidden */
    }

	empty(): boolean {
        /* Implementation Hidden */
    }

	size(): number {
        /* Implementation Hidden */
    }

	_linkEltIn(elt: ElementType<TKey, TValue>): void {
        /* Implementation Hidden */
    }

	_linkEltOut(elt: ElementType<TKey, TValue>): void {
        /* Implementation Hidden */
    }

	putBefore(key: TKey, item: TValue, before: TKey | null): void {
        /* Implementation Hidden */
    }

	append(key: TKey, item: TValue): void {
        /* Implementation Hidden */
    }

	remove(key: TKey): TValue {
        /* Implementation Hidden */
    }

	get(key: TKey): TValue | undefined {
        /* Implementation Hidden */
    }

	has(key: TKey): boolean {
        /* Implementation Hidden */
    }

	forEach(iter: (value: TValue, key: TKey, index: number) => void | typeof OrderedDict.BREAK, context?: null): void;

	forEach<TContext>(
		iter: (this: TContext, value: TValue, key: TKey, index: number) => void | typeof OrderedDict.BREAK,
		context: TContext,
	): void;

	forEach<TContext>(
		iter: (this: TContext | null, value: TValue, key: TKey, index: number) => void | typeof OrderedDict.BREAK,
		context: TContext | null = null,
	): void {
        /* Implementation Hidden */
    }

	async forEachAsync(
		asyncIter: (value: TValue, key: TKey, index: number) => Promise<void | typeof OrderedDict.BREAK>,
		context?: null,
	): Promise<void>;

	async forEachAsync<TContext>(
		asyncIter: (this: TContext, value: TValue, key: TKey, index: number) => Promise<void | typeof OrderedDict.BREAK>,
		context: TContext,
	): Promise<void>;

	async forEachAsync<TContext>(
		asyncIter: (this: TContext | null, value: TValue, key: TKey, index: number) => Promise<void | typeof OrderedDict.BREAK>,
		context: TContext | null = null,
	): Promise<void> {
        /* Implementation Hidden */
    }

	first(): TKey | undefined {
        /* Implementation Hidden */
    }

	firstValue(): TValue | undefined {
        /* Implementation Hidden */
    }

	last(): TKey | undefined {
        /* Implementation Hidden */
    }

	lastValue(): TValue | undefined {
        /* Implementation Hidden */
    }

	prev(key: TKey): TKey | null {
        /* Implementation Hidden */
    }

	next(key: TKey): TKey | null {
        /* Implementation Hidden */
    }

	moveBefore(key: TKey, before: TKey | null): void {
        /* Implementation Hidden */
    }

	indexOf(key: TKey): number {
        /* Implementation Hidden */
    }

	_checkRep(): void {
        /* Implementation Hidden */
    }

	static readonly BREAK = { break: true } as const;
}

```