## File: apps/meteor/client/views/marketplace/helpers/formatPriceAndPurchaseType.ts

```typescript
import type { PurchaseType, AppPricingPlan } from '@rocket.chat/core-typings';

import { formatPrice } from './formatPrice';
import { formatPricingPlan } from './formatPricingPlan';

type PlanType = 'Subscription' | 'Paid' | 'Free';

type FormattedPriceAndPlan = {
	type: PlanType;
	price: string;
};

export const formatPriceAndPurchaseType = (
	purchaseType: PurchaseType,
	pricingPlans: AppPricingPlan[],
	price: number,
): FormattedPriceAndPlan => {
    /* Implementation Hidden */
};

```