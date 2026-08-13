## File: packages/models/src/models/Settings.ts

```typescript
import type { ISetting, ISettingColor, ISettingSelectOption, RocketChatRecordDeleted, SettingValue } from '@rocket.chat/core-typings';
import type { ISettingsModel } from '@rocket.chat/model-typings';
import type {
	Collection,
	FindCursor,
	Db,
	Filter,
	UpdateFilter,
	UpdateResult,
	Document,
	FindOptions,
	FindOneAndUpdateOptions,
	WithId,
	UpdateOptions,
} from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class SettingsRaw extends BaseRaw<ISetting> implements ISettingsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ISetting>>) {
        /* Implementation Hidden */
    }

	async getValueById<T extends SettingValue = SettingValue>(_id: string): Promise<T | undefined> {
        /* Implementation Hidden */
    }

	findNotHidden({ updatedAfter }: { updatedAfter?: Date } = {}): FindCursor<ISetting> {
        /* Implementation Hidden */
    }

	findOneNotHiddenById(_id: string): Promise<ISetting | null> {
        /* Implementation Hidden */
    }

	findByIds(_id: string[] | string = [], options?: FindOptions<ISetting>): FindCursor<ISetting> {
        /* Implementation Hidden */
    }

	updateValueById(
		_id: string,
		value: (ISetting['value'] extends undefined ? never : ISetting['value']) | null,
		options?: UpdateOptions,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async resetValueById(
		_id: string,
		value?: (ISetting['value'] extends undefined ? never : ISetting['value']) | null,
	): Promise<Document | UpdateResult | undefined> {
        /* Implementation Hidden */
    }

	async incrementValueById(
		_id: ISetting['_id'],
		value?: ISetting['value'],
		options?: FindOneAndUpdateOptions,
	): Promise<null | WithId<ISetting>> {
        /* Implementation Hidden */
    }

	updateOptionsById<T extends ISetting = ISetting>(
		_id: ISetting['_id'],
		options: UpdateFilter<T>['$set'],
	): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	updateValueNotHiddenById<T extends ISetting['value'] = ISetting['value']>(
		_id: ISetting['_id'],
		value: T,
	): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	updateValueAndEditorById<T extends ISetting['value'] = ISetting['value']>(
		_id: ISetting['_id'],
		value: T,
		editor: ISettingColor['editor'],
	): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	findNotHiddenPublic<T extends ISetting = ISetting>(
		ids: ISetting['_id'][] = [],
	): FindCursor<
		T extends ISettingColor
			? Pick<T, '_id' | 'value' | 'editor' | 'enterprise' | 'invalidValue' | 'modules' | 'requiredOnWizard'>
			: Pick<T, '_id' | 'value' | 'enterprise' | 'invalidValue' | 'modules' | 'requiredOnWizard'>
	> {
        /* Implementation Hidden */
    }

	findSetupWizardSettings(): FindCursor<ISetting> {
        /* Implementation Hidden */
    }

	addOptionValueById(_id: ISetting['_id'], option: ISettingSelectOption): Promise<Document | UpdateResult> {
        /* Implementation Hidden */
    }

	findNotHiddenPublicUpdatedAfter(updatedAt: Date): FindCursor<ISetting> {
        /* Implementation Hidden */
    }

	findEnterpriseSettings(): FindCursor<ISetting> {
        /* Implementation Hidden */
    }
}

```