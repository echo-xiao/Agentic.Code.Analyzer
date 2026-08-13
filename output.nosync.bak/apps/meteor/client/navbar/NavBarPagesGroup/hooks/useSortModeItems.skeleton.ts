## File: apps/meteor/client/navbar/NavBarPagesGroup/hooks/useSortModeItems.tsx

```typescript
import { RadioButton } from '@rocket.chat/fuselage';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useEndpoint, useUserPreference } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
	OmnichannelSortingDisclaimer,
	useOmnichannelSortingDisclaimer,
} from '../../../views/omnichannel/components/OmnichannelSortingDisclaimer';

export const useSortModeItems = (): GenericMenuItemProps[] => {
    /* Implementation Hidden */
};

```