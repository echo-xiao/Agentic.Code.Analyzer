## File: packages/livechat/src/components/Screen/Header.tsx

```typescript
import type { ComponentChildren } from 'preact';
import { useRef } from 'preact/hooks';
import { useTranslation, withTranslation } from 'react-i18next';

import type { ScreenContextValue } from './ScreenProvider';
import type { Agent } from '../../definitions/agents';
import MinimizeIcon from '../../icons/arrowDown.svg';
import RestoreIcon from '../../icons/arrowUp.svg';
import NotificationsEnabledIcon from '../../icons/bell.svg';
import NotificationsDisabledIcon from '../../icons/bellOff.svg';
import OpenWindowIcon from '../../icons/newWindow.svg';
import Alert from '../Alert';
import { Avatar } from '../Avatar';
import {
	Header,
	HeaderAction,
	HeaderActions,
	HeaderContent,
	HeaderCustomField,
	HeaderPicture,
	HeaderPost,
	HeaderSubTitle,
	HeaderTitle,
} from '../Header';
import { TooltipContainer, TooltipTrigger } from '../Tooltip';

type ScreenHeaderProps = {
	alerts: { id: string; children: ComponentChildren; [key: string]: unknown }[];
	agent: Agent;
	notificationsEnabled: boolean;
	minimized: boolean;
	expanded: boolean;
	windowed: boolean;
	onDismissAlert?: (id?: string) => void;
	onEnableNotifications: () => unknown;
	onDisableNotifications: () => unknown;
	onMinimize: () => unknown;
	onRestore: ScreenContextValue['onRestore'];
	onOpenWindow: () => unknown;
	queueInfo: {
		spot: number;
	};
	title: string;
	hideExpandChat: boolean;
};

const ScreenHeader = ({
	alerts,
	agent,
	notificationsEnabled,
	minimized,
	expanded,
	windowed,
	onDismissAlert,
	onEnableNotifications,
	onDisableNotifications,
	onMinimize,
	onRestore,
	onOpenWindow,
	queueInfo,
	title,
	hideExpandChat,
}: ScreenHeaderProps) => {
    /* Implementation Hidden */
};

export default withTranslation()(ScreenHeader);

```