## File: packages/apps/base-runtime/src/lib/messenger.ts

```typescript
import EventEmitter from 'node:events';

import * as jsonrpc from 'jsonrpc-lite';

import { encoder } from './codec';
import type { RequestContext } from './requestContext';

export type RequestDescriptor = Pick<jsonrpc.RequestObject, 'method' | 'params'>;

export type NotificationDescriptor = Pick<jsonrpc.NotificationObject, 'method' | 'params'>;

export type SuccessResponseDescriptor = Pick<jsonrpc.SuccessObject, 'id' | 'result'>;

export type ErrorResponseDescriptor = Pick<jsonrpc.ErrorObject, 'id' | 'error'>;

export type JsonRpcRequest = jsonrpc.IParsedObjectRequest | jsonrpc.IParsedObjectNotification;
export type JsonRpcResponse = jsonrpc.IParsedObjectSuccess | jsonrpc.IParsedObjectError;

export function isRequest(message: jsonrpc.IParsedObject): message is JsonRpcRequest {
    /* Implementation Hidden */
}

export function isResponse(message: jsonrpc.IParsedObject): message is JsonRpcResponse {
    /* Implementation Hidden */
}

export function isErrorResponse(message: jsonrpc.JsonRpc): message is jsonrpc.ErrorObject {
    /* Implementation Hidden */
}

const COMMAND_PONG = '_zPONG';

export const RPCResponseObserver = new EventEmitter();

class MessageQueue {
	private queue: Uint8Array[] = [];

	private isProcessing = false;

	private async processQueue() {
        /* Implementation Hidden */
    }

	public enqueue(message: jsonrpc.JsonRpc | typeof COMMAND_PONG) {
        /* Implementation Hidden */
    }

	public getCurrentSize() {
        /* Implementation Hidden */
    }
}

export const Queue = new MessageQueue();

/**
 * A platform-dependent component responsible for delivering encoded messages to
 * the host that controls this runtime.
 *
 * Each runtime platform is expected to provide its own implementation and
 * inject it via {@link setTransport}.
 */
export type Transport = {
	send(message: Uint8Array): Promise<void>;
};

/**
 * The default transport. It discards every message, and is used until a
 * platform injects its own transport via {@link setTransport}.
 */
export const noopTransport: Transport = {
	send: () => Promise.resolve(),
};

let transport: Transport = noopTransport;

/**
 * Injects the transport implementation to be used when sending messages.
 *
 * Platforms must call this during bootstrap to wire up the appropriate
 * transport. Until then, messages are discarded by the default no-op transport.
 */
export function setTransport(newTransport: Transport): void {
    /* Implementation Hidden */
}

export function parseMessage(message: string | Record<string, unknown>) {
    /* Implementation Hidden */
}

export async function sendInvalidRequestError(): Promise<void> {
    /* Implementation Hidden */
}

export async function sendInvalidParamsError(id: jsonrpc.ID): Promise<void> {
    /* Implementation Hidden */
}

export async function sendParseError(): Promise<void> {
    /* Implementation Hidden */
}

export async function sendMethodNotFound(id: jsonrpc.ID): Promise<void> {
    /* Implementation Hidden */
}

export async function errorResponse(
	{ error: { message, code = -32000, data = {} }, id }: ErrorResponseDescriptor,
	req?: RequestContext,
): Promise<void> {
    /* Implementation Hidden */
}

export async function successResponse({ id, result }: SuccessResponseDescriptor, req: RequestContext): Promise<void> {
    /* Implementation Hidden */
}

export function pongResponse(): Promise<void> {
    /* Implementation Hidden */
}

export async function sendRequest(requestDescriptor: RequestDescriptor): Promise<jsonrpc.SuccessObject> {
    /* Implementation Hidden */
}

export function sendNotification({ method, params }: NotificationDescriptor) {
    /* Implementation Hidden */
}

export function log(params: jsonrpc.RpcParams) {
    /* Implementation Hidden */
}

```