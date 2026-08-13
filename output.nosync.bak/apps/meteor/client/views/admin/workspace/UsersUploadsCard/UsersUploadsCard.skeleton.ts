## File: apps/meteor/client/views/admin/workspace/UsersUploadsCard/UsersUploadsCard.tsx

```typescript
import type { IStats } from '@rocket.chat/core-typings';
import { Button, Card, CardBody, CardControls, Margins } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRouter } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatMemorySize } from '../../../../hooks/useFormatMemorySize';
import { useHasLicenseModule } from '../../../../hooks/useHasLicenseModule';
import WorkspaceCardSection from '../components/WorkspaceCardSection';
import WorkspaceCardSectionTitle from '../components/WorkspaceCardSectionTitle';
import WorkspaceCardTextSeparator from '../components/WorkspaceCardTextSeparator';

export type UsersUploadsCardProps = {
	statistics: IStats;
};

const UsersUploadsCard = ({ statistics }: UsersUploadsCardProps) => {
    /* Implementation Hidden */
};

export default memo(UsersUploadsCard);

```