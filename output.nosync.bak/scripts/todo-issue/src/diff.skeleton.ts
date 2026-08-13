## File: scripts/todo-issue/src/diff.ts

```typescript
import parseDiff from 'parse-diff';
import type { Change } from 'parse-diff';
import type { TodoItem } from './types';

const KEYWORD = 'TODO';
const EXCLUDE_PATTERN = /(^|\/)node_modules\//;
const DEFAULT_LABEL = 'todo';

const MENTION_REGEX = /\B@([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})/g;

function extractMentions(text: string): { cleaned: string; mentions: string[] } {
    /* Implementation Hidden */
}

function extractLabels(title: string): { cleaned: string; labels: string[] } {
    /* Implementation Hidden */
}

const TODO_LINE_REGEX = new RegExp(`^\\s*\\W+\\s*${KEYWORD}\\b`, 'i');

function extractBody(changes: Change[], startIndex: number, prefix: string): string | false {
    /* Implementation Hidden */
}

export function extractTodos(diffText: string): TodoItem[] {
    /* Implementation Hidden */
}

```