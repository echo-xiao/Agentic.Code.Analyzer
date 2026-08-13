## File: scripts/todo-issue/src/index.ts

```typescript
#!/usr/bin/env bun

import type { Config, TodoItem } from './types';
import { extractTodos } from './diff';
import { matchTodos } from './matcher';
import { isSimilar } from './similarity';
import { fetchExistingIssues, getDiffFromApi, createIssue, closeIssue, updateIssue, addReferenceToIssue } from './github';

function loadConfig(): Config {
    /* Implementation Hidden */
}

function execGitDiff(args: string[]): string {
    /* Implementation Hidden */
}

async function getDiff(config: Config): Promise<{ diffText: string; resolvedHeadSha: string }> {
    /* Implementation Hidden */
}

async function run(): Promise<void> {
    /* Implementation Hidden */
}

run().catch((err) => {
	console.error('[FATAL]', err);
	process.exit(1);
});

```