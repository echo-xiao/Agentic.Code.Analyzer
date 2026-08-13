## File: apps/meteor/client/views/omnichannel/agents/AgentInfo.tsx

```typescript
import { Box, Margins, ButtonGroup } from '@rocket.chat/fuselage';
import {
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarHeader,
	ContextualbarScrollableContent,
	ContextualbarSkeletonBody,
	InfoPanelLabel,
	InfoPanelText,
} from '@rocket.chat/ui-client';
import { useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import AgentInfoAction from './AgentInfoAction';
import { useRemoveAgent } from './hooks/useRemoveAgent';
import { UserInfoAvatar, UserInfoUsername } from '../../../components/UserInfo';
import { UserStatus } from '../../../components/UserStatus';
import { MaxChatsPerAgentDisplay } from '../additionalForms';

export type AgentInfoProps = {
	uid: string;
} & Omit<HTMLAttributes<HTMLElement>, 'is'>;

const AgentInfo = ({ uid }: AgentInfoProps) => {
    /* Implementation Hidden */
};

export default AgentInfo;

```