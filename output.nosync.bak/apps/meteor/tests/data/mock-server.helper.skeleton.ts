## File: apps/meteor/tests/data/mock-server.helper.ts

```typescript
import { MOCK_SERVER_URL } from '../e2e/config/constants';

type Decision = 'DECISION_PERMIT' | 'DECISION_DENY';

export const mockServerSet = async (method: string, path: string, body: unknown, statusCode = 200, times = 0): Promise<void> => {
    /* Implementation Hidden */
};

export const mockServerSetMany = async (
	mocks: Array<{ method: string; path: string; body: unknown; statusCode?: number; times?: number }>,
): Promise<void> => {
    /* Implementation Hidden */
};

export const mockServerReset = async (): Promise<void> => {
    /* Implementation Hidden */
};

export const mockServerHealthy = async (): Promise<boolean> => {
    /* Implementation Hidden */
};

export const seedDefaultMocks = async () => {
    /* Implementation Hidden */
};

export const seedGetDecisionBulk = async (
	responses: Array<{ resourceDecisions: Array<{ decision: Decision; ephemeralResourceId?: string }> }>,
	times = 0,
) => {
    /* Implementation Hidden */
};

export const seedGetEntitlements = async (fqnMap: Record<string, unknown>, times = 0) => {
    /* Implementation Hidden */
};

export const seedBulkDecisionByEntity = async (permitValues: string[], defaultDecision: Decision = 'DECISION_DENY') => {
    /* Implementation Hidden */
};

```