## File: packages/apps/src/server/runtime/base/BaseRuntimeSubprocessController.ts

```typescript
import * as child_process from 'node:child_process';
import * as path from 'node:path';
import { type Readable, EventEmitter } from 'node:stream';
import { inspect as utilInspect } from 'node:util';

import { AppStatus, AppStatusUtils } from '@rocket.chat/apps-engine/definition/AppStatus';
import type { AppMethod } from '@rocket.chat/apps-engine/definition/metadata';
import debugFactory from 'debug';
import * as jsonrpc from 'jsonrpc-lite';

import { LivenessManager } from './LivenessManager';
import { ProcessMessenger } from './ProcessMessenger';
import { bundleLegacyApp } from './bundler';
import { newDecoder } from './codec';
import type { AppManager } from '../../AppManager';
import type { AppBridges } from '../../bridges';
import type { IParseAppPackageResult } from '../../compiler';
import { AppConsole, type ILoggerStorageEntry } from '../../logging';
import type { AppAccessorManager, AppApiManager } from '../../managers';
import type { AppLogStorage, IAppStorageItem } from '../../storage';
import type { IRuntimeController } from '../IRuntimeController';

const inspect = (value: unknown) => utilInspect(value, { depth: 10, compact: true, breakLength: Infinity });

export const ALLOWED_ACCESSOR_METHODS = [
	'getConfigurationExtend',
	'getEnvironmentRead',
	'getEnvironmentWrite',
	'getConfigurationModify',
	'getReader',
	'getPersistence',
	'getHttp',
	'getModifier',
] as Array<
	keyof Pick<
		AppAccessorManager,
		| 'getConfigurationExtend'
		| 'getEnvironmentRead'
		| 'getEnvironmentWrite'
		| 'getConfigurationModify'
		| 'getReader'
		| 'getPersistence'
		| 'getHttp'
		| 'getModifier'
	>
>;

const COMMAND_PONG = '_zPONG';

export const JSONRPC_METHOD_NOT_FOUND = -32601;

function getRuntimeTimeout() {
    /* Implementation Hidden */
}

function isValidOrigin(accessor: string): accessor is (typeof ALLOWED_ACCESSOR_METHODS)[number] {
    /* Implementation Hidden */
}

/**
 * Resolves the absolute path to @rocket.chat/apps-engine's src/ directory.
 * Uses require.resolve so it works regardless of the runtime environment
 * (monorepo dev, Meteor bundle, standalone node_modules).
 */
export function getAppsEngineDir(): string {
    /* Implementation Hidden */
}

type AbortFunction = (reason?: any) => void;

/**
 * Describes how to spawn a subprocess for a given platform runtime.
 */
export type ProcessConfiguration = {
	command: string;
	args: string[];
	options: child_process.SpawnOptions;
};

/**
 * Holds the platform-agnostic logic for controlling an app subprocess: spawning,
 * killing, restarting, liveness, and the full JSON-RPC message loop (accessor,
 * bridge, result and error handling).
 *
 * The only platform-specific concern - how to actually launch the subprocess for
 * a given runtime (Deno, Node, ...) - is delegated to {@link buildProcessConfiguration},
 * which specialized subclasses must implement. Any additional per-platform setup
 * (config generation, symlinks, path resolution) should happen in the subclass
 * constructor after calling `super()`.
 */
export abstract class BaseRuntimeSubprocessController extends EventEmitter implements IRuntimeController {
	private process: child_process.ChildProcess | undefined;

	private state: 'uninitialized' | 'ready' | 'invalid' | 'restarting' | 'unknown' | 'stopped';

	/**
	 * Incremental id that keeps track of how many times we've spawned a process for this app
	 */
	protected spawnId = 0;

	protected readonly debug: debug.Debugger;

	private readonly options = {
		timeout: getRuntimeTimeout(),
	};

	private readonly accessors: AppAccessorManager;

	private readonly api: AppApiManager;

	private readonly logStorage: AppLogStorage;

	private readonly bridges: AppBridges;

	private readonly messenger: ProcessMessenger;

	private readonly livenessManager: LivenessManager;

	protected readonly tempFilePath: string;

	protected readonly appsEnginePath: string;

	constructor(
		// Human-readable name of the platform runtime (e.g. 'deno', 'node'), used for logging
		private readonly runtimeName: string,
		manager: AppManager,
		// We need to keep the appSource around in case the subprocess needs to be restarted
		protected readonly appPackage: IParseAppPackageResult,
		private readonly storageItem: IAppStorageItem,
	) {
        /* Implementation Hidden */
    }

	/**
	 * Builds the command, arguments and spawn options used to launch a subprocess
	 * for the concrete platform runtime.
	 *
	 * SECURITY: implementations must ensure they fully control the command, the
	 * arguments and the script that will be executed.
	 */
	protected abstract buildProcessConfiguration(): ProcessConfiguration;

	public spawnProcess(): void {
        /* Implementation Hidden */
    }

	/**
	 * Attempts to kill the process currently controlled by this controller
	 *
	 * @returns boolean - if a process has been killed or not
	 */
	public async killProcess(): Promise<boolean> {
        /* Implementation Hidden */
    }

	// Debug purposes, could be deleted later
	emit(eventName: string | symbol, ...args: any[]): boolean {
        /* Implementation Hidden */
    }

	public getProcessState() {
        /* Implementation Hidden */
    }

	public async getStatus(): Promise<AppStatus> {
        /* Implementation Hidden */
    }

	public async setupApp() {
        /* Implementation Hidden */
    }

	public async stopApp() {
        /* Implementation Hidden */
    }

	public async restartApp() {
        /* Implementation Hidden */
    }

	public getAppId(): string {
        /* Implementation Hidden */
    }

	public async sendRequest(message: Pick<jsonrpc.RequestObject, 'method' | 'params'>, options = this.options): Promise<unknown> {
        /* Implementation Hidden */
    }

	private waitUntilReady(): Promise<void> {
        /* Implementation Hidden */
    }

	private waitForResponse(req: jsonrpc.RequestObject, options = this.options): { abort: AbortFunction; promise: Promise<unknown> } {
        /* Implementation Hidden */
    }

	private onReady(): void {
        /* Implementation Hidden */
    }

	/**
	 * Listeners need to be setup every time the reference
	 * in `this.process` changes, i.e. every time the subprocess
	 * is restarted
	 */
	private setupListeners(): void {
        /* Implementation Hidden */
    }

	// Probable should extract this to a separate file
	private async handleAccessorMessage({ payload: { method, id, params } }: jsonrpc.IParsedObjectRequest): Promise<jsonrpc.SuccessObject> {
        /* Implementation Hidden */
    }

	private async handleBridgeMessage({
		payload: { method, id, params },
	}: jsonrpc.IParsedObjectRequest): Promise<jsonrpc.SuccessObject | jsonrpc.ErrorObject> {
        /* Implementation Hidden */
    }

	private async handleIncomingMessage(message: jsonrpc.IParsedObjectNotification | jsonrpc.IParsedObjectRequest): Promise<void> {
        /* Implementation Hidden */
    }

	private async logUnhandledError(
		method: `${AppMethod.RUNTIME_UNCAUGHT_EXCEPTION | AppMethod.RUNTIME_UNHANDLED_REJECTION}`,
		message: jsonrpc.IParsedObjectRequest | jsonrpc.IParsedObjectNotification,
	) {
        /* Implementation Hidden */
    }

	private async handleResultMessage(message: jsonrpc.IParsedObjectError | jsonrpc.IParsedObjectSuccess): Promise<void> {
        /* Implementation Hidden */
    }

	private async parseStdout(stream: Readable): Promise<void> {
        /* Implementation Hidden */
    }

	private async parseError(chunk: Buffer): Promise<void> {
        /* Implementation Hidden */
    }
}

```