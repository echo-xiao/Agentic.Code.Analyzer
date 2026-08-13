## File: apps/meteor/server/email/IMAPInterceptor.ts

```typescript
import { EventEmitter } from 'node:events';
import { Readable } from 'node:stream';

import { EmailInbox } from '@rocket.chat/models';
import type { ImapMessage, ImapMessageBodyInfo } from 'imap';
import IMAP from 'imap';
import type { ParsedMail } from 'mailparser';
import { simpleParser } from 'mailparser';

import { notifyOnEmailInboxChanged } from '../../app/lib/server/lib/notifyListener';
import { logger } from '../features/EmailInbox/logger';

type IMAPOptions = {
	deleteAfterRead: boolean;
	filter: any[];
	rejectBeforeTS?: Date;
	markSeen: boolean;
	maxRetries: number;
};

export declare interface IMAPInterceptor {
	on(event: 'email', listener: (email: ParsedMail) => void): this;
}

export class IMAPInterceptor extends EventEmitter {
	private imap: IMAP;

	private config: IMAP.Config;

	private backoffDurationMS = 3000;

	private backoff: NodeJS.Timeout;

	private retries = 0;

	private inboxId: string;

	constructor(
		imapConfig: IMAP.Config,
		private options: IMAPOptions = {
			deleteAfterRead: false,
			filter: ['UNSEEN'],
			markSeen: true,
			maxRetries: 10,
		},
		id: string,
	) {
        /* Implementation Hidden */
    }

	openInbox(): Promise<IMAP.Box> {
        /* Implementation Hidden */
    }

	async start(): Promise<void> {
        /* Implementation Hidden */
    }

	isActive(): boolean {
        /* Implementation Hidden */
    }

	stop(callback = new Function()): void {
        /* Implementation Hidden */
    }

	private stopWithNoStopBackoff(callback = new Function()): void {
        /* Implementation Hidden */
    }

	async reconnect(): Promise<void> {
        /* Implementation Hidden */
    }

	imapSearch(): Promise<number[]> {
        /* Implementation Hidden */
    }

	parseEmails(stream: NodeJS.ReadableStream, _info: ImapMessageBodyInfo): Promise<ParsedMail> {
        /* Implementation Hidden */
    }

	imapFetch(emailIds: number[]): Promise<number[]> {
        /* Implementation Hidden */
    }

	// Fetch all UNSEEN messages and pass them for further processing
	async getEmails(): Promise<void> {
        /* Implementation Hidden */
    }

	canRetry(): boolean {
        /* Implementation Hidden */
    }

	async selfDisable(): Promise<void> {
        /* Implementation Hidden */
    }
}

```