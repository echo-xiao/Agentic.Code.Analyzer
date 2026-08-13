## File: packages/ui-contexts/src/hooks/useEndpoint.ts

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import type { Method, OperationParams, OperationResult, PathPattern, UrlParams } from '@rocket.chat/rest-typings';
import { useCallback, useContext, useRef } from 'react';

import { ServerContext } from '../ServerContext';

type EndpointOptions = {
	signal?: AbortSignal;
};

export type EndpointFunction<TMethod extends Method, TPathPattern extends PathPattern> =
	undefined extends OperationParams<TMethod, TPathPattern>
		? (
				params?: OperationParams<TMethod, TPathPattern>,
				options?: EndpointOptions,
			) => Promise<Serialized<OperationResult<TMethod, TPathPattern>>>
		: (
				params: OperationParams<TMethod, TPathPattern>,
				options?: EndpointOptions,
			) => Promise<Serialized<OperationResult<TMethod, TPathPattern>>>;

export function useEndpoint<TMethod extends Method, TPathPattern extends PathPattern>(
	method: TMethod,
	pathPattern: TPathPattern,
	...[keys]: NoInfer<undefined extends UrlParams<TPathPattern> ? [keys?: UrlParams<TPathPattern>] : [keys: UrlParams<TPathPattern>]>
): EndpointFunction<TMethod, TPathPattern> {
    /* Implementation Hidden */
}

```