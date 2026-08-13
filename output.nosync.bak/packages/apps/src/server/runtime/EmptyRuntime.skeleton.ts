## File: packages/apps/src/server/runtime/EmptyRuntime.ts

```typescript
import { EventEmitter } from 'node:events';

import { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';

import type { IRuntimeController, RuntimeRequestOptions } from './IRuntimeController';

export class EmptyRuntime extends EventEmitter implements IRuntimeController {
	private readonly appId: string;

	constructor(appId: string) {
        /* Implementation Hidden */
    }

	/**
	 * Returns a disabled status since this is an empty runtime
	 */
	public async getStatus(): Promise<AppStatus> {
        /* Implementation Hidden */
    }

	/**
	 * Stub implementation that throws an error since this runtime cannot handle requests
	 */
	public async sendRequest(message: { method: string; params: any[] }, _options?: RuntimeRequestOptions): Promise<unknown> {
        /* Implementation Hidden */
    }

	/**
	 * Stub implementation for setting up the runtime
	 */
	public async setupApp(): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Stub implementation for stopping the runtime
	 */
	public async stopApp(): Promise<void> {
        /* Implementation Hidden */
    }

	/**
	 * Get the app ID associated with this runtime
	 */
	public getAppId(): string {
        /* Implementation Hidden */
    }
}

```