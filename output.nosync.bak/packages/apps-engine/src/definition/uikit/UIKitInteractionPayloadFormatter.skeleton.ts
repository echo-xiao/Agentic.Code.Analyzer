## File: packages/apps-engine/src/definition/uikit/UIKitInteractionPayloadFormatter.ts

```typescript
import { v1 as uuid } from 'uuid';

import type {
	IUIKitContextualBarInteraction,
	IUIKitErrorInteraction,
	IUIKitInteraction,
	IUIKitModalInteraction,
} from './IUIKitInteractionType';
import { UIKitInteractionType } from './IUIKitInteractionType';
import type { IUIKitSurface } from './IUIKitSurface';
import { UIKitSurfaceType } from './IUIKitSurface';
import type { IUIKitContextualBarViewParam, IUIKitModalViewParam } from './UIKitInteractionResponder';
import type { IUIKitErrorInteractionParam } from '../accessors/IUIController';

function isModalInteraction(type: IUIKitInteraction['type']): type is IUIKitModalInteraction['type'] {
    /* Implementation Hidden */
}

export function formatModalInteraction(view: IUIKitModalViewParam, context: IUIKitInteraction): IUIKitModalInteraction {
    /* Implementation Hidden */
}

function isContextualBarInteraction(type: IUIKitInteraction['type']): type is IUIKitContextualBarInteraction['type'] {
    /* Implementation Hidden */
}

export function formatContextualBarInteraction(
	view: IUIKitContextualBarViewParam,
	context: IUIKitInteraction,
): IUIKitContextualBarInteraction {
    /* Implementation Hidden */
}

export function formatErrorInteraction(errorInteraction: IUIKitErrorInteractionParam, context: IUIKitInteraction): IUIKitErrorInteraction {
    /* Implementation Hidden */
}

```