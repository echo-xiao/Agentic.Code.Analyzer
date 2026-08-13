## File: apps/meteor/server/routes/avatar/user.ts

```typescript
import type { IncomingMessage, ServerResponse } from 'node:http';

import type { IUser } from '@rocket.chat/apps-engine/definition/users';
import type { IIncomingMessage } from '@rocket.chat/core-typings';
import { Avatars, Users } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import type { NextFunction } from 'connect';

import { serveSvgAvatarInRequestedFormat, wasFallbackModified, setCacheAndDispositionHeaders, serveAvatarFile } from './utils';
import { settings } from '../../../app/settings/server';

const handleExternalProvider = async (externalProviderUrl: string, username: string, res: ServerResponse): Promise<void> => {
    /* Implementation Hidden */
};
// request /avatar/@name forces returning the svg
export const userAvatarByUsername = async function (request: IncomingMessage, res: ServerResponse, next: NextFunction) {
    /* Implementation Hidden */
};

export const userAvatarById = async function (request: IncomingMessage, res: ServerResponse, next: NextFunction) {
    /* Implementation Hidden */
};

```