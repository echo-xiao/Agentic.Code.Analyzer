## File: apps/meteor/client/views/marketplace/helpers/formatPricingPlan.ts

```typescript
import type { AppPricingPlan } from '@rocket.chat/core-typings';

import { formatPrice } from './formatPrice';
import { t } from '../../../../app/utils/lib/i18n';

export const formatPricingPlan = ({ strategy, price, tiers = [], trialDays }: AppPricingPlan): string => {
    /* Implementation Hidden */
};

```