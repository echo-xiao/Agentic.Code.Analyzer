## File: scripts/todo-issue/src/github.ts

```typescript
import type { Config, GitHubIssue, TodoItem } from './types';

const BLOB_LINES = 5;
const DEFAULT_LABEL_COLOR = '00B0D8';
const RATE_LIMIT_BUFFER = 5;

let rateLimitRemaining = Infinity;
let rateLimitResetAt = 0;

async function waitForRateLimit(): Promise<void> {
    /* Implementation Hidden */
}

function trackRateLimit(response: Response): void {
    /* Implementation Hidden */
}

async function githubRequest<T>(endpoint: string, token: string, method = 'GET', body?: unknown): Promise<T> {
    /* Implementation Hidden */
}

async function graphqlRequest<T>(query: string, variables: Record<string, unknown>, token: string): Promise<T> {
    /* Implementation Hidden */
}

export async function getDiffFromApi(endpoint: string, token: string): Promise<string> {
    /* Implementation Hidden */
}

export async function fetchExistingIssues(config: Config): Promise<GitHubIssue[]> {
    /* Implementation Hidden */
}

function buildIssueBody(todo: TodoItem, owner: string, repo: string, sha: string): string {
    /* Implementation Hidden */
}

function buildIssueBodyFromGroup(todos: TodoItem[], owner: string, repo: string, sha: string): string {
    /* Implementation Hidden */
}

async function ensureLabelExists(owner: string, repo: string, label: string, token: string): Promise<void> {
    /* Implementation Hidden */
}

function mergeTodoGroup(todos: TodoItem[]): TodoItem {
    /* Implementation Hidden */
}

export async function createIssue(todoOrGroup: TodoItem | TodoItem[], config: Config, sha: string): Promise<void> {
    /* Implementation Hidden */
}

export async function closeIssue(todo: TodoItem, config: Config, sha: string): Promise<void> {
    /* Implementation Hidden */
}

export async function updateIssue(todo: TodoItem, config: Config): Promise<void> {
    /* Implementation Hidden */
}

export async function addReferenceToIssue(todo: TodoItem, config: Config, sha: string): Promise<void> {
    /* Implementation Hidden */
}

```