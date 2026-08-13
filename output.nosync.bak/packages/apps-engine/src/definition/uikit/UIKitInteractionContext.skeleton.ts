## File: packages/apps-engine/src/definition/uikit/UIKitInteractionContext.ts

```typescript
import type {
	IUIKitActionButtonIncomingInteraction,
	IUIKitActionButtonMessageBoxIncomingInteraction,
	IUIKitBaseIncomingInteraction,
	IUIKitBlockIncomingInteraction,
	IUIKitViewCloseIncomingInteraction,
	IUIKitViewSubmitIncomingInteraction,
} from './UIKitIncomingInteractionTypes';
import { UIKitInteractionResponder } from './UIKitInteractionResponder';

export abstract class UIKitInteractionContext {
	private baseContext: IUIKitBaseIncomingInteraction;

	private responder: UIKitInteractionResponder;

	constructor(baseContext: IUIKitBaseIncomingInteraction) {
        /* Implementation Hidden */
    }

	public getInteractionResponder() {
        /* Implementation Hidden */
    }

	public abstract getInteractionData(): IUIKitBaseIncomingInteraction;
}

export class UIKitBlockInteractionContext extends UIKitInteractionContext {
	constructor(private readonly interactionData: IUIKitBlockIncomingInteraction) {
        /* Implementation Hidden */
    }

	public getInteractionData(): IUIKitBlockIncomingInteraction {
        /* Implementation Hidden */
    }
}

export class UIKitViewSubmitInteractionContext extends UIKitInteractionContext {
	constructor(private readonly interactionData: IUIKitViewSubmitIncomingInteraction) {
        /* Implementation Hidden */
    }

	public getInteractionData(): IUIKitViewSubmitIncomingInteraction {
        /* Implementation Hidden */
    }
}

export class UIKitViewCloseInteractionContext extends UIKitInteractionContext {
	constructor(private readonly interactionData: IUIKitViewCloseIncomingInteraction) {
        /* Implementation Hidden */
    }

	public getInteractionData(): IUIKitViewCloseIncomingInteraction {
        /* Implementation Hidden */
    }
}

export class UIKitActionButtonInteractionContext extends UIKitInteractionContext {
	constructor(private readonly interactionData: IUIKitActionButtonIncomingInteraction | IUIKitActionButtonMessageBoxIncomingInteraction) {
        /* Implementation Hidden */
    }

	public getInteractionData(): IUIKitActionButtonIncomingInteraction {
        /* Implementation Hidden */
    }
}

```