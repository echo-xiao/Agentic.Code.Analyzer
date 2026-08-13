## File: apps/meteor/client/views/omnichannel/directory/chats/ChatInfo/ChatInfo.tsx

```typescript
import type { IOmnichannelRoom, IVisitor } from '@rocket.chat/core-typings';
import { Box, Margins, Tag, Button, ButtonGroup } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ContextualbarScrollableContent, ContextualbarFooter, InfoPanelField, InfoPanelLabel, InfoPanelText } from '@rocket.chat/ui-client';
import type { IRouterPaths } from '@rocket.chat/ui-contexts';
import { useToastMessageDispatch, useRoute, useUserSubscription, useTranslation, usePermission, useUserId } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import DepartmentField from './DepartmentField';
import VisitorClientInfo from './VisitorClientInfo';
import MarkdownText from '../../../../../components/MarkdownText';
import { useFormatDateAndTime } from '../../../../../hooks/useFormatDateAndTime';
import { useFormatDuration } from '../../../../../hooks/useFormatDuration';
import { useFormattedRelativeTime } from '../../../../../hooks/useFormattedRelativeTime';
import CustomField from '../../../components/CustomField';
import { useValidCustomFields } from '../../../contactInfo/hooks/useValidCustomFields';
import { AgentField, SlaField, ContactField, SourceField } from '../../components';
import PriorityField from '../../components/PriorityField';
import { useOmnichannelRoomInfo } from '../../hooks/useOmnichannelRoomInfo';
import { formatQueuedAt } from '../../utils/formatQueuedAt';

type ChatInfoProps = {
	id: string;
	route: keyof IRouterPaths;
};

function ChatInfo({ id, route }: ChatInfoProps) {
    /* Implementation Hidden */
}

export default ChatInfo;

```