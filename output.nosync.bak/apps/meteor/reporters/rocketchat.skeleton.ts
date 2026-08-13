## File: apps/meteor/reporters/rocketchat.ts

```typescript
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import fetch from 'node-fetch';

class RocketChatReporter implements Reporter {
	private url: string;

	private apiKey: string;

	private branch: string;

	private draft: boolean;

	private run: number;

	constructor(options: { url: string; apiKey: string; branch: string; draft: boolean; run: number }) {
        /* Implementation Hidden */
    }

	async onTestEnd(test: TestCase, result: TestResult) {
        /* Implementation Hidden */
    }
}

export default RocketChatReporter;

```