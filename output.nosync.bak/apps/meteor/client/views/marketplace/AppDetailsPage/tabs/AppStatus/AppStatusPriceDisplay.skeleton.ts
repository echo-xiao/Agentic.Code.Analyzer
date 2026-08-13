## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppStatus/AppStatusPriceDisplay.tsx

```typescript
import type { AppPricingPlan, PurchaseType } from '@rocket.chat/core-typings';
import { Box, Margins, Tag } from '@rocket.chat/fuselage';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatPriceAndPurchaseType } from '../../../helpers/formatPriceAndPurchaseType';

export type AppStatusPriceDisplayProps = {
	purchaseType: PurchaseType;
	pricingPlans: AppPricingPlan[];
	price: number;
	showType?: boolean;
	marginInline?: string;
};

const AppStatusPriceDisplay = ({ purchaseType, pricingPlans, price, showType = true }: AppStatusPriceDisplayProps) => {
    /* Implementation Hidden */
};

export default AppStatusPriceDisplay;

```