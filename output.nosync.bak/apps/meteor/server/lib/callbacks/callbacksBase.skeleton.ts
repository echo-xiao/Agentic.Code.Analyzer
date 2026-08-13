## File: apps/meteor/server/lib/callbacks/callbacksBase.ts

```typescript
import type { Logger } from '@rocket.chat/logger';
import { Random } from '@rocket.chat/random';

import { compareByRanking } from '../../../lib/utils/comparisons';

enum CallbackPriority {
	HIGH = -1000,
	MEDIUM = 0,
	LOW = 1000,
}

type Callback<H> = {
	(item: unknown, constant?: unknown): Promise<unknown>;
	hook: H;
	id: string;
	priority: CallbackPriority;
	stack: string;
};

type CallbackTracker<H> = (callback: Callback<H>) => () => void;

type HookTracker<H> = (params: { hook: H; length: number }) => () => void;

export class Callbacks<
	TChainedCallbackSignatures extends {
		[key: string]: (item: any, constant?: any) => any;
	},
	TEventLikeCallbackSignatures extends {
		[key: string]: (item: any, constant?: any) => any;
	},
	THook extends string = keyof TChainedCallbackSignatures & keyof TEventLikeCallbackSignatures & string,
> {
	private logger: Logger | undefined = undefined;

	private trackCallback: CallbackTracker<THook> | undefined = undefined;

	private trackHook: HookTracker<THook> | undefined = undefined;

	private callbacks = new Map<THook, Callback<THook>[]>();

	private sequentialRunners = new Map<THook, (item: unknown, constant?: unknown) => Promise<unknown>>();

	private asyncRunners = new Map<THook, (item: unknown, constant?: unknown) => unknown>();

	readonly priority = CallbackPriority;

	setLogger(logger: Logger): void {
        /* Implementation Hidden */
    }

	setMetricsTrackers({ trackCallback, trackHook }: { trackCallback?: CallbackTracker<THook>; trackHook?: HookTracker<THook> }): void {
        /* Implementation Hidden */
    }

	private runOne(callback: Callback<THook>, item: unknown, constant: unknown): Promise<unknown> {
        /* Implementation Hidden */
    }

	private createSequentialRunner(hook: THook, callbacks: Callback<THook>[]): (item: unknown, constant?: unknown) => Promise<unknown> {
        /* Implementation Hidden */
    }

	private createAsyncRunner(_: THook, callbacks: Callback<THook>[]) {
        /* Implementation Hidden */
    }

	getCallbacks(hook: THook): Callback<THook>[] {
        /* Implementation Hidden */
    }

	setCallbacks(hook: THook, callbacks: Callback<THook>[]): void {
        /* Implementation Hidden */
    }

	/**
	 * Add a callback function to a hook
	 *
	 * @param hook the name of the hook
	 * @param callback the callback function
	 * @param priority the callback run priority (order)
	 * @param id human friendly name for this callback
	 */
	add<Hook extends keyof TEventLikeCallbackSignatures>(
		hook: Hook,
		callback: TEventLikeCallbackSignatures[Hook],
		priority?: CallbackPriority,
		id?: string,
	): () => void;

	add<Hook extends keyof TChainedCallbackSignatures>(
		hook: Hook,
		callback: TChainedCallbackSignatures[Hook],
		priority?: CallbackPriority,
		id?: string,
	): () => void;

	add<TItem, TConstant, TNextItem = TItem>(
		hook: THook,
		callback: (item: TItem, constant?: TConstant) => TNextItem,
		priority?: CallbackPriority,
		id?: string,
	): () => void;

	add(
		hook: THook,
		callback: (item: unknown, constant?: unknown) => unknown,
		priority = this.priority.MEDIUM,
		id = Random.id(),
	): () => void {
        /* Implementation Hidden */
    }

	/**
	 * Remove a callback from a hook
	 *
	 * @param hook the name of the hook
	 * @param id the callback's id
	 */
	remove(hook: THook, id: string): void {
        /* Implementation Hidden */
    }

	run<Hook extends keyof TEventLikeCallbackSignatures>(hook: Hook, ...args: Parameters<TEventLikeCallbackSignatures[Hook]>): Promise<void>;

	run<Hook extends keyof TChainedCallbackSignatures>(
		hook: Hook,
		...args: Parameters<TChainedCallbackSignatures[Hook]>
	): Promise<ReturnType<TChainedCallbackSignatures[Hook]>>;

	run<TItem, TConstant, TNextItem = TItem>(hook: THook, item: TItem, constant?: TConstant): Promise<TNextItem>;

	/**
	 * Successively run all of a hook's callbacks on an item
	 *
	 * @param hook the name of the hook
	 * @param item the post, comment, modifier, etc. on which to run the callbacks
	 * @param constant an optional constant that will be passed along to each callback
	 * @returns returns the item after it's been through all the callbacks for this hook
	 */
	run(hook: THook, item: unknown, constant?: unknown): Promise<unknown> {
        /* Implementation Hidden */
    }

	runAsync<Hook extends keyof TEventLikeCallbackSignatures>(hook: Hook, ...args: Parameters<TEventLikeCallbackSignatures[Hook]>): void;

	/**
	 * Successively run all of a hook's callbacks on an item, in async mode (only works on server)
	 *
	 * @param hook the name of the hook
	 * @param item the post, comment, modifier, etc. on which to run the callbacks
	 * @param constant an optional constant that will be passed along to each callback
	 * @returns the post, comment, modifier, etc. on which to run the callbacks
	 */
	runAsync(hook: THook, item: unknown, constant?: unknown): unknown {
        /* Implementation Hidden */
    }

	static create<F extends (item: any, constant?: any) => any | Promise<any>>(
		hook: string,
	): Cb<Parameters<F>[0], ReturnType<F>, Parameters<F>[1]>;

	static create<I, R, C = undefined>(hook: string): Cb<I, R, C> {
        /* Implementation Hidden */
    }
}

/**
 * Callback hooks provide an easy way to add extra steps to common operations.
 * @deprecated
 */
type Cb<I, R, C = undefined> = {
	add: (
		callback: (item: I, constant: C) => Promise<R | undefined | void> | R | undefined | void,
		priority?: CallbackPriority,
		id?: string,
	) => void;
	remove: (id: string) => void;
	run: (item: I, constant?: C) => Promise<R>;
};

```