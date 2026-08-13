## File: scripts/todo-issue/src/matcher.ts

```typescript
import type { GitHubIssue, MatchResult, TodoItem } from './types';
import { isSimilar } from './similarity';

export function matchTodos(found: TodoItem[], existing: GitHubIssue[]): MatchResult {
    /* Implementation Hidden */
}

```