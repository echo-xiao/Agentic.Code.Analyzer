## File: apps/meteor/app/settings/server/SettingsRegistry.ts

```typescript
import type { ISetting, ISettingGroup, Optional, SettingValue } from '@rocket.chat/core-typings';
import { isSettingEnterprise } from '@rocket.chat/core-typings';
import { Emitter } from '@rocket.chat/emitter';
import type { ISettingsModel } from '@rocket.chat/model-typings';
import { isEqual } from 'underscore';

import type { ICachedSettings } from './CachedSettings';
import { getSettingDefaults } from './functions/getSettingDefaults';
import { overrideSetting } from './functions/overrideSetting';
import { overwriteSetting } from './functions/overwriteSetting';
import { validateSetting } from './functions/validateSetting';
import { SystemLogger } from '../../../server/lib/logger/system';

const blockedSettings = new Set<string>();
const hiddenSettings = new Set<string>();
const wizardRequiredSettings = new Set<string>();

if (process.env.SETTINGS_BLOCKED) {
	process.env.SETTINGS_BLOCKED.split(',').forEach((settingId) => blockedSettings.add(settingId.trim()));
}

if (process.env.SETTINGS_HIDDEN) {
	process.env.SETTINGS_HIDDEN.split(',').forEach((settingId) => hiddenSettings.add(settingId.trim()));
}

if (process.env.SETTINGS_REQUIRED_ON_WIZARD) {
	process.env.SETTINGS_REQUIRED_ON_WIZARD.split(',').forEach((settingId) => wizardRequiredSettings.add(settingId.trim()));
}

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

/*
 * @deprecated
 * please do not use event emitter to mutate values
 */
export const SettingsEvents = new Emitter<{
	'store-setting-value': [ISetting, { value: SettingValue }];
	'fetch-settings': ISetting[];
	'remove-setting-value': ISetting;
}>();

const getGroupDefaults = (_id: string, options: ISettingAddGroupOptions = {}): ISettingGroup => ({
	_id,
	i18nLabel: _id,
	i18nDescription: `${_id}_Description`,
	...options,
	sorter: options.sorter || 0,
	blocked: blockedSettings.has(_id),
	hidden: hiddenSettings.has(_id),
	type: 'group',
	...(options.displayQuery && { displayQuery: JSON.stringify(options.displayQuery) }),
});

type ISettingAddGroupOptions = Partial<ISettingGroup>;

type addSectionCallback = (this: {
	add(id: string, value: SettingValue, options: ISettingAddOptions): Promise<void>;
	with(options: ISettingAddOptions, cb: addSectionCallback): Promise<void>;
}) => Promise<void>;

type addGroupCallback = (this: {
	add(id: string, value: SettingValue, options: ISettingAddOptions): Promise<void>;
	section(section: string, cb: addSectionCallback): Promise<void>;
	with(options: ISettingAddOptions, cb: addGroupCallback): Promise<void>;
}) => Promise<void>;

type ISettingAddOptions = Partial<ISetting>;

const compareSettingsIgnoringKeys =
	(keys: Array<keyof ISetting>) =>
	(a: ISetting, b: ISetting): boolean =>
		[...new Set([...Object.keys(a), ...Object.keys(b)])]
			.filter((key) => !keys.includes(key as keyof ISetting))
			.every((key) => isEqual(a[key as keyof ISetting], b[key as keyof ISetting]));

export const compareSettings = compareSettingsIgnoringKeys([
	'value',
	'ts',
	'createdAt',
	'valueSource',
	'packageValue',
	'processEnvValue',
	'_updatedAt',
]);

export class SettingsRegistry {
	private model: ISettingsModel;

	private store: ICachedSettings;

	private _sorter: { [key: string]: number } = {};

	constructor({ store, model }: { store: ICachedSettings; model: ISettingsModel }) {
        /* Implementation Hidden */
    }

	/*
	 * Add a setting
	 */
	async add(_id: string, value: SettingValue, { sorter, section, group, ...options }: ISettingAddOptions = {}): Promise<void> {
        /* Implementation Hidden */
    }

	/*
	 * Add a setting group
	 */
	async addGroup(_id: string, cb?: addGroupCallback): Promise<void>;

	// eslint-disable-next-line no-dupe-class-members
	async addGroup(_id: string, groupOptions: ISettingAddGroupOptions | addGroupCallback = {}, cb?: addGroupCallback): Promise<void> {
        /* Implementation Hidden */
    }

	private async saveUpdatedSetting(
		_id: string,
		settingProps: Omit<Optional<ISetting, 'value'>, '_id'>,
		removedKeys?: string[],
	): Promise<void> {
        /* Implementation Hidden */
    }
}

```