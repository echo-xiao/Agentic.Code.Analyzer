## File: packages/livechat/src/helpers/canRenderMessage.ts

```typescript
import {
	MESSAGE_TYPE_COMMAND,
	MESSAGE_TYPE_LIVECHAT_NAVIGATION_HISTORY,
	MESSAGE_TYPE_PRIORITY_CHANGE,
	MESSAGE_TYPE_ROOM_NAME_CHANGED,
	MESSAGE_TYPE_SLA_CHANGE,
	MESSAGE_TYPE_USER_ADDED,
	MESSAGE_TYPE_USER_REMOVED,
	MESSAGE_TYPE_WELCOME,
	MESSAGE_VIDEO_CALL,
} from '../components/Messages/constants';
import store from '../store';

const msgTypesNotRendered = [
	MESSAGE_TYPE_WELCOME,
	MESSAGE_TYPE_ROOM_NAME_CHANGED,
	MESSAGE_TYPE_USER_ADDED,
	MESSAGE_TYPE_USER_REMOVED,
	MESSAGE_VIDEO_CALL,
	MESSAGE_TYPE_LIVECHAT_NAVIGATION_HISTORY,
	MESSAGE_TYPE_COMMAND,
	MESSAGE_TYPE_PRIORITY_CHANGE,
	MESSAGE_TYPE_SLA_CHANGE,
];

export const getHiddenSystemMessages = () => {
    /* Implementation Hidden */
};

export const canRenderMessage = ({ t }: { t: string }) => {
    /* Implementation Hidden */
};

```