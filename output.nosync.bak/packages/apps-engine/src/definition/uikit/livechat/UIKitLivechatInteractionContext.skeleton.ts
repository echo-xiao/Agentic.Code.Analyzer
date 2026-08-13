## File: packages/apps-engine/src/definition/uikit/livechat/UIKitLivechatInteractionContext.ts

```typescript
import type { IUIKitBaseIncomingInteraction } from '../UIKitIncomingInteractionTypes';
import { UIKitInteractionResponder } from '../UIKitInteractionResponder';
import type { IUIKitLivechatBaseIncomingInteraction, IUIKitLivechatBlockIncomingInteraction } from './UIKitLivechatIncomingInteractionType';

export abstract class UIKitLivechatInteractionContext {
	private baseContext: IUIKitLivechatBaseIncomingInteraction;

	private responder: UIKitInteractionResponder;

	constructor(baseContext: IUIKitLivechatBaseIncomingInteraction) {
        /* Implementation Hidden */
    }

	public getInteractionResponder() {
        /* Implementation Hidden */
    }

	public abstract getInteractionData(): IUIKitLivechatBaseIncomingInteraction;
}

export class UIKitLivechatBlockInteractionContext extends UIKitLivechatInteractionContext {
	constructor(private readonly interactionData: IUIKitLivechatBlockIncomingInteraction) {
        /* Implementation Hidden */
    }

	public getInteractionData(): IUIKitLivechatBlockIncomingInteraction {
        /* Implementation Hidden */
    }
}

```