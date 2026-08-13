## File: ee/packages/media-calls/src/server/CastDirector.ts

```typescript
import type { IUser, MediaCallActor, MediaCallActorType, MediaCallContact, MediaCallContactInformation } from '@rocket.chat/core-typings';
import type { CallRole } from '@rocket.chat/media-signaling';
import { Users } from '@rocket.chat/models';

import type { IMediaCallAgent } from '../definition/IMediaCallAgent';
import type { IMediaCallCastDirector } from '../definition/IMediaCallCastDirector';
import type { GetActorContactOptions, MinimalUserData, MediaCallHeader } from '../definition/common';
import { UserActorAgent } from '../internal/agents/UserActorAgent';
import { logger } from '../logger';
import { BroadcastActorAgent } from './BroadcastAgent';

type ContactList = Record<MediaCallActorType, MediaCallContact | null>;

export class MediaCallCastDirector implements IMediaCallCastDirector {
	public async getAgentsFromCall(call: MediaCallHeader): Promise<{ caller: IMediaCallAgent; callee: IMediaCallAgent }> {
        /* Implementation Hidden */
    }

	public async getAgentFromCall(call: MediaCallHeader, role: CallRole): Promise<IMediaCallAgent | null> {
        /* Implementation Hidden */
    }

	public async getContactForActor(
		actor: MediaCallActor,
		options: GetActorContactOptions,
		defaultContactInfo?: MediaCallContactInformation,
	): Promise<MediaCallContact | null> {
        /* Implementation Hidden */
    }

	public getContactForUser(
		user: MinimalUserData,
		options: GetActorContactOptions,
		defaultContactInfo?: MediaCallContactInformation,
	): MediaCallContact | null {
        /* Implementation Hidden */
    }

	public async getContactForUserId(
		userId: string,
		options: GetActorContactOptions,
		defaultContactInfo?: MediaCallContactInformation,
	): Promise<MediaCallContact | null> {
        /* Implementation Hidden */
    }

	public async getContactForExtensionNumber(
		sipExtension: string,
		options: GetActorContactOptions,
		defaultContactInfo?: MediaCallContactInformation,
	): Promise<MediaCallContact | null> {
        /* Implementation Hidden */
    }

	public async getAgentForActorAndRole(actor: MediaCallContact, role: CallRole): Promise<IMediaCallAgent | null> {
        /* Implementation Hidden */
    }

	protected async getAgentForUserActorAndRole(actor: MediaCallContact, role: CallRole): Promise<UserActorAgent | null> {
        /* Implementation Hidden */
    }

	protected async getAgentForSipActorAndRole(actor: MediaCallContact, role: CallRole): Promise<BroadcastActorAgent | null> {
        /* Implementation Hidden */
    }

	protected buildContactListForUser(user: MinimalUserData, defaultContactInfo?: MediaCallContactInformation): ContactList {
        /* Implementation Hidden */
    }

	protected buildContactListForExtension(sipExtension: string, defaultContactInfo?: MediaCallContactInformation): ContactList {
        /* Implementation Hidden */
    }

	protected getContactFromList(list: ContactList, options: GetActorContactOptions): MediaCallContact | null {
        /* Implementation Hidden */
    }
}

```