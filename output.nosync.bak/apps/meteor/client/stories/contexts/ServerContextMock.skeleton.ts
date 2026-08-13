## File: apps/meteor/client/stories/contexts/ServerContextMock.tsx

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import type { ServerMethodName, ServerMethodParameters, ServerMethodReturn } from '@rocket.chat/ddp-client';
import type { Method, OperationParams, OperationResult, PathFor, PathPattern } from '@rocket.chat/rest-typings';
import type { UploadResult } from '@rocket.chat/ui-contexts';
import { ServerContext } from '@rocket.chat/ui-contexts';
import type { ContextType, ReactNode } from 'react';
import { useContext, useMemo } from 'react';
import { action } from 'storybook/actions';

const logAction = action('ServerContext');

const randomDelay = (): Promise<UploadResult> => new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

const uploadToEndpoint = (endpoint: PathFor<'POST'>, formData: any): Promise<UploadResult> =>
	Promise.resolve(logAction('uploadToEndpoint', endpoint, formData)).then(randomDelay);

const getStream = (
	streamName: string,
	options: {
		retransmit?: boolean | undefined;
		retransmitToSelf?: boolean | undefined;
	} = {},
): (<TEvent extends unknown[]>(eventName: string, callback: (...event: TEvent) => void) => () => void) => {
    /* Implementation Hidden */
};

type Operations = {
	[TOperation in Method extends infer TMethod
		? TMethod extends Method
			? PathPattern extends infer TPathPattern
				? TPathPattern extends PathPattern
					? {
							id: `${TMethod} ${TPathPattern extends `/${string}` ? TPathPattern : `/v1/${TPathPattern}`}`;
							fn: (
								params: void extends OperationParams<TMethod, TPathPattern> ? void : OperationParams<TMethod, TPathPattern>,
							) => Promise<void extends OperationResult<TMethod, TPathPattern> ? Serialized<OperationResult<TMethod, TPathPattern>> : void>;
						}
					: never
				: never
			: never
		: never as TOperation['id']]: TOperation['fn'];
};

export type ServerContextMockProps = Omit<Partial<ContextType<typeof ServerContext>>, 'callEndpoint' | 'callMethod'> & {
	children: ReactNode;
	baseURL?: string | URL;
	callEndpoint?: {
		[TOperationID in keyof Operations]?: Operations[TOperationID] | 'infinite' | 'errored';
	};
	callMethod?: {
		[TMethodName in ServerMethodName]?:
			| ((...args: ServerMethodParameters<TMethodName>) => Promise<ServerMethodReturn<TMethodName>>)
			| 'infinite'
			| 'errored';
	};
};

const ServerContextMock = ({ children, baseURL, callEndpoint = {}, callMethod = {}, ...overrides }: ServerContextMockProps) => {
    /* Implementation Hidden */
};

export default ServerContextMock;

```