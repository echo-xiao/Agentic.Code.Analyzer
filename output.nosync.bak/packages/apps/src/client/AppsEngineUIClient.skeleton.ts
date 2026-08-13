## File: packages/apps/src/client/AppsEngineUIClient.ts

```typescript
import { ACTION_ID_LENGTH, MESSAGE_ID } from './constants';
import type { IExternalComponentRoomInfo, IExternalComponentUserInfo } from './definition';
import { AppsEngineUIMethods } from './definition/AppsEngineUIMethods';
import { randomString } from './utils';

/**
 * Represents the SDK provided to the external component.
 */
export class AppsEngineUIClient {
	private listener: (this: Window, ev: MessageEvent<{ [MESSAGE_ID]?: { id: string; payload: any } }>) => void;

	private callbacks: Map<string, (response: any) => any>;

	constructor() {
        /* Implementation Hidden */
    }

	/**
	 * Get the current user's information.
	 *
	 * @return the information of the current user.
	 */
	public getUserInfo(): Promise<IExternalComponentUserInfo> {
        /* Implementation Hidden */
    }

	/**
	 * Get the current room's information.
	 *
	 * @return the information of the current room.
	 */
	public getRoomInfo(): Promise<IExternalComponentRoomInfo> {
        /* Implementation Hidden */
    }

	/**
	 * Initialize the app  SDK for communicating with Rocket.Chat
	 */
	public init(): void {
        /* Implementation Hidden */
    }

	private call(action: string, payload?: any): Promise<any> {
        /* Implementation Hidden */
    }
}

```