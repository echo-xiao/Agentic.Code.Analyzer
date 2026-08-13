## File: apps/meteor/client/views/teams/contextualBar/info/TeamsInfo.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Box, Button, Callout, IconButton } from '@rocket.chat/fuselage';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import {
	GenericMenu,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarScrollableContent,
	ContextualbarDialog,
	InfoPanel,
	InfoPanelAction,
	InfoPanelActionGroup,
	InfoPanelAvatar,
	InfoPanelField,
	InfoPanelLabel,
	InfoPanelSection,
	InfoPanelText,
	InfoPanelTitle,
} from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { useTeamActions } from './useTeamActions';
import RetentionPolicyCallout from '../../../../components/InfoPanel/RetentionPolicyCallout';
import MarkdownText from '../../../../components/MarkdownText';
import RoomInfoABACSection from '../../../room/contextualBar/Info/RoomInfo/ABAC/RoomInfoABACSection';
import { useSplitRoomActions } from '../../../room/contextualBar/Info/hooks/useSplitRoomActions';
import { useRetentionPolicy } from '../../../room/hooks/useRetentionPolicy';

type TeamsInfoProps = {
	room: IRoom;
	onClickEdit?: () => void;
	onClickClose?: () => void;
	onClickViewChannels: () => void;
};

const TeamsInfo = ({ room, onClickClose, onClickEdit, onClickViewChannels }: TeamsInfoProps) => {
    /* Implementation Hidden */
};

export default TeamsInfo;

```