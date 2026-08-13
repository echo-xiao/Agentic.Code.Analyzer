## File: apps/meteor/app/authentication/server/lib/restrictLoginAttempts.ts

```typescript
import type { IServerEvent } from '@rocket.chat/core-typings';
import { ServerEventType } from '@rocket.chat/core-typings';
import { Logger } from '@rocket.chat/logger';
import { Rooms, ServerEvents, Users } from '@rocket.chat/models';

import { addMinutesToADate } from '../../../../lib/utils/addMinutesToADate';
import { getClientAddress } from '../../../../server/lib/getClientAddress';
import { sendMessage } from '../../../../server/lib/messages/sendMessage';
import { settings } from '../../../settings/server';
import type { ILoginAttempt } from '../ILoginAttempt';

const logger = new Logger('LoginProtection');

const notifyFailedLogin = async (ipOrUsername: string, blockedUntil: Date, failedAttempts: number): Promise<void> => {
    /* Implementation Hidden */
};

export const isValidLoginAttemptByIp = async (ip: string): Promise<boolean> => {
    /* Implementation Hidden */
};

export const isValidAttemptByUser = async (login: ILoginAttempt): Promise<boolean> => {
    /* Implementation Hidden */
};

export const saveFailedLoginAttempts = async (login: ILoginAttempt): Promise<void> => {
    /* Implementation Hidden */
};

export const saveSuccessfulLogin = async (login: ILoginAttempt): Promise<void> => {
    /* Implementation Hidden */
};

```