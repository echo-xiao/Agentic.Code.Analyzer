## File: apps/meteor/app/importer/server/classes/Importer.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type {
	IImport,
	IImportRecord,
	IImportChannel,
	IImportUser,
	IImportProgress,
	IImporterShortSelection,
	IImportContact,
} from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { Settings, ImportData, Imports } from '@rocket.chat/models';
import AdmZip from 'adm-zip';
import type { MatchKeysAndValues, MongoServerError } from 'mongodb';

import { Selection, SelectionChannel, SelectionUser } from '..';
import { ImportDataConverter } from './ImportDataConverter';
import type { ConverterOptions } from './ImportDataConverter';
import { ImporterProgress } from './ImporterProgress';
import { ImporterWebsocket } from './ImporterWebsocket';
import { notifyOnSettingChanged, notifyOnSettingChangedById } from '../../../lib/server/lib/notifyListener';
import { t } from '../../../utils/lib/i18n';
import { ProgressStep, ImportPreparingStartedStates } from '../../lib/ImporterProgressStep';
import type { ImporterInfo } from '../definitions/ImporterInfo';

type OldSettings = {
	allowedDomainList?: string | null;
	allowUsernameChange?: boolean | null;
	maxFileSize?: number | null;
	mediaTypeWhiteList?: string | null;
	mediaTypeBlackList?: string | null;
};

/**
 * Base class for all of the importers.
 */
export class Importer {
	private _reportProgressHandler: ReturnType<typeof setTimeout> | undefined;

	protected AdmZip = AdmZip;

	protected converter: ImportDataConverter;

	protected info: ImporterInfo;

	protected logger: Logger;

	protected oldSettings: OldSettings;

	protected _lastProgressReportTotal = 0;

	public importRecord: IImport;

	public progress: ImporterProgress;

	constructor(info: ImporterInfo, importRecord: IImport, converterOptions: ConverterOptions = {}) {
        /* Implementation Hidden */
    }

	/**
	 * Registers the file name and content type on the import operation
	 */
	async startFileUpload(fileName: string, contentType?: string): Promise<IImport> {
        /* Implementation Hidden */
    }

	/**
	 * Takes the uploaded file and extracts the users, channels, and messages from it.
	 *
	 * @param {string} _fullFilePath the full path of the uploaded file
	 * @returns {ImporterProgress} The progress record of the import.
	 */
	async prepareUsingLocalFile(_fullFilePath: string): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }

	/**
	 * Starts the import process. The implementing method should defer
	 * as soon as the selection is set, so the user who started the process
	 * doesn't end up with a "locked" UI while Meteor waits for a response.
	 * The returned object should be the progress.
	 *
	 * @param {IImporterShortSelection} importSelection The selection data.
	 * @returns {ImporterProgress} The progress record of the import.
	 */
	async startImport(importSelection: IImporterShortSelection, startedByUserId: string): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }

	async backupSettingValues() {
        /* Implementation Hidden */
    }

	async applySettingValues(settingValues: OldSettings) {
        /* Implementation Hidden */
    }

	getProgress(): ImporterProgress {
        /* Implementation Hidden */
    }

	/**
	 * Updates the progress step of this importer.
	 * It also changes some internal settings at various stages of the import.
	 * This way the importer can adjust user/room information at will.
	 *
	 * @param {ProgressStep} step The progress step which this import is currently at.
	 * @returns {ImporterProgress} The progress record of the import.
	 */
	async updateProgress(step: IImportProgress['step']): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }

	reloadCount() {
        /* Implementation Hidden */
    }

	/**
	 * Adds the passed in value to the total amount of items needed to complete.
	 *
	 * @param {number} count The amount to add to the total count of items.
	 * @returns {ImporterProgress} The progress record of the import.
	 */
	async addCountToTotal(count: number): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }

	/**
	 * Adds the passed in value to the total amount of items completed.
	 *
	 * @param {number} count The amount to add to the total count of finished items.
	 * @returns {ImporterProgress} The progress record of the import.
	 */
	async addCountCompleted(count: number): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }

	async addCountError(count: number): Promise<ImporterProgress> {
        /* Implementation Hidden */
    }

	async maybeUpdateRecord() {
        /* Implementation Hidden */
    }

	/**
	 * Sends an updated progress to the websocket
	 */
	reportProgress() {
        /* Implementation Hidden */
    }

	/**
	 * Updates the import record with the given fields being `set`.
	 */
	async updateRecord(fields: MatchKeysAndValues<IImport>): Promise<IImport> {
        /* Implementation Hidden */
    }

	async buildSelection(): Promise<Selection> {
        /* Implementation Hidden */
    }

	/**
	 * Utility method to check if the passed in error is a `MongoServerError` with the `codeName` of `'CursorNotFound'`.
	 */
	protected isCursorNotFoundError(error: unknown): error is MongoServerError & { codeName: 'CursorNotFound' } {
        /* Implementation Hidden */
    }
}

```