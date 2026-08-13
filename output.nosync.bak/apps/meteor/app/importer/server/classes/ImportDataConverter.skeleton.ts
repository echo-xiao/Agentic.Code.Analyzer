## File: apps/meteor/app/importer/server/classes/ImportDataConverter.ts

```typescript
import type { IImportRecord, IImportUser, IImportMessage, IImportChannel, IImportContact } from '@rocket.chat/core-typings';
import type { Logger } from '@rocket.chat/logger';
import { ImportData } from '@rocket.chat/models';
import { pick } from '@rocket.chat/tools';

import type { IConversionCallbacks } from '../definitions/IConversionCallbacks';
import { ContactConverter } from './converters/ContactConverter';
import { ConverterCache } from './converters/ConverterCache';
import { type MessageConversionCallbacks, MessageConverter } from './converters/MessageConverter';
import type { RecordConverter, RecordConverterOptions } from './converters/RecordConverter';
import { RoomConverter } from './converters/RoomConverter';
import { UserConverter, type UserConverterOptions } from './converters/UserConverter';

export type ConverterOptions = UserConverterOptions & Omit<RecordConverterOptions, 'deleteDbData'>;

export class ImportDataConverter {
	protected _options: ConverterOptions;

	protected _userConverter: UserConverter;

	protected _roomConverter: RoomConverter;

	protected _messageConverter: MessageConverter;

	protected _contactConverter: ContactConverter;

	protected _cache = new ConverterCache();

	public get options(): ConverterOptions {
		return this._options;
	}

	constructor(logger: Logger, options?: ConverterOptions) {
        /* Implementation Hidden */
    }

	protected getRecordConverterOptions(): RecordConverterOptions {
        /* Implementation Hidden */
    }

	protected getUserConverterOptions(): UserConverterOptions {
        /* Implementation Hidden */
    }

	protected initializeUserConverter(logger: Logger): void {
        /* Implementation Hidden */
    }

	protected initializeContactConverter(logger: Logger): void {
        /* Implementation Hidden */
    }

	protected initializeRoomConverter(logger: Logger): void {
        /* Implementation Hidden */
    }

	protected initializeMessageConverter(logger: Logger): void {
        /* Implementation Hidden */
    }

	async addContact(data: IImportContact): Promise<void> {
        /* Implementation Hidden */
    }

	async addUser(data: IImportUser): Promise<void> {
        /* Implementation Hidden */
    }

	async addChannel(data: IImportChannel): Promise<void> {
        /* Implementation Hidden */
    }

	async addMessage(data: IImportMessage, useQuickInsert = false): Promise<void> {
        /* Implementation Hidden */
    }

	async convertContacts(callbacks: IConversionCallbacks): Promise<void> {
        /* Implementation Hidden */
    }

	async convertUsers(callbacks: IConversionCallbacks): Promise<void> {
        /* Implementation Hidden */
    }

	async convertChannels(startedByUserId: string, callbacks: IConversionCallbacks): Promise<void> {
        /* Implementation Hidden */
    }

	async convertMessages(callbacks: MessageConversionCallbacks): Promise<void> {
        /* Implementation Hidden */
    }

	async convertData(startedByUserId: string, callbacks: IConversionCallbacks = {}): Promise<void> {
        /* Implementation Hidden */
    }

	protected getAllConverters(): RecordConverter<IImportRecord>[] {
        /* Implementation Hidden */
    }

	public async clearImportData(): Promise<void> {
        /* Implementation Hidden */
    }

	async clearSuccessfullyImportedData(): Promise<void> {
        /* Implementation Hidden */
    }

	public abort(): void {
        /* Implementation Hidden */
    }
}

```