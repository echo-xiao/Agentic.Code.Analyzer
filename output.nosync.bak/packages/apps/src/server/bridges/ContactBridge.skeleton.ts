## File: packages/apps/src/server/bridges/ContactBridge.ts

```typescript
import type { ILivechatContact } from '@rocket.chat/apps-engine/definition/livechat/ILivechatContact';

import { BaseBridge } from './BaseBridge';
import { PermissionDeniedError } from '../errors/PermissionDeniedError';
import { AppPermissionManager } from '../managers/AppPermissionManager';
import { AppPermissions } from '../permissions/AppPermissions';

export type VerifyContactChannelParams = {
	contactId: string;
	field: string;
	value: string;
	visitorId: string;
	roomId: string;
};

export abstract class ContactBridge extends BaseBridge {
	public async doGetById(contactId: ILivechatContact['_id'], appId: string): Promise<ILivechatContact | undefined> {
        /* Implementation Hidden */
    }

	public async doVerifyContact(verifyContactChannelParams: VerifyContactChannelParams, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async doAddContactEmail(contactId: ILivechatContact['_id'], email: string, appId: string): Promise<ILivechatContact> {
        /* Implementation Hidden */
    }

	protected abstract getById(contactId: ILivechatContact['_id'], appId: string): Promise<ILivechatContact | undefined>;

	protected abstract verifyContact(verifyContactChannelParams: VerifyContactChannelParams, appId: string): Promise<void>;

	protected abstract addContactEmail(contactId: ILivechatContact['_id'], email: string, appId: string): Promise<ILivechatContact>;

	private hasReadPermission(appId: string): boolean {
        /* Implementation Hidden */
    }

	private hasWritePermission(appId: string): boolean {
        /* Implementation Hidden */
    }
}

```