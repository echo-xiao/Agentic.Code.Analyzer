## File: packages/apps-engine/src/definition/uikit/UIKitInteractionResponder.ts

```typescript
import type { IUIKitContextualBarResponse, IUIKitErrorResponse, IUIKitModalResponse, IUIKitResponse } from './IUIKitInteractionType';
import { UIKitInteractionType } from './IUIKitInteractionType';
import type { IUIKitSurface } from './IUIKitSurface';
import type { IUIKitBaseIncomingInteraction } from './UIKitIncomingInteractionTypes';
import { formatContextualBarInteraction, formatModalInteraction } from './UIKitInteractionPayloadFormatter';
import type { IUIKitErrorInteractionParam } from '../accessors/IUIController';

export type IUIKitModalViewParam = Omit<IUIKitSurface, 'appId' | 'id' | 'type'> & Partial<Pick<IUIKitSurface, 'id'>>;
export type IUIKitContextualBarViewParam = Omit<IUIKitSurface, 'appId' | 'id' | 'type'> & Partial<Pick<IUIKitSurface, 'id'>>;

export class UIKitInteractionResponder {
	constructor(private readonly baseContext: IUIKitBaseIncomingInteraction) {
        /* Implementation Hidden */
    }

	public successResponse(): IUIKitResponse {
        /* Implementation Hidden */
    }

	public errorResponse(): IUIKitResponse {
        /* Implementation Hidden */
    }

	public openModalViewResponse(viewData: IUIKitModalViewParam): IUIKitModalResponse {
        /* Implementation Hidden */
    }

	public updateModalViewResponse(viewData: IUIKitModalViewParam): IUIKitModalResponse {
        /* Implementation Hidden */
    }

	public openContextualBarViewResponse(viewData: IUIKitContextualBarViewParam): IUIKitContextualBarResponse {
        /* Implementation Hidden */
    }

	public updateContextualBarViewResponse(viewData: IUIKitContextualBarViewParam): IUIKitContextualBarResponse {
        /* Implementation Hidden */
    }

	public viewErrorResponse(errorInteraction: IUIKitErrorInteractionParam): IUIKitErrorResponse {
        /* Implementation Hidden */
    }
}

```