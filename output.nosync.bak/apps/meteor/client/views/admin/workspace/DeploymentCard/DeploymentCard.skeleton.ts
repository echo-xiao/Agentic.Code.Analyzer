## File: apps/meteor/client/views/admin/workspace/DeploymentCard/DeploymentCard.tsx

```typescript
import type { IWorkspaceInfo, IStats } from '@rocket.chat/core-typings';
import { Button, Card, CardBody, CardControls, Margins } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { IInstance } from '@rocket.chat/rest-typings';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatDateAndTime } from '../../../../hooks/useFormatDateAndTime';
import WorkspaceCardSection from '../components/WorkspaceCardSection';
import InstancesModal from './components/InstancesModal';
import WorkspaceCardSectionTitle from '../components/WorkspaceCardSectionTitle';

export type DeploymentCardProps = {
	serverInfo: IWorkspaceInfo;
	instances: IInstance[];
	statistics: IStats;
};

const DeploymentCard = ({
	serverInfo: { info, cloudWorkspaceId, workspaceUrl, hashedWorkspaceUrl },
	statistics,
	instances,
}: DeploymentCardProps) => {
    /* Implementation Hidden */
};

export default memo(DeploymentCard);

```