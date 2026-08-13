## File: apps/meteor/tests/mocks/utils/FakeResponse.ts

```typescript
export class FakeResponse {
	private _body: string;

	status: number;

	headers: Record<string, string>;

	constructor(body: string, init: { status?: number; headers?: Record<string, string> } = {}) {
        /* Implementation Hidden */
    }

	get ok() {
		return this.status >= 200 && this.status < 300;
	}

	async json() {
        /* Implementation Hidden */
    }

	async text() {
        /* Implementation Hidden */
    }
}

```