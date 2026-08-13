## File: apps/meteor/client/views/room/contextualBar/Info/RoomInfo/RoomInfo.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Box, Callout, IconButton } from '@rocket.chat/fuselage';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import {
	GenericMenu,
	ContextualbarHeader,
	ContextualbarScrollableContent,
	ContextualbarBack,
	ContextualbarIcon,
	ContextualbarClose,
	ContextualbarTitle,
	ContextualbarDialog,
	InfoPanel,
	InfoPanelActionGroup,
	InfoPanelAvatar,
	InfoPanelField,
	InfoPanelLabel,
	InfoPanelSection,
	InfoPanelText,
	InfoPanelTitle,
} from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import RoomInfoActions from './RoomInfoActions';
import RetentionPolicyCallout from '../../../../../components/InfoPanel/RetentionPolicyCallout';
import MarkdownText from '../../../../../components/MarkdownText';
import { useRetentionPolicy } from '../../../hooks/useRetentionPolicy';
import { useRoomActions } from '../hooks/useRoomActions';
import { useSplitRoomActions } from '../hooks/useSplitRoomActions';
import RoomInfoABACSection from './ABAC/RoomInfoABACSection';

type RoomInfoProps = {
	room: IRoom;
	icon: string;
	onClickBack?: () => void;
	onClickClose?: () => void;
	onClickEnterRoom?: () => void;
	onClickEdit?: () => void;
	resetState?: () => void;
};

const RoomInfo = ({ room, icon, onClickBack, onClickClose, onClickEnterRoom, onClickEdit, resetState }: RoomInfoProps) => {
    /* Implementation Hidden */
};

export default RoomInfo;

```