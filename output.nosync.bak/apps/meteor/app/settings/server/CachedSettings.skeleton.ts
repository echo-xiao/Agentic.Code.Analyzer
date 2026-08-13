## File: apps/meteor/app/settings/server/CachedSettings.ts

```typescript
import type { ISetting, SettingValue } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import _ from 'underscore';

import { SystemLogger } from '../../../server/lib/logger/system';

const warn = process.env.NODE_ENV === 'development' || process.env.TEST_MODE;

type SettingsConfig = {
	debounce: number;
};

type OverCustomSettingsConfig = Partial<SettingsConfig>;

export interface ICachedSettings {
	/*
	 * @description: The settings object as ready
	 */
	initialized(): void;

	has(_id: ISetting['_id']): boolean;

	getSetting(_id: ISetting['_id']): ISetting | undefined;

	get<T extends SettingValue = SettingValue>(_id: ISetting['_id']): T;

	getByRegexp<T extends SettingValue = SettingValue>(_id: RegExp): [string, T][];

	watchMultiple<T extends SettingValue = SettingValue>(_id: ISetting['_id'][], callback: (settings: T[]) => void): () => void;

	watch<T extends SettingValue = SettingValue>(_id: ISetting['_id'], cb: (args: T) => void, config?: OverCustomSettingsConfig): () => void;

	watchOnce<T extends SettingValue = SettingValue>(
		_id: ISetting['_id'],
		cb: (args: T) => void,
		config?: OverCustomSettingsConfig,
	): () => void;

	change<T extends SettingValue = SettingValue>(
		_id: ISetting['_id'],
		callback: (args: T) => void,
		config?: OverCustomSettingsConfig,
	): () => void;

	changeMultiple<T extends SettingValue = SettingValue>(
		_ids: ISetting['_id'][],
		callback: (settings: T[]) => void,
		config?: OverCustomSettingsConfig,
	): () => void;

	changeOnce<T extends SettingValue = SettingValue>(
		_id: ISetting['_id'],
		callback: (args: T) => void,
		config?: OverCustomSettingsConfig,
	): () => void;

	set(record: ISetting): void;

	getConfig(config?: OverCustomSettingsConfig): SettingsConfig;

	watchByRegex(regex: RegExp, cb: (...args: [string, SettingValue]) => void, config?: OverCustomSettingsConfig): () => void;

	changeByRegex(regex: RegExp, callback: (...args: [string, SettingValue]) => void, config?: OverCustomSettingsConfig): () => void;

	onReady(cb: () => void): void;
}

/**
 * Class responsible for setting up the settings, cache and propagation changes
 * Should be agnostic to the actual settings implementation, running on meteor or standalone
 *
 * You should not instantiate this class directly, only for testing purposes
 *
 * @extends Emitter
 * @alpha
 */
export class CachedSettings
	extends Emitter<
		{
			'*': [string, SettingValue];
		} & {
			ready: undefined;
			[k: string]: SettingValue;
		}
	>
	implements ICachedSettings
{
	ready = false;

	store = new Map<string, ISetting>();

	/**
	 * The settings object as ready
	 */
	initialized(): void {
        /* Implementation Hidden */
    }

	/**
	 * returns if the setting is defined
	 * @param _id - The setting id
	 * @returns {boolean}
	 */
	public override has(_id: ISetting['_id']): boolean {
        /* Implementation Hidden */
    }

	/**
	 * Gets the current Object of the setting
	 * @param _id - The setting id
	 * @returns {ISetting} - The current Object of the setting
	 */
	public getSetting(_id: ISetting['_id']): ISetting | undefined {
        /* Implementation Hidden */
    }

	/**
	 * Gets the current value of the setting
	 * - In development mode if you are trying to get the value of a setting that is not defined, it will give an warning, in theory it makes sense, there no reason to do that
	 * - The setting's value will be cached in memory so it won't call the DB every time you fetch a particular setting
	 * @param _id - The setting id
	 * @returns {SettingValue} - The current value of the setting
	 */
	public get<T extends SettingValue = SettingValue>(_id: ISetting['_id']): T {
        /* Implementation Hidden */
    }

	/**
	 * Gets the current value of the setting
	 * - In development mode if you are trying to get the value of a setting that is not defined, it will give an warning, in theory it makes sense, there no reason to do that
	 * @deprecated
	 * @param _id - The setting id
	 * @returns {SettingValue} - The current value of the setting
	 */
	public getByRegexp<T extends SettingValue = SettingValue>(_id: RegExp): [string, T][] {
        /* Implementation Hidden */
    }

	/**
	 * Get the current value of the settings, and keep track of changes
	 * - This callback is debounced
	 * - The callback is not fire until the settings got initialized
	 * @param _ids - Array of setting id
	 * @param callback - The callback to run
	 * @returns {() => void} - A function that can be used to cancel the observe
	 */
	public watchMultiple<T extends SettingValue = SettingValue>(_id: ISetting['_id'][], callback: (settings: T[]) => void): () => void {
        /* Implementation Hidden */
    }

	/**
	 * Get the current value of the setting, and keep track of changes
	 * - This callback is debounced
	 * - The callback is not fire until the settings got initialized
	 * @param _id - The setting id
	 * @param callback - The callback to run
	 * @returns {() => void} - A function that can be used to cancel the observe
	 */
	public watch<T extends SettingValue = SettingValue>(
		_id: ISetting['_id'],
		cb: (args: T) => void,
		config?: OverCustomSettingsConfig,
	): () => void {
        /* Implementation Hidden */
    }

	/**
	 * Get the current value of the setting, or wait until the initialized
	 * - This is a one time run
	 * - This callback is debounced
	 * - The callback is not fire until the settings got initialized
	 * @param _id - The setting id
	 * @param callback - The callback to run
	 * @returns {() => void} - A function that can be used to cancel the observe
	 */
	public watchOnce<T extends SettingValue = SettingValue>(
		_id: ISetting['_id'],
		cb: (args: T) => void,
		config?: OverCustomSettingsConfig,
	): () => void {
        /* Implementation Hidden */
    }

	/**
	 * Observes the given setting by id and keep track of changes
	 * - This callback is debounced
	 * - The callback is not fire until the setting is changed
	 * - The callback is not fire until all the settings get initialized
	 * @param _id - The setting id
	 * @param callback - The callback to run
	 * @returns {() => void} - A function that can be used to cancel the observe
	 */
	public change<T extends SettingValue = SettingValue>(
		_id: ISetting['_id'],
		callback: (args: T) => void,
		config?: OverCustomSettingsConfig,
	): () => void {
        /* Implementation Hidden */
    }

	/**
	 * Observes multiple settings and keep track of changes
	 * - This callback is debounced
	 * - The callback is not fire until the setting is changed
	 * - The callback is not fire until all the settings get initialized
	 * @param _ids - Array of setting id
	 * @param callback - The callback to run
	 * @returns {() => void} - A function that can be used to cancel the observe
	 */
	public changeMultiple<T extends SettingValue = SettingValue>(
		_ids: ISetting['_id'][],
		callback: (settings: T[]) => void,
		config?: OverCustomSettingsConfig,
	): () => void {
        /* Implementation Hidden */
    }

	/**
	 * Observes the setting and fires only if there is a change. Runs only once
	 * - This is a one time run
	 * - This callback is debounced
	 * - The callback is not fire until the setting is changed
	 * - The callback is not fire until all the settings get initialized
	 * @param _id - The setting id
	 * @param callback - The callback to run
	 * @returns {() => void} - A function that can be used to cancel the observe
	 */
	public changeOnce<T extends SettingValue = SettingValue>(
		_id: ISetting['_id'],
		callback: (args: T) => void,
		config?: OverCustomSettingsConfig,
	): () => void {
        /* Implementation Hidden */
    }

	/**
	 * Sets the value of the setting
	 * - if the value set is the same as the current value, the change will not be fired
	 * - if the value is set before the initialization, the emit will be queued and will be fired after initialization
	 * @param _id - The setting id
	 * @param value - The value to set
	 * @returns {void}
	 */
	public set(record: ISetting): void {
        /* Implementation Hidden */
    }

	public getConfig = (config?: OverCustomSettingsConfig): SettingsConfig => ({
		debounce: process.env.TEST_MODE ? 0 : 500,
		...config,
	});

	/** @deprecated */
	public watchByRegex(regex: RegExp, cb: (...args: [string, SettingValue]) => void, config?: OverCustomSettingsConfig): () => void {
        /* Implementation Hidden */
    }

	/** @deprecated */
	public changeByRegex(regex: RegExp, callback: (...args: [string, SettingValue]) => void, config?: OverCustomSettingsConfig): () => void {
        /* Implementation Hidden */
    }

	/**
	 * Wait until the settings get ready then run the callback
	 */
	public onReady(cb: () => void): void {
        /* Implementation Hidden */
    }
}

```