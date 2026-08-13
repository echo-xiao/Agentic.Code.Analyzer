## File: apps/meteor/client/views/admin/workspace/VersionCard/VersionCard.tsx

```typescript
import type { IWorkspaceInfo } from '@rocket.chat/core-typings';
import { Box, Card, CardBody, CardCol, CardControls, CardHeader, CardTitle, Icon } from '@rocket.chat/fuselage';
import { useBreakpoints } from '@rocket.chat/fuselage-hooks';
import type { SupportedVersions } from '@rocket.chat/server-cloud-communication';
import { ExternalLink, useLicense, useLicenseName } from '@rocket.chat/ui-client';
import type { LocationPathname } from '@rocket.chat/ui-contexts';
import { useSetModal, useMediaUrl } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import VersionCardActionButton from './components/VersionCardActionButton';
import type { VersionActionItem } from './components/VersionCardActionItem';
import VersionCardActionItem from './components/VersionCardActionItem';
import { VersionCardSkeleton } from './components/VersionCardSkeleton';
import { VersionTag } from './components/VersionTag';
import { getVersionStatus } from './getVersionStatus';
import RegisterWorkspaceModal from './modals/RegisterWorkspaceModal';
import { useFormatDate } from '../../../../hooks/useFormatDate';
import { useRegistrationStatus } from '../../../../hooks/useRegistrationStatus';
import { links } from '../../../../lib/links';
import { isOverLicenseLimits } from '../../../../lib/utils/isOverLicenseLimits';

const SUPPORT_EXTERNAL_LINK = links.go.versionSupport;
const RELEASES_EXTERNAL_LINK = links.go.updateProduct;

export type VersionCardProps = {
	serverInfo: IWorkspaceInfo;
};

const VersionCard = ({ serverInfo }: VersionCardProps) => {
    /* Implementation Hidden */
};

export default VersionCard;

const decodeBase64 = (b64: string): SupportedVersions | undefined => {
    /* Implementation Hidden */
};

```