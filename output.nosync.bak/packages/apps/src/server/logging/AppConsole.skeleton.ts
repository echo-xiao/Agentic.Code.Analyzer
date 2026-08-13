## File: packages/apps/src/server/logging/AppConsole.ts

```typescript
import type { ILogEntry, ILogger } from '@rocket.chat/apps-engine/definition/accessors';
import { LogMessageSeverity } from '@rocket.chat/apps-engine/definition/accessors';
import type { AppMethod } from '@rocket.chat/apps-engine/definition/metadata';
import * as stackTrace from 'stack-trace';

import type { ILoggerStorageEntry } from './ILoggerStorageEntry';

export class AppConsole implements ILogger {
	public static toStorageEntry(appId: string, logger: AppConsole): ILoggerStorageEntry {
        /* Implementation Hidden */
    }

	public method: `${AppMethod}`;

	private entries: Array<ILogEntry>;

	private start: Date;

	constructor(method: `${AppMethod}`) {
        /* Implementation Hidden */
    }

	public debug(...items: Array<any>): void {
        /* Implementation Hidden */
    }

	public info(...items: Array<any>): void {
        /* Implementation Hidden */
    }

	public log(...items: Array<any>): void {
        /* Implementation Hidden */
    }

	public warn(...items: Array<any>): void {
        /* Implementation Hidden */
    }

	public error(...items: Array<any>): void {
        /* Implementation Hidden */
    }

	public success(...items: Array<any>): void {
        /* Implementation Hidden */
    }

	public getEntries(): Array<ILogEntry> {
        /* Implementation Hidden */
    }

	public getMethod(): `${AppMethod}` {
        /* Implementation Hidden */
    }

	public getStartTime(): Date {
        /* Implementation Hidden */
    }

	public getEndTime(): Date {
        /* Implementation Hidden */
    }

	public getTotalTime(): number {
        /* Implementation Hidden */
    }

	private addEntry(severity: LogMessageSeverity, caller: string, ...items: Array<any>): void {
        /* Implementation Hidden */
    }

	private getFunc(stack: Array<stackTrace.StackFrame>): string {
        /* Implementation Hidden */
    }
}

```