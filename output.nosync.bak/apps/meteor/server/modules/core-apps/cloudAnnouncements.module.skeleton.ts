## File: apps/meteor/server/modules/core-apps/cloudAnnouncements.module.ts

```typescript
import { Banner } from '@rocket.chat/core-services';
import type {
	IUiKitCoreApp,
	UiKitCoreAppBlockActionPayload,
	UiKitCoreAppViewClosedPayload,
	UiKitCoreAppViewSubmitPayload,
} from '@rocket.chat/core-services';
import type { Cloud, IUser } from '@rocket.chat/core-typings';
import { Banners } from '@rocket.chat/models';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { isTruthy } from '@rocket.chat/tools';
import type * as UiKit from '@rocket.chat/ui-kit';

import { getWorkspaceAccessToken } from '../../../app/cloud/server';
import { settings } from '../../../app/settings/server';
import { CloudWorkspaceConnectionError } from '../../../lib/errors/CloudWorkspaceConnectionError';
import { InvalidCloudAnnouncementInteractionError } from '../../../lib/errors/InvalidCloudAnnouncementInteractionError';
import { InvalidCoreAppInteractionError } from '../../../lib/errors/InvalidCoreAppInteractionError';
import { syncWorkspace } from '../../lib/cloud/syncWorkspace';
import { SystemLogger } from '../../lib/logger/system';

type CloudAnnouncementInteractant =
	| {
			user: Pick<IUser, '_id' | 'username' | 'name'>;
	  }
	| {
			visitor: Pick<NonNullable<UiKitCoreAppBlockActionPayload['visitor']>, 'id' | 'username' | 'name' | 'department' | 'phone'>;
	  };

type CloudAnnouncementInteractionRequest = UiKit.UserInteraction & CloudAnnouncementInteractant;

export class CloudAnnouncementsModule implements IUiKitCoreApp {
	appId = 'cloud-announcements-core';

	protected async getWorkspaceAccessToken() {
        /* Implementation Hidden */
    }

	protected getCloudUrl() {
        /* Implementation Hidden */
    }

	blockAction(payload: UiKitCoreAppBlockActionPayload): Promise<UiKit.ServerInteraction | undefined> {
        /* Implementation Hidden */
    }

	viewSubmit(payload: UiKitCoreAppViewSubmitPayload): Promise<UiKit.ServerInteraction | undefined> {
        /* Implementation Hidden */
    }

	async viewClosed(payload: UiKitCoreAppViewClosedPayload): Promise<UiKit.ServerInteraction | undefined> {
        /* Implementation Hidden */
    }

	protected async handlePayload(
		payload: UiKitCoreAppBlockActionPayload | UiKitCoreAppViewSubmitPayload | UiKitCoreAppViewClosedPayload,
	): Promise<UiKit.ServerInteraction | undefined> {
        /* Implementation Hidden */
    }

	protected getInteractant(
		payload: UiKitCoreAppBlockActionPayload | UiKitCoreAppViewSubmitPayload | UiKitCoreAppViewClosedPayload,
	): CloudAnnouncementInteractant {
        /* Implementation Hidden */
    }

	/**
	 * Transform the payload received from the Core App back to the format the UI sends from the client
	 */
	protected getInteraction(
		payload: UiKitCoreAppBlockActionPayload | UiKitCoreAppViewSubmitPayload | UiKitCoreAppViewClosedPayload,
	): UiKit.UserInteraction {
        /* Implementation Hidden */
    }

	protected async pushUserInteraction(
		interactant: CloudAnnouncementInteractant,
		userInteraction: UiKit.UserInteraction,
	): Promise<UiKit.ServerInteraction> {
        /* Implementation Hidden */
    }
}

```