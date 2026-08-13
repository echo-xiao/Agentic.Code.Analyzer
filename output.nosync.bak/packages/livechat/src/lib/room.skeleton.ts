## File: packages/livechat/src/lib/room.js

```typescript
import i18next from 'i18next';
import { route } from 'preact-router';

import { Livechat } from '../api';
import { canRenderMessage } from '../helpers/canRenderMessage';
import { setCookies } from '../helpers/cookies';
import { upsert } from '../helpers/upsert';
import { store, initialState } from '../store';
import { normalizeAgent } from './api';
import Commands from './commands';
import { loadConfig, processUnread } from './main';
import { parentCall } from './parentCall';
import { createToken } from './random';
import { normalizeMessage, normalizeMessages } from './threads';
import { handleTranscript } from './transcript';
import Triggers from './triggers';

const commands = new Commands();

export const closeChat = async ({ transcriptRequested } = {}) => {
    /* Implementation Hidden */
};

const getVideoConfMessageData = (message) =>
	message.blocks
		?.find(({ appId, type }) => appId === 'videoconf-core' && type === 'actions')
		?.elements?.find(({ actionId }) => actionId === 'joinLivechat');

const isVideoCallMessage = (message) => {
    /* Implementation Hidden */
};

const findCallData = (message) => {
    /* Implementation Hidden */
};

// TODO: use a separate event to listen to call start event. Listening on the message type isn't a good solution
export const processIncomingCallMessage = async (message) => {
    /* Implementation Hidden */
};

const processMessage = async (message) => {
    /* Implementation Hidden */
};

const doPlaySound = async (message) => {
    /* Implementation Hidden */
};

export const onAgentChange = async (agent) => {
    /* Implementation Hidden */
};

export const onAgentStatusChange = (status) => {
    /* Implementation Hidden */
};

export const onQueuePositionChange = async (queueInfo) => {
    /* Implementation Hidden */
};

export const initRoom = async () => {
    /* Implementation Hidden */
};

const isAgentHidden = () => {
    /* Implementation Hidden */
};

const transformAgentInformationOnMessage = (message) => {
    /* Implementation Hidden */
};

export const onUserActivity = (username, activities) => {
    /* Implementation Hidden */
};

export const onMessage = async (originalMessage) => {
    /* Implementation Hidden */
};

export const getGreetingMessages = (messages) => messages && messages.filter((msg) => msg.trigger);
export const getLatestCallMessage = (messages) => messages && messages.filter((msg) => isVideoCallMessage(msg)).pop();

export const loadMessages = async () => {
    /* Implementation Hidden */
};

export const loadMoreMessages = async () => {
    /* Implementation Hidden */
};

export const defaultRoomParams = () => {
    /* Implementation Hidden */
};

store.on('change', ([state, prevState]) => {
	// Cross-tab communication
	// Detects when a room is created and then route to the correct container
	if (prevState.room?._id !== state.room?._id) {
		route('/');
	}
});

```