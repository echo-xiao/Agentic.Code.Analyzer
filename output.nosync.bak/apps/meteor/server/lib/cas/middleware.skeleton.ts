## File: apps/meteor/server/lib/cas/middleware.ts

```typescript
import type { IncomingMessage, ServerResponse } from 'node:http';
import url from 'node:url';

import { validate } from '@rocket.chat/cas-validate';
import type { ICredentialToken, RequiredField } from '@rocket.chat/core-typings';
import { CredentialTokens } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';
import _ from 'underscore';

import { logger } from './logger';
import { settings } from '../../../app/settings/server';

const closePopup = function (res: ServerResponse): void {
    /* Implementation Hidden */
};

type IncomingMessageWithUrl = RequiredField<IncomingMessage, 'url'>;

const casTicket = function (req: IncomingMessageWithUrl, token: string, callback: () => void): void {
    /* Implementation Hidden */
};

export const middlewareCAS = function (req: IncomingMessage, res: ServerResponse, next: (err?: any) => void) {
    /* Implementation Hidden */
};

```