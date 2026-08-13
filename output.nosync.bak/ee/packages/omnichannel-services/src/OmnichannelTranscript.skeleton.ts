## File: ee/packages/omnichannel-services/src/OmnichannelTranscript.ts

```typescript
import { Readable } from 'node:stream';

import {
	ServiceClass,
	Upload as uploadService,
	Message as messageService,
	Room as roomService,
	Settings as settingsService,
} from '@rocket.chat/core-services';
import type { IOmnichannelTranscriptService } from '@rocket.chat/core-services';
import type { IMessage, IUpload, ILivechatAgent, AtLeast, IOmnichannelRoom, IUser, ILivechatVisitor } from '@rocket.chat/core-typings';
import { isQuoteAttachment, isFileAttachment, isFileImageAttachment } from '@rocket.chat/core-typings';
import type { Logger } from '@rocket.chat/logger';
import { parse } from '@rocket.chat/message-parser';
import { MessageTypes } from '@rocket.chat/message-types';
import { LivechatRooms, Messages, Uploads, Users, LivechatVisitors } from '@rocket.chat/models';
import { PdfWorker } from '@rocket.chat/pdf-worker';
import type { MessageData, Quote, WorkerData } from '@rocket.chat/pdf-worker';
import { guessTimezone, guessTimezoneFromOffset, streamToBuffer } from '@rocket.chat/tools';
import type { TFunction, i18n } from 'i18next';

import type { WorkDetailsWithSource } from './localTypes';
import { isPromiseRejectedResult } from './localTypes';

export class OmnichannelTranscript extends ServiceClass implements IOmnichannelTranscriptService {
	protected name = 'omnichannel-transcript';

	private worker: PdfWorker;

	private log: Logger;

	maxNumberOfConcurrentJobs = 25;

	currentJobNumber = 0;

	siteName = 'Rocket.Chat';

	dateFormat = 'LL';

	timeAndDateFormat = 'LLL';

	serverLanguage = 'en';

	reportingTimezone: 'server' | 'custom' | 'user' = 'server';

	defaultCustomTimezone = 'UTC';

	showSystemMessages = false;

	constructor(
		loggerConstructor: typeof Logger,
		// Instance of i18n. Should already be init'd and loaded with the translation files
		private readonly translator: i18n,
	) {
        /* Implementation Hidden */
    }

	override async started(): Promise<void> {
        /* Implementation Hidden */
    }

	async getTimezone(agent?: AtLeast<ILivechatAgent, 'utcOffset'> | null): Promise<string> {
        /* Implementation Hidden */
    }

	private async getMessagesFromRoom({ rid }: { rid: string }): Promise<IMessage[]> {
        /* Implementation Hidden */
    }

	private getQuotesFromMessage(message: IMessage): Quote[] {
        /* Implementation Hidden */
    }

	private getSystemMessage(message: IMessage, t: TFunction): MessageData | undefined {
        /* Implementation Hidden */
    }

	async getMessagesData(messages: IMessage[], t: TFunction): Promise<MessageData[]> {
        /* Implementation Hidden */
    }

	async workOnPdf({ details }: { details: WorkDetailsWithSource }): Promise<void> {
        /* Implementation Hidden */
    }

	private async doRender({ data, details, i18n }: { data: WorkerData; details: WorkDetailsWithSource; i18n: i18n }): Promise<void> {
        /* Implementation Hidden */
    }

	private async pdfFailed({ details, e, i18n }: { details: WorkDetailsWithSource; e: Error; i18n: i18n }): Promise<void> {
        /* Implementation Hidden */
    }

	private async uploadFiles({
		streamParam,
		roomIds,
		data,
		transcriptText,
	}: {
		streamParam: Readable;
		roomIds: string[];
		data: Pick<WorkerData, 'siteName' | 'visitor'>;
		transcriptText: string;
	}): Promise<IUpload[]> {
        /* Implementation Hidden */
    }

	private async pdfComplete({
		details,
		transcriptFile,
		rocketCatFile,
		i18n,
	}: {
		details: WorkDetailsWithSource;
		transcriptFile: IUpload;
		rocketCatFile: IUpload;
		i18n: i18n;
	}): Promise<void> {
        /* Implementation Hidden */
    }
}

```