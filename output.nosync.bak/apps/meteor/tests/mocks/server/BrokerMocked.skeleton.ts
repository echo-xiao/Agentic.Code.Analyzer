## File: apps/meteor/tests/mocks/server/BrokerMocked.ts

```typescript
export class BrokerMocked {
	actions: Record<string, (...params: unknown[]) => Promise<unknown>> = {};

	services: Map<string, any> = new Map();

	async destroyService(name: string): Promise<void> {
        /* Implementation Hidden */
    }

	createService(instance: any): void {
        /* Implementation Hidden */
    }

	async call(method: string, data: any): Promise<any> {
        /* Implementation Hidden */
    }

	async broadcastToServices(): Promise<void> {
        /* Implementation Hidden */
    }

	async broadcast(): Promise<void> {
        /* Implementation Hidden */
    }

	async broadcastLocal(): Promise<void> {
        /* Implementation Hidden */
    }

	async nodeList(): Promise<any> {
        /* Implementation Hidden */
    }

	async start(): Promise<void> {
        /* Implementation Hidden */
    }

	mockServices(actions: Record<string, () => Promise<unknown>>) {
        /* Implementation Hidden */
    }
}

```