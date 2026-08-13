## File: packages/apps/src/client/AppsEngineUIHost.ts

```typescript
import { MESSAGE_ID } from './constants';
import type { IAppsEngineUIResponse, IExternalComponentRoomInfo, IExternalComponentUserInfo } from './definition';
import { AppsEngineUIMethods } from './definition';

type HandleActionData = IExternalComponentUserInfo | IExternalComponentRoomInfo;

/**
 * Represents the host which handles API calls from external components.
 */
export abstract class AppsEngineUIHost {
	/**
	 * The message emitter who calling the API.
	 */
	private responseDestination!: Window;

	constructor() {
        /* Implementation Hidden */
    }

	/**
	 * initialize the AppClientUIHost by registering window `message` listener
	 */
	public initialize() {
        /* Implementation Hidden */
    }

	/**
	 * Get the current user's information.
	 */
	public abstract getClientUserInfo(): Promise<IExternalComponentUserInfo>;

	/**
	 * Get the opened room's information.
	 */
	public abstract getClientRoomInfo(): Promise<IExternalComponentRoomInfo>;

	/**
	 * Handle the action sent from the external component.
	 * @param action the name of the action
	 * @param id the unique id of the  API call
	 * @param data The data that will return to the caller
	 */
	private async handleAction(action: AppsEngineUIMethods, id: string, data: HandleActionData): Promise<void> {
        /* Implementation Hidden */
    }
}

```