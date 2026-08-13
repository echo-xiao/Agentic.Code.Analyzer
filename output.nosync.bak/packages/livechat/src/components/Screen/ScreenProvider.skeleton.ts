## File: packages/livechat/src/components/Screen/ScreenProvider.tsx

```typescript
import type { ComponentChildren } from 'preact';
import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { parse } from 'query-string';

import { isActiveSession } from '../../helpers/isActiveSession';
import { loadConfig } from '../../lib/main';
import { parentCall } from '../../lib/parentCall';
import { loadMessages } from '../../lib/room';
import Triggers from '../../lib/triggers';
import { StoreContext } from '../../store';

export type ScreenTheme = {
	color: string;
	fontColor: string;
	iconColor: string;
	position?: 'left' | 'right';
	guestBubbleBackgroundColor?: string;
	agentBubbleBackgroundColor?: string;
	background?: string;
	hideAgentAvatar: boolean;
	hideGuestAvatar: boolean;
	hideExpandChat: boolean;
};

export type ScreenContextValue = {
	hideWatermark: boolean;
	livechatLogo: { url: string } | undefined;
	notificationsEnabled: boolean;
	minimized: boolean;
	expanded: boolean;
	windowed: boolean;
	sound: {
		src: string;
		play: boolean;
	};
	alerts: unknown;
	modal: unknown;
	nameDefault: string;
	emailDefault: string;
	departmentDefault: string;
	onEnableNotifications: () => unknown;
	onDisableNotifications: () => unknown;
	onMinimize: () => unknown;
	onRestore: () => Promise<void>;
	onOpenWindow: () => unknown;
	onDismissAlert: () => unknown;
	dismissNotification: () => void;
	theme: ScreenTheme;
};

export const ScreenContext = createContext<ScreenContextValue>({
	theme: {
		color: '',
		fontColor: '',
		iconColor: '',
		hideAgentAvatar: false,
		hideGuestAvatar: true,
		hideExpandChat: false,
	},
	notificationsEnabled: true,
	minimized: true,
	windowed: false,
	onEnableNotifications: () => undefined,
	onDisableNotifications: () => undefined,
	onMinimize: () => undefined,
	onRestore: async () => undefined,
	onOpenWindow: () => undefined,
} as ScreenContextValue);

type ScreenProviderProps = {
	children: ComponentChildren;
};

export const ScreenProvider = ({ children }: ScreenProviderProps) => {
    /* Implementation Hidden */
};

```