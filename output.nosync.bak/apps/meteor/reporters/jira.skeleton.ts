## File: apps/meteor/reporters/jira.ts

```typescript
import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import fetch from 'node-fetch';

const LOG = '[JIRA reporter]';

/** Jira REST API v3 expects `description` as Atlassian Document Format, not a plain string. */
const EMPTY_ADF_DESCRIPTION = {
	type: 'doc',
	version: 1,
	content: [] as const,
};

class JIRAReporter implements Reporter {
	private url: string;

	private apiKey: string;

	private branch: string;

	private draft: boolean;

	private run: number;

	private headSha: string;

	private author: string;

	private run_url: string;

	private pr: number;

	constructor(options: {
		url: string;
		apiKey: string;
		branch: string;
		draft: boolean;
		run: number;
		headSha: string;
		author: string;
		run_url: string;
		pr: number;
	}) {
        /* Implementation Hidden */
    }

	private static async ensureJiraOk(response: Awaited<ReturnType<typeof fetch>>, context: string): Promise<void> {
        /* Implementation Hidden */
    }

	async onTestEnd(test: TestCase, result: TestResult) {
        /* Implementation Hidden */
    }

	private async _onTestEnd(test: TestCase, result: TestResult) {
        /* Implementation Hidden */
    }
}

export default JIRAReporter;

```