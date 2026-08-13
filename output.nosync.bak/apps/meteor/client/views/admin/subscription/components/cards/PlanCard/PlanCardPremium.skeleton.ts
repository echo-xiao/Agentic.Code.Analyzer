## File: apps/meteor/client/views/admin/subscription/components/cards/PlanCard/PlanCardPremium.tsx

```typescript
import type { ILicenseV3 } from '@rocket.chat/core-typings';
import { Box, Card, CardBody, Icon, Skeleton } from '@rocket.chat/fuselage';
import { ExternalLink, useLicenseName } from '@rocket.chat/ui-client';
import { Trans, useTranslation } from 'react-i18next';

import PlanCardHeader from './PlanCardHeader';
import PlanCardLicenseDetails from './PlanCardLicenseDetails';
import { useFormatDate } from '../../../../../../hooks/useFormatDate';
import { useIsSelfHosted } from '../../../../../../hooks/useIsSelfHosted';
import { CONTACT_SALES_LINK } from '../../../utils/links';

type LicenseLimits = {
	activeUsers: { max: number; value?: number };
};

type PlanCardProps = {
	licenseInformation: ILicenseV3['information'];
	licenseLimits: LicenseLimits;
};

const PlanCardPremium = ({ licenseInformation, licenseLimits }: PlanCardProps) => {
    /* Implementation Hidden */
};

export default PlanCardPremium;

```