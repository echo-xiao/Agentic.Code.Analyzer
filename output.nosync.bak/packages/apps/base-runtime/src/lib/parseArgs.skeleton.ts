## File: packages/apps/base-runtime/src/lib/parseArgs.ts

```typescript
import { parseArgs as $parseArgs } from 'node:util';

export type ParsedArgs = {
	subprocess: string;
	spawnId: number;
	metricsReportFrequencyInMs?: number;
};

export function parseArgs(args: string[]): ParsedArgs {
    /* Implementation Hidden */
}

```