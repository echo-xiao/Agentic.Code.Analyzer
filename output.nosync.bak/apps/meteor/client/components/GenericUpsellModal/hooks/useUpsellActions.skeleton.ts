## File: apps/meteor/client/components/GenericUpsellModal/hooks/useUpsellActions.ts

```typescript
import { useSetModal, useSetting } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';

import { useExternalLink } from '../../../hooks/useExternalLink';
import { useIsEnterprise } from '../../../hooks/useIsEnterprise';
import { links } from '../../../lib/links';
import { useCheckoutUrl } from '../../../views/admin/subscription/hooks/useCheckoutUrl';

const TALK_TO_SALES_URL = links.go.contactSales;

export const useUpsellActions = (hasLicenseModule = false) => {
    /* Implementation Hidden */
};

```