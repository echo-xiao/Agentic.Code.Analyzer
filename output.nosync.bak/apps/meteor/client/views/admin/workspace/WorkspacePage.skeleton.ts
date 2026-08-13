## File: apps/meteor/client/views/admin/workspace/WorkspacePage.tsx

```typescript
import type { IWorkspaceInfo, IStats } from '@rocket.chat/core-typings';
import { Box, Button, ButtonGroup, Callout, CardGrid } from '@rocket.chat/fuselage';
import type { IInstance } from '@rocket.chat/rest-typings';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import DeploymentCard from './DeploymentCard/DeploymentCard';
import MessagesRoomsCard from './MessagesRoomsCard/MessagesRoomsCard';
import UsersUploadsCard from './UsersUploadsCard/UsersUploadsCard';
import VersionCard from './VersionCard/VersionCard';
import { useIsEnterprise } from '../../../hooks/useIsEnterprise';

type WorkspaceStatusPageProps = {
	canViewStatistics: boolean;
	serverInfo: IWorkspaceInfo;
	statistics: IStats;
	statisticsIsLoading: boolean;
	instances: IInstance[];
	onClickRefreshButton: () => void;
	onClickDownloadInfo: () => void;
};

const WorkspacePage = ({
	canViewStatistics,
	serverInfo,
	statistics,
	statisticsIsLoading,
	instances,
	onClickRefreshButton,
	onClickDownloadInfo,
}: WorkspaceStatusPageProps) => {
    /* Implementation Hidden */
};

export default memo(WorkspacePage);

```