## File: apps/meteor/client/views/admin/workspace/MessagesRoomsCard/MessagesRoomsCard.tsx

```typescript
import type { IStats } from '@rocket.chat/core-typings';
import { Card } from '@rocket.chat/fuselage';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import WorkspaceCardSection from '../components/WorkspaceCardSection';
import WorkspaceCardSectionTitle from '../components/WorkspaceCardSectionTitle';
import WorkspaceCardTextSeparator from '../components/WorkspaceCardTextSeparator';

export type MessagesRoomsCardProps = {
	statistics: IStats;
};

const MessagesRoomsCard = ({ statistics }: MessagesRoomsCardProps) => {
    /* Implementation Hidden */
};

export default memo(MessagesRoomsCard);

```