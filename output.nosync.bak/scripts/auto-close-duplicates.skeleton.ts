## File: scripts/auto-close-duplicates.ts

```typescript
#!/usr/bin/env bun

interface GitHubIssue {
	number: number;
	title: string;
	user: { id: number };
	created_at: string;
}

interface GitHubComment {
	id: number;
	body: string;
	created_at: string;
	user: { type: string; id: number };
}

interface GitHubReaction {
	user: { id: number };
	content: string;
}

async function githubRequest<T>(endpoint: string, token: string, method: string = 'GET', body?: any): Promise<T> {
    /* Implementation Hidden */
}

function extractDuplicateIssueNumber(commentBody: string): number | null {
    /* Implementation Hidden */
}

async function closeIssueAsDuplicate(
	owner: string,
	repo: string,
	issueNumber: number,
	duplicateOfNumber: number,
	token: string,
): Promise<void> {
    /* Implementation Hidden */
}

async function autoCloseDuplicates(): Promise<void> {
    /* Implementation Hidden */
}

autoCloseDuplicates().catch(console.error);

// Make it a module
export {};

```