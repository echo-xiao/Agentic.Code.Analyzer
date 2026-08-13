## File: packages/apps/base-runtime/src/lib/logger.ts

```typescript
import type { ILogEntry } from '@rocket.chat/apps-engine/definition/accessors/ILogEntry';
import type { ILogger } from '@rocket.chat/apps-engine/definition/accessors/ILogger';
import type { AppMethod } from '@rocket.chat/apps-engine/definition/metadata/AppMethod';
import stackTrace from 'stack-trace';

import { AppObjectRegistry } from '../AppObjectRegistry';

export interface IStackFrame {
	getTypeName(): string;
	getFunctionName(): string;
	getMethodName(): string;
	getFileName(): string;
	getLineNumber(): number;
	getColumnNumber(): number;
	isNative(): boolean;
	isConstructor(): boolean;
}

enum LogMessageSeverity {
	DEBUG = 'debug',
	INFORMATION = 'info',
	LOG = 'log',
	WARNING = 'warning',
	ERROR = 'error',
	SUCCESS = 'success',
}

type Entry = {
	caller: string;
	severity: LogMessageSeverity;
	method: string;
	timestamp: Date;
	args: Array<unknown>;
};

interface ILoggerStorageEntry {
	appId: string;
	method: string;
	entries: Array<Entry>;
	startTime: Date;
	endTime: Date;
	totalTime: number;
	_createdAt: Date;
}

export class Logger implements ILogger {
	public method: `${AppMethod}`;

	private entries: Array<Entry>;

	private start: Date;

	constructor(method: string) {
        /* Implementation Hidden */
    }

	public debug(...args: Array<unknown>): void {
        /* Implementation Hidden */
    }

	public info(...args: Array<unknown>): void {
        /* Implementation Hidden */
    }

	public log(...args: Array<unknown>): void {
        /* Implementation Hidden */
    }

	public warn(...args: Array<unknown>): void {
        /* Implementation Hidden */
    }

	public error(...args: Array<unknown>): void {
        /* Implementation Hidden */
    }

	public success(...args: Array<unknown>): void {
        /* Implementation Hidden */
    }

	private addEntry(severity: LogMessageSeverity, caller: string, ...items: Array<unknown>): void {
        /* Implementation Hidden */
    }

	private getStack(stack: Array<IStackFrame>): string {
        /* Implementation Hidden */
    }

	public getTotalTime(): number {
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

	public hasEntries(): boolean {
        /* Implementation Hidden */
    }

	public getLogs(): ILoggerStorageEntry {
        /* Implementation Hidden */
    }
}

```