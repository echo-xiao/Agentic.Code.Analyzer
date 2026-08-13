## File: apps/meteor/app/integrations/server/lib/validateOutgoingIntegration.ts

```typescript
import type { IUser, INewOutgoingIntegration, IOutgoingIntegration, IUpdateOutgoingIntegration } from '@rocket.chat/core-typings';
import { Subscriptions, Users, Rooms } from '@rocket.chat/models';
import { Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

import { compileIntegrationScript } from './compileIntegrationScript';
import { isScriptEngineFrozen } from './validateScriptEngine';
import { parseCSV } from '../../../../lib/utils/parseCSV';
import { hasPermissionAsync, hasAllPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { outgoingEvents } from '../../lib/outgoingEvents';

const scopedChannels = ['all_public_channels', 'all_private_groups', 'all_direct_messages'];
const validChannelChars = ['@', '#'];

function _verifyRequiredFields(integration: INewOutgoingIntegration | IUpdateOutgoingIntegration): void {
    /* Implementation Hidden */
}

async function _verifyUserHasPermissionForChannels(userId: IUser['_id'], channels: string[]): Promise<void> {
    /* Implementation Hidden */
}

function _verifyRetryInformation(integration: IOutgoingIntegration): void {
    /* Implementation Hidden */
}

export const validateOutgoingIntegration = async function (
	integration: INewOutgoingIntegration | IUpdateOutgoingIntegration,
	userId: IUser['_id'],
): Promise<IOutgoingIntegration> {
    /* Implementation Hidden */
};

```