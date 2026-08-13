## File: packages/livechat/src/lib/uiKit.js

```typescript
import { Livechat } from '../api';
import { createRandomId } from './random';

export const UIKitInteractionType = {
	MODAL_OPEN: 'modal.open',
	MODAL_CLOSE: 'modal.close',
	MODAL_UPDATE: 'modal.update',
	ERRORS: 'errors',
};

export const UIKitIncomingInteractionType = {
	BLOCK: 'blockAction',
	VIEW_SUBMIT: 'viewSubmit',
	VIEW_CLOSED: 'viewClosed',
};

export const UIKitIncomingInteractionContainerType = {
	MESSAGE: 'message',
	VIEW: 'view',
};

const TRIGGER_TIMEOUT = 5000;

const triggersId = new Map();

// const instances = new Map();

const invalidateTriggerId = (id) => {
    /* Implementation Hidden */
};

const generateTriggerId = (appId) => {
    /* Implementation Hidden */
};

const handlePayloadUserInteraction = (type, { /* appId,*/ triggerId, ...data }) => {
    /* Implementation Hidden */
};

export const triggerAction = async ({ appId, type, actionId, rid, mid, viewId, container, payload }) => {
    /* Implementation Hidden */
};

```