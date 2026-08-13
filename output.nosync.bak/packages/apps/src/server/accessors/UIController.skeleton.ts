## File: packages/apps/src/server/accessors/UIController.ts

```typescript
import type { IUIController } from '@rocket.chat/apps-engine/definition/accessors';
import type {
	IUIKitErrorInteractionParam,
	IUIKitInteractionParam,
	IUIKitSurfaceViewParam,
} from '@rocket.chat/apps-engine/definition/accessors/IUIController';
import { UIKitInteractionType, UIKitSurfaceType } from '@rocket.chat/apps-engine/definition/uikit';
import {
	formatContextualBarInteraction,
	formatErrorInteraction,
	formatModalInteraction,
} from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionPayloadFormatter';
import type {
	IUIKitContextualBarViewParam,
	IUIKitModalViewParam,
} from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionResponder';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import type { AppBridges, UiInteractionBridge } from '../bridges';
import { UIHelper } from '../misc/UIHelper';

export class UIController implements IUIController {
	private readonly uiInteractionBridge: UiInteractionBridge;

	constructor(
		private readonly appId: string,
		bridges: AppBridges,
	) {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated please prefer the `openSurfaceView` method
	 */
	public openModalView(view: IUIKitModalViewParam, context: IUIKitInteractionParam, user: IUser) {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated please prefer the `updateSurfaceView` method
	 */
	public updateModalView(view: IUIKitModalViewParam, context: IUIKitInteractionParam, user: IUser) {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated please prefer the `openSurfaceView` method
	 */
	public openContextualBarView(view: IUIKitContextualBarViewParam, context: IUIKitInteractionParam, user: IUser) {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated please prefer the `updateSurfaceView` method
	 */
	public updateContextualBarView(view: IUIKitContextualBarViewParam, context: IUIKitInteractionParam, user: IUser) {
        /* Implementation Hidden */
    }

	public openSurfaceView(view: IUIKitSurfaceViewParam, context: IUIKitInteractionParam, user: IUser) {
        /* Implementation Hidden */
    }

	public updateSurfaceView(view: IUIKitSurfaceViewParam, context: IUIKitInteractionParam, user: IUser) {
        /* Implementation Hidden */
    }

	public setViewError(errorInteraction: IUIKitErrorInteractionParam, context: IUIKitInteractionParam, user: IUser) {
        /* Implementation Hidden */
    }

	private openContextualBar(
		view: IUIKitContextualBarViewParam,
		context: IUIKitInteractionParam,
		user: IUser,
		isUpdate = false,
	): Promise<void> {
        /* Implementation Hidden */
    }

	private openModal(view: IUIKitModalViewParam, context: IUIKitInteractionParam, user: IUser, isUpdate = false): Promise<void> {
        /* Implementation Hidden */
    }
}

```