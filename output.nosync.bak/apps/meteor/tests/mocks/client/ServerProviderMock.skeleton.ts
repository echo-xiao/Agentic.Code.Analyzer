## File: apps/meteor/tests/mocks/client/ServerProviderMock.tsx

```typescript
import type { Serialized } from '@rocket.chat/core-typings';
import type { Method, PathPattern, OperationParams, UrlParams, OperationResult } from '@rocket.chat/rest-typings';
import type { EndpointFunction, ServerContextValue } from '@rocket.chat/ui-contexts';
import { ServerContext } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import type { ContextType, ReactNode } from 'react';

type RegisterEndpoint = <TMethod extends Method, TPathPattern extends PathPattern>(
	method: TMethod,
	pathPattern: TPathPattern,
	endpoint: EndpointFunction<TMethod, TPathPattern>,
) => void;

type CallEndpoint = <TMethod extends Method, TPathPattern extends PathPattern>(args: {
	method: TMethod;
	pathPattern: TPathPattern;
	keys: UrlParams<TPathPattern>;
	params: OperationParams<TMethod, TPathPattern>;
}) => Promise<Serialized<OperationResult<TMethod, TPathPattern>>>;

// this function should be used to create a new instance of `callEndpoint` to be passed to the `ServerProviderMock`
// as the second parameter, it returns a function that can be used to register endpoint mocks
// the rest should be self-explanatory, just rely on the types.
export const makeCallEndpoint = (): [CallEndpoint, RegisterEndpoint] => {
    /* Implementation Hidden */
};

const absoluteUrl = () => ''; // to be implemented
const uploadToEndpoint = async () => {
    /* Implementation Hidden */
}; // to be implemented
const getStream = () => () => () => undefined; // to be implemented
const getStreamAll = () => () => () => undefined; // to be implemented
const callEndpoint = () => {
    /* Implementation Hidden */
}; // to be implemented
const writeStream = () => undefined; // to be implemented

const contextValue: ServerContextValue = {
	connected: true,
	status: 'connected',
	retryCount: 0,
	info: undefined,
	absoluteUrl,
	// callMethod,
	callEndpoint,
	uploadToEndpoint,
	getStream,
	getStreamAll,
	reconnect: () => undefined,
	disconnect: () => undefined,
	writeStream,
};

type ServerProviderMockProps = {
	children?: ReactNode;
	callEndpoint?: ContextType<typeof ServerContext>['callEndpoint'];
};

const ServerProviderMock = ({ children, callEndpoint }: ServerProviderMockProps) => {
    /* Implementation Hidden */
};

export default ServerProviderMock;

```