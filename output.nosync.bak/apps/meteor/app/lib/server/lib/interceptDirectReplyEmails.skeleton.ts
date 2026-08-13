## File: apps/meteor/app/lib/server/lib/interceptDirectReplyEmails.js

```typescript
import POP3Lib from '@rocket.chat/poplib';
import { simpleParser } from 'mailparser';

import { processDirectEmail } from './processDirectEmail';
import { IMAPInterceptor } from '../../../../server/email/IMAPInterceptor';
import { settings } from '../../../settings/server';

export class DirectReplyIMAPInterceptor extends IMAPInterceptor {
	constructor(imapConfig, options = {}) {
        /* Implementation Hidden */
    }
}

class POP3Intercepter {
	constructor() {
        /* Implementation Hidden */
    }
}

export class POP3Helper {
	constructor(frequency) {
        /* Implementation Hidden */
    }

	isActive() {
        /* Implementation Hidden */
    }

	start() {
        /* Implementation Hidden */
    }

	log(...args) {
        /* Implementation Hidden */
    }

	stop(callback = new Function()) {
        /* Implementation Hidden */
    }
}

```