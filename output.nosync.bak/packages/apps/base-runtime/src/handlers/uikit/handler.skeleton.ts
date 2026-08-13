## File: packages/apps/base-runtime/src/handlers/uikit/handler.ts

```typescript
import type { App } from '@rocket.chat/apps-engine/definition/App';
import type {
	IUIKitBlockIncomingInteraction,
	IUIKitViewSubmitIncomingInteraction,
	IUIKitViewCloseIncomingInteraction,
	IUIKitActionButtonIncomingInteraction,
} from '@rocket.chat/apps-engine/definition/uikit/UIKitIncomingInteractionTypes';
import {
	UIKitBlockInteractionContext,
	UIKitViewSubmitInteractionContext,
	UIKitViewCloseInteractionContext,
	UIKitActionButtonInteractionContext,
} from '@rocket.chat/apps-engine/definition/uikit/UIKitInteractionContext';
import type { IUIKitLivechatBlockIncomingInteraction } from '@rocket.chat/apps-engine/definition/uikit/livechat/UIKitLivechatIncomingInteractionType';
import { UIKitLivechatBlockInteractionContext } from '@rocket.chat/apps-engine/definition/uikit/livechat/UIKitLivechatInteractionContext';
import type { Defined } from 'jsonrpc-lite';
import { JsonRpcError } from 'jsonrpc-lite';

import { AppObjectRegistry } from '../../AppObjectRegistry';
import { AppAccessorsInstance } from '../../lib/accessors/mod';
import type { RequestContext } from '../../lib/requestContext';
import { wrapAppForRequest } from '../../lib/wrapAppForRequest';
import { isOneOf } from '../lib/assertions';

export const uikitInteractions = [
	'executeBlockActionHandler',
	'executeViewSubmitHandler',
	'executeViewClosedHandler',
	'executeActionButtonHandler',
	'executeLivechatBlockActionHandler',
] as const;

export {
	UIKitBlockInteractionContext,
	UIKitViewSubmitInteractionContext,
	UIKitViewCloseInteractionContext,
	UIKitActionButtonInteractionContext,
	UIKitLivechatBlockInteractionContext,
};

export default async function handleUIKitInteraction(request: RequestContext): Promise<Defined | JsonRpcError> {
    /* Implementation Hidden */
}

```