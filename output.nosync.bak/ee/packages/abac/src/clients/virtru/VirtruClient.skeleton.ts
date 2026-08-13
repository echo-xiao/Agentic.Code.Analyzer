## File: ee/packages/abac/src/clients/virtru/VirtruClient.ts

```typescript
import { serverFetch } from '@rocket.chat/server-fetch';

import { logger } from '../../logger';
import type { IVirtruPDPConfig, ITokenCache } from '../../pdp/types';

const virtruClientLogger = logger.section('VirtruClient');

export const HEALTH_CHECK_TIMEOUT = 5000;
const REQUEST_TIMEOUT = 10000;

type PublicVirtruConfig = Pick<IVirtruPDPConfig, 'baseUrl' | 'defaultEntityKey' | 'attributeNamespace' | 'clientId'>;

export class VirtruClient {
	private tokenCache: ITokenCache | null = null;

	private config: IVirtruPDPConfig;

	constructor(config: IVirtruPDPConfig) {
        /* Implementation Hidden */
    }

	updateConfig(config: IVirtruPDPConfig): void {
        /* Implementation Hidden */
    }

	getConfig(): PublicVirtruConfig {
        /* Implementation Hidden */
    }

	async isAvailable(): Promise<boolean> {
        /* Implementation Hidden */
    }

	private async getClientToken(): Promise<string> {
        /* Implementation Hidden */
    }

	async getClientTokenForHealthCheck(): Promise<string> {
        /* Implementation Hidden */
    }

	async apiCall<T>(endpoint: string, body: unknown): Promise<T> {
        /* Implementation Hidden */
    }
}

```