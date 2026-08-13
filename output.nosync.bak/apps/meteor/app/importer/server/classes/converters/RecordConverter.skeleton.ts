## File: apps/meteor/app/importer/server/classes/converters/RecordConverter.ts

```typescript
import type { IImportRecord } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { ImportData } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { type FindCursor, ObjectId } from 'mongodb';

import { ConverterCache } from './ConverterCache';
import type { IConversionCallbacks } from '../../definitions/IConversionCallbacks';

export type RecordConverterOptions = {
	workInMemory?: boolean;
	deleteDbData?: boolean;
};

export class RecordConverter<R extends IImportRecord, T extends RecordConverterOptions = RecordConverterOptions> {
	protected _logger: Logger;

	protected _cache: ConverterCache;

	protected _converterOptions: RecordConverterOptions;

	protected _options: Omit<T, keyof RecordConverterOptions>;

	protected _records: R[];

	protected skippedCount = 0;

	protected failedCount = 0;

	protected newCount = 0;

	public aborted = false;

	constructor(options?: T, logger?: Logger, cache?: ConverterCache) {
        /* Implementation Hidden */
    }

	private skipMemoryRecord(_id: string): void {
        /* Implementation Hidden */
    }

	private async skipDatabaseRecord(_id: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async skipRecord(_id: string): Promise<void> {
        /* Implementation Hidden */
    }

	private saveErrorToMemory(importId: string, error: Error): void {
        /* Implementation Hidden */
    }

	private async saveErrorToDatabase(importId: string, error: Error): Promise<void> {
        /* Implementation Hidden */
    }

	protected async saveError(importId: string, error: Error): Promise<void> {
        /* Implementation Hidden */
    }

	public async clearImportData(): Promise<void> {
        /* Implementation Hidden */
    }

	public async clearSuccessfullyImportedData(): Promise<void> {
        /* Implementation Hidden */
    }

	private getMemoryRecordById(id: string): R | undefined {
        /* Implementation Hidden */
    }

	protected getDataType(): R['dataType'] {
        /* Implementation Hidden */
    }

	protected async addObjectToDatabase(data: R['data'], options: R['options'] = {}): Promise<void> {
        /* Implementation Hidden */
    }

	public addObjectToMemory(data: R['data'], options: R['options'] = {}): void {
        /* Implementation Hidden */
    }

	public async addObject(data: R['data'], options: R['options'] = {}): Promise<void> {
        /* Implementation Hidden */
    }

	protected getDatabaseDataToImport(): Promise<R[]> {
        /* Implementation Hidden */
    }

	protected async getDataToImport(): Promise<R[]> {
        /* Implementation Hidden */
    }

	protected async iterateRecords({
		beforeImportFn,
		afterImportFn,
		onErrorFn,
		processRecord,
		afterBatchFn,
	}: IConversionCallbacks & { processRecord?: (record: R) => Promise<boolean | undefined> } = {}): Promise<void> {
        /* Implementation Hidden */
    }

	async convertData(callbacks: IConversionCallbacks = {}): Promise<void> {
        /* Implementation Hidden */
    }

	protected async convertRecord(_record: R): Promise<boolean | undefined> {
        /* Implementation Hidden */
    }
}

```