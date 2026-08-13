## File: apps/meteor/client/views/marketplace/AppDetailsPage/AppDetailsPageHeader.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { Box, Tag } from '@rocket.chat/fuselage';
import { AppAvatar } from '@rocket.chat/ui-avatar';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';

import AppMenu from '../AppMenu';
import BundleChips from '../BundleChips';
import { appIncompatibleStatusProps } from '../helpers';
import AppStatus from './tabs/AppStatus';

const versioni18nKey = (app: App): string => {
    /* Implementation Hidden */
};

export type AppDetailsPageHeaderProps = { app: App };

const AppDetailsPageHeader = ({ app }: AppDetailsPageHeaderProps) => {
    /* Implementation Hidden */
};

export default AppDetailsPageHeader;

```