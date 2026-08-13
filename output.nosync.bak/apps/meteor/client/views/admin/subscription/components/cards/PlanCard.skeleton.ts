## File: apps/meteor/client/views/admin/subscription/components/cards/PlanCard.tsx

```typescript
import type { ILicenseV3 } from '@rocket.chat/core-typings';

import PlanCardCommunity from './PlanCard/PlanCardCommunity';
import PlanCardPremium from './PlanCard/PlanCardPremium';
import PlanCardTrial from './PlanCard/PlanCardTrial';

type LicenseLimits = {
	activeUsers: { max: number; value?: number };
};

export type PlanCardProps = {
	license?: ILicenseV3;
	licenseLimits: LicenseLimits;
};

const PlanCard = ({ license, licenseLimits }: PlanCardProps) => {
    /* Implementation Hidden */
};

export default PlanCard;

```