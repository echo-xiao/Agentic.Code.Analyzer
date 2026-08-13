## File: apps/meteor/client/views/admin/subscription/components/cards/PlanCard/PlanCardTrial.tsx

```typescript
import type { ILicenseV3 } from '@rocket.chat/core-typings';
import { Box, Card, CardBody, CardControls, CardRow, Tag } from '@rocket.chat/fuselage';
import { ExternalLink, useLicenseName } from '@rocket.chat/ui-client';
import { differenceInDays } from 'date-fns';
import { Trans, useTranslation } from 'react-i18next';

import PlanCardHeader from './PlanCardHeader';
import PlanCardLicenseDetails from './PlanCardLicenseDetails';
import { DOWNGRADE_LINK, TRIAL_LINK } from '../../../utils/links';
import UpgradeButton from '../../UpgradeButton';

type PlanCardProps = {
	licenseInformation: ILicenseV3['information'];
};

const PlanCardTrial = ({ licenseInformation }: PlanCardProps) => {
    /* Implementation Hidden */
};

export default PlanCardTrial;

```