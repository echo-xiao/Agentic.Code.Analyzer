## File: packages/livechat/src/widget.ts

```typescript
import type { UserStatus } from '@rocket.chat/core-typings';
import type { LivechatRoomEvents } from '@rocket.chat/ddp-client';
import { Emitter } from '@rocket.chat/emitter';

import { isDefined } from './helpers/isDefined';
import type { HooksWidgetAPI } from './lib/hooks';
import type { StoreState } from './store';

type InternalWidgetAPI = {
	ready: () => void;
	minimizeWindow: () => void;
	restoreWindow: () => void;
	openPopout: (state: StoreState) => void;
	openWidget: () => void;
	resizeWidget: (height: number) => void;
	removeWidget: () => void;
	callback: (eventName: string, data?: unknown) => void;
	showWidget: () => void;
	hideWidget: () => void;
	resetDocumentStyle: () => void;
	setFullScreenDocumentMobile: () => void;
	setWidgetPosition: (position: 'left' | 'right') => void;
};

export type LivechatMessageEventData<ApiType extends Record<string, any>, Fn extends keyof ApiType = keyof ApiType> = {
	src?: string;
	fn: Fn;
	args: Parameters<ApiType[Fn]>;
};

type InitializeParams = {
	customField: [key: string, value: string, overwrite?: boolean];
	setCustomFields: [key: string, value: string, overwrite?: boolean][];
	theme: StoreState['iframe']['theme'];
	department: string;
	businessUnit: string;
	guestToken: string;
	guestName: string;
	guestEmail: string;
	registerGuest: StoreState['guest'];
	language: string;
	agent: StoreState['defaultAgent'];
	parentUrl: string;
	setGuestMetadata: StoreState['iframe']['guestMetadata'];
	hiddenSystemMessages: StoreState['iframe']['hiddenSystemMessages'];
};

const WIDGET_OPEN_WIDTH = 365;
const WIDGET_OPEN_HEIGHT = 525;
const WIDGET_MINIMIZED_WIDTH = 54;
const WIDGET_MINIMIZED_HEIGHT = 54;
const WIDGET_MARGIN = 16;

window.RocketChat = window.RocketChat || { _: [] };
const config: { url?: string } = {};
let widget: HTMLDivElement | null;
let iframe: HTMLIFrameElement | null;
let hookQueue: [keyof HooksWidgetAPI, Parameters<HooksWidgetAPI[keyof HooksWidgetAPI]>][] = [];
let ready = false;
let smallScreen = false;
let scrollPosition: number;
let widgetHeight: number;
let popoutWindow: Window | null = null;

export const VALID_CALLBACKS = [
	'chat-maximized',
	'chat-minimized',
	'chat-started',
	'chat-ended',
	'pre-chat-form-submit',
	'offline-form-submit',
	'show-widget',
	'hide-widget',
	'assign-agent',
	'agent-status-change',
	'queue-position-change',
	'no-agent-online',
];

const VALID_SYSTEM_MESSAGES = ['uj', 'ul', 'livechat-close', 'livechat-started', 'livechat_transfer_history'];

const callbacks = new Emitter();

function registerCallback(eventName: string, fn: () => unknown) {
    /* Implementation Hidden */
}

function emitCallback(eventName: string, data?: unknown) {
    /* Implementation Hidden */
}

function clearAllCallbacks() {
    /* Implementation Hidden */
}

const formatMessage = (action: keyof HooksWidgetAPI, ...params: Parameters<HooksWidgetAPI[keyof HooksWidgetAPI]>) => ({
	src: 'rocketchat',
	fn: action,
	args: params,
});

// hooks
function callHook(action: keyof HooksWidgetAPI, ...params: Parameters<HooksWidgetAPI[keyof HooksWidgetAPI]>) {
    /* Implementation Hidden */
}

function processHookQueue() {
    /* Implementation Hidden */
}

const updateWidgetStyle = (isOpened: boolean) => {
    /* Implementation Hidden */
};

const createWidget = (url: string) => {
    /* Implementation Hidden */
};

const openWidget = () => {
    /* Implementation Hidden */
};

const setWidgetPosition = (position: 'left' | 'right' = 'right') => {
    /* Implementation Hidden */
};

const resizeWidget = (height: number) => {
    /* Implementation Hidden */
};

function closeWidget() {
    /* Implementation Hidden */
}

function pageVisited(change: string) {
    /* Implementation Hidden */
}

function setCustomField(key: string, value = '', overwrite = true) {
    /* Implementation Hidden */
}

function setCustomFields(fields: [key: string, value: string, overwrite?: boolean][]) {
    /* Implementation Hidden */
}

function setTheme(theme: StoreState['iframe']['theme']) {
    /* Implementation Hidden */
}

function setDepartment(department: string) {
    /* Implementation Hidden */
}

function setBusinessUnit(businessUnit: string) {
    /* Implementation Hidden */
}

function clearBusinessUnit() {
    /* Implementation Hidden */
}

function setGuestToken(token: string) {
    /* Implementation Hidden */
}

function setGuestName(name: string) {
    /* Implementation Hidden */
}

function setGuestEmail(email: string) {
    /* Implementation Hidden */
}

function registerGuest(guest: StoreState['guest']) {
    /* Implementation Hidden */
}

function clearDepartment() {
    /* Implementation Hidden */
}

function setAgent(agent: StoreState['defaultAgent']) {
    /* Implementation Hidden */
}

function setLanguage(lang: string) {
    /* Implementation Hidden */
}

function showWidget() {
    /* Implementation Hidden */
}

function hideWidget() {
    /* Implementation Hidden */
}

function maximizeWidget() {
    /* Implementation Hidden */
}

function minimizeWidget() {
    /* Implementation Hidden */
}

function setParentUrl(url: string) {
    /* Implementation Hidden */
}

function transferChat(rid: string, department: string) {
    /* Implementation Hidden */
}

function setGuestMetadata(metadata: StoreState['iframe']['guestMetadata']) {
    /* Implementation Hidden */
}

function setHiddenSystemMessages(hidden: StoreState['iframe']['hiddenSystemMessages']) {
    /* Implementation Hidden */
}

function initialize(initParams: Partial<InitializeParams>) {
    /* Implementation Hidden */
}

const api: InternalWidgetAPI = {
	openWidget,

	resizeWidget,

	ready() {
		ready = true;
		processHookQueue();
	},

	minimizeWindow() {
		closeWidget();
	},
	restoreWindow() {
		if (popoutWindow && popoutWindow.closed !== true) {
			popoutWindow.close();
			popoutWindow = null;
		}
		openWidget();
	},

	openPopout(state: Partial<StoreState>) {
		closeWidget();

		if (!config.url) {
			throw new Error('Config.url is not set!');
		}

		const url = new URL(config.url);
		url.searchParams.append('mode', 'popout');

		listenForMessageOnce('ready', () => {
			popoutWindow?.postMessage(formatMessage('syncState', state), '*');
		});

		popoutWindow = window.open(url, 'livechat-popout', `width=${WIDGET_OPEN_WIDTH}, height=${widgetHeight}, toolbars=no`);
	},

	removeWidget() {
		document.body.removeChild(widget as Node);
	},

	callback(eventName, data) {
		emitCallback(eventName, data);
	},

	showWidget() {
		if (!iframe) {
			throw new Error('Widget is not initialized');
		}
		iframe.style.display = 'initial';
		emitCallback('show-widget');
	},

	hideWidget() {
		if (!iframe) {
			throw new Error('Widget is not initialized');
		}
		iframe.style.display = 'none';
		emitCallback('hide-widget');
	},

	resetDocumentStyle() {
		document.body.classList.remove('rc-livechat-mobile-full-screen');
	},

	setFullScreenDocumentMobile() {
		smallScreen && document.body.classList.add('rc-livechat-mobile-full-screen');
	},

	setWidgetPosition,
};

const livechatWidgetAPI = {
	// initParams
	initialize,
	pageVisited,
	setCustomField,
	setTheme,
	setDepartment,
	clearDepartment,
	setGuestToken,
	setGuestName,
	setGuestEmail,
	setAgent,
	registerGuest,
	setLanguage,
	showWidget,
	hideWidget,
	maximizeWidget,
	minimizeWidget,
	setBusinessUnit,
	clearBusinessUnit,
	setParentUrl,
	setGuestMetadata,
	clearAllCallbacks,
	setHiddenSystemMessages,
	transferChat,

	// callbacks
	onChatMaximized(fn: () => void) {
		registerCallback('chat-maximized', fn);
	},
	onChatMinimized(fn: () => void) {
		registerCallback('chat-minimized', fn);
	},
	onChatStarted(fn: () => void) {
		registerCallback('chat-started', fn);
	},
	onChatEnded(fn: () => void) {
		registerCallback('chat-ended', fn);
	},
	onPrechatFormSubmit(
		fn: () => {
			name: string;
			email: string;
			department?: string;
		},
	) {
		registerCallback('pre-chat-form-submit', fn);
	},
	onOfflineFormSubmit(
		fn: () => {
			name: string;
			email: string;
			department?: string;
			message: string;
		},
	) {
		registerCallback('offline-form-submit', fn);
	},
	onWidgetShown(fn: () => void) {
		registerCallback('show-widget', fn);
	},
	onWidgetHidden(fn: () => void) {
		registerCallback('hide-widget', fn);
	},
	onAssignAgent(
		fn: () => {
			name: string | undefined;
			username: string | undefined;
			status: UserStatus | undefined;
		},
	) {
		registerCallback('assign-agent', fn);
	},
	onAgentStatusChange(
		fn: () => {
			name: string | undefined;
			username: string | undefined;
			status: UserStatus | undefined;
		},
	) {
		registerCallback('agent-status-change', fn);
	},
	onQueuePositionChange(fn: () => LivechatRoomEvents<'queueData' | 'agentData'>) {
		registerCallback('queue-position-change', fn);
	},
	onServiceOffline(fn: () => void) {
		registerCallback('no-agent-online', fn);
	},
};

const currentPage: { href: string | null; title: string | null } = {
	href: null,
	title: null,
};

function isValidMessage(event: MessageEvent<LivechatMessageEventData<InternalWidgetAPI>>) {
    /* Implementation Hidden */
}

function onNewMessage(event: MessageEvent<LivechatMessageEventData<InternalWidgetAPI>>) {
    /* Implementation Hidden */
}

function listenForMessageOnce<K extends keyof InternalWidgetAPI>(
	key: K,
	callback: (data: LivechatMessageEventData<InternalWidgetAPI, K>) => void,
): void {
    /* Implementation Hidden */
}

const attachMessageListener = () => {
    /* Implementation Hidden */
};

const trackNavigation = () => {
    /* Implementation Hidden */
};

const init = (url: string) => {
    /* Implementation Hidden */
};

if (typeof window.initRocket !== 'undefined') {
	console.warn('initRocket is now deprecated. Please update the livechat code.');
	init(window.initRocket[0]);
}

if (typeof window.RocketChat.url !== 'undefined') {
	init(window.RocketChat.url);
}

const queue = window.RocketChat._;

window.RocketChat._.push = function (c: () => void) {
	c.call(window.RocketChat.livechat);
};

window.RocketChat = window.RocketChat._.push;

// exports
window.RocketChat.livechat = livechatWidgetAPI;

// proccess queue
queue.forEach((c: () => void) => {
	c.call(window.RocketChat.livechat);
});

```