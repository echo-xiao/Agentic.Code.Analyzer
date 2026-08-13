## File: apps/meteor/server/services/media-call/push/sendVoipPushNotification.ts

```typescript
import type { IMediaCall, IUser, MediaCallContact, MediaCallActorType } from '@rocket.chat/core-typings';
import type { VoipPushNotificationEventType } from '@rocket.chat/media-calls';
import { MediaCalls, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';

import { getPushNotificationType } from './getPushNotificationType';
import { metrics } from '../../../../app/metrics/server/lib/metrics';
import { Push } from '../../../../app/push/server/push';
import PushNotification from '../../../../app/push-notifications/server/lib/PushNotification';
import { settings } from '../../../../app/settings/server';
import { getUserAvatarURL } from '../../../../app/utils/server/getUserAvatarURL';
import { getUserPreference } from '../../../../app/utils/server/lib/getUserPreference';
import { logger } from '../logger';

async function getActorUser(actor: MediaCallContact): Promise<Pick<IUser, '_id' | 'name' | 'username' | 'freeSwitchExtension'> | null> {
    /* Implementation Hidden */
}

async function getActorUserData(
	actor: MediaCallContact,
): Promise<{ type: MediaCallActorType; id: string; name: string; avatarUrl?: string; username?: string }> {
    /* Implementation Hidden */
}

async function sendVoipPushNotificationAsync(callId: IMediaCall['_id'], event: VoipPushNotificationEventType): Promise<void> {
    /* Implementation Hidden */
}

export function sendVoipPushNotification(callId: IMediaCall['_id'], event: VoipPushNotificationEventType): void {
    /* Implementation Hidden */
}

```