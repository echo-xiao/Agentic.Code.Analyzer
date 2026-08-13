## File: packages/apps/src/server/runtime/base/LivenessManager.ts

```typescript
import type { ChildProcess } from 'node:child_process';
import { EventEmitter } from 'node:stream';

import type { BaseRuntimeSubprocessController } from './BaseRuntimeSubprocessController';
import type { ProcessMessenger } from './ProcessMessenger';

export const COMMAND_PING = '_zPING';

const defaultOptions: LivenessManager['options'] = {
	pingTimeoutInMS: 1000,
	pingIntervalInMS: 10000,
	consecutiveTimeoutLimit: 4,
	maxRestarts: Infinity,
	restartAttemptDelayInMS: 1000,
};

/**
 * Responsible for pinging the subprocess and for restarting it
 * if something doesn't look right
 */
export class LivenessManager {
	private readonly controller: BaseRuntimeSubprocessController;

	private readonly messenger: ProcessMessenger;

	private readonly debug: debug.Debugger;

	private readonly options: {
		// How long should we wait for a response to the ping request
		pingTimeoutInMS: number;

		// How long is the delay between ping messages
		pingIntervalInMS: number;

		// Limit of times the process can timeout the ping response before we consider it as unresponsive
		consecutiveTimeoutLimit: number;

		// Limit of times we can try to restart a process
		maxRestarts: number;

		// Time to delay the next restart attempt after a failed one
		restartAttemptDelayInMS: number;
	};

	private subprocess: ChildProcess;

	private watchdogTimeout: NodeJS.Timeout | null = null;

	private lastHeartbeatTimestamp = NaN;

	// A promise tracking the current ping process - used mostly for testing
	private pendingPing: Promise<boolean> | null;

	// This is the perfect use-case for an AbortController, but it's experimental in Node 14.x
	private pingAbortController: EventEmitter;

	private pingTimeoutConsecutiveCount = 0;

	private restartCount = 0;

	private restartLog: Record<string, unknown>[] = [];

	constructor(
		deps: {
			controller: BaseRuntimeSubprocessController;
			messenger: ProcessMessenger;
			debug: debug.Debugger;
		},
		options: Partial<LivenessManager['options']> = {},
	) {
        /* Implementation Hidden */
    }

	public getRuntimeData() {
        /* Implementation Hidden */
    }

	public attach(subprocess: ChildProcess) {
        /* Implementation Hidden */
    }

	public start() {
        /* Implementation Hidden */
    }

	public stop() {
        /* Implementation Hidden */
    }

	public getPendingPing() {
        /* Implementation Hidden */
    }

	/**
	 * Start up the process of ping/pong for liveness check
	 *
	 * The message exchange does not use JSON RPC as it adds a lot of overhead
	 * with the creation and encoding of a full object for transfer. By using a
	 * string the process is less intensive.
	 */
	private ping() {
        /* Implementation Hidden */
    }

	private handleError(err: Error) {
        /* Implementation Hidden */
    }

	private handleExit(exitCode: number, signal: string) {
        /* Implementation Hidden */
    }

	private async restartProcess(reason: string, source = 'liveness-manager') {
        /* Implementation Hidden */
    }
}

```