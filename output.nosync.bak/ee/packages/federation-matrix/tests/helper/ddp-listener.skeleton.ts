## File: ee/packages/federation-matrix/tests/helper/ddp-listener.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { DDPSDK } from '@rocket.chat/ddp-client';

import type { IRequestConfig } from '../../../../../apps/meteor/tests/data/users.helper';

/**
 * DDP Listener for catching ephemeral messages in federation tests
 *
 * This helper creates a DDP connection to listen for ephemeral messages
 * that are broadcast to a specific user. It's designed to work with
 * the federation test environment where the test runs separately from
 * the server.
 */
export class DDPListener {
	private sdk: DDPSDK | null = null;

	private ephemeralMessages: IMessage[] = [];

	private timeoutId: NodeJS.Timeout | null = null;

	private serverUrl: string;

	private userId: string;

	private authToken?: string;

	constructor(apiUrl: string, requestConfig: IRequestConfig) {
        /* Implementation Hidden */
    }

	/**
	 * Connect to the DDP server and subscribe to ephemeral messages
	 */
	async connect(): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Wait for an ephemeral message with a specific content
	 * @param expectedContent - The expected message content (partial match)
	 * @param timeoutMs - Timeout in milliseconds (default: 5000)
	 * @param roomId - Optional room ID to validate the message belongs to the correct room
	 * @returns Promise that resolves with the message or rejects on timeout
	 */
	async waitForEphemeralMessage(expectedContent: string, timeoutMs = 5000, roomId?: string): Promise<IMessage> {
        /* Implementation Hidden */
    }

	/**
	 * Get all captured ephemeral messages
	 */
	getEphemeralMessages(): IMessage[] {
        /* Implementation Hidden */
    }

	/**
	 * Clear captured messages
	 */
	clearMessages(): void {
        /* Implementation Hidden */
    }

	/**
	 * Disconnect from DDP server
	 */
	disconnect(): void {
        /* Implementation Hidden */
    }
}

/**
 * Helper function to create and manage a DDP listener for federation tests
 * @param apiUrl - The Rocket.Chat API URL (e.g., 'http://rc1:3000' or 'https://rc1:3000')
 * @param requestConfig - The request configuration containing credentials
 * @returns DDPListener instance
 */
export function createDDPListener(apiUrl: string, requestConfig: IRequestConfig): DDPListener {
    /* Implementation Hidden */
}

```