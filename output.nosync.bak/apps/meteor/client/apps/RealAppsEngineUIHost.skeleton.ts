## File: apps/meteor/client/apps/RealAppsEngineUIHost.ts

```typescript
import { AppsEngineUIHost } from '@rocket.chat/apps/dist/client/AppsEngineUIHost';
import type { IExternalComponentRoomInfo } from '@rocket.chat/apps/dist/client/definition/IExternalComponentRoomInfo';
import type { IExternalComponentUserInfo } from '@rocket.chat/apps/dist/client/definition/IExternalComponentUserInfo';

import { getUserAvatarURL } from '../../app/utils/client/getUserAvatarURL';
import { sdk } from '../../app/utils/client/lib/SDKClient';
import { RoomManager } from '../lib/RoomManager';
import { baseURI } from '../lib/baseURI';
import { getUser } from '../lib/user';
import { Rooms } from '../stores';

// FIXME: replace non-null assertions with proper error handling

export class RealAppsEngineUIHost extends AppsEngineUIHost {
	private _baseURL: string;

	constructor() {
        /* Implementation Hidden */
    }

	private getUserAvatarUrl(username: string) {
        /* Implementation Hidden */
    }

	async getClientRoomInfo(): Promise<IExternalComponentRoomInfo> {
        /* Implementation Hidden */
    }

	async getClientUserInfo(): Promise<IExternalComponentUserInfo> {
        /* Implementation Hidden */
    }
}

```