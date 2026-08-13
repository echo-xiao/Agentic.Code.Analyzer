## File: apps/meteor/client/views/omnichannel/appearance/AppearancePageContainer.tsx

```typescript
import { Callout } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useEndpoint, usePermission } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import AppearancePage from './AppearancePage';
import PageSkeleton from '../../../components/PageSkeleton';
import { omnichannelQueryKeys } from '../../../lib/queryKeys';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const AppearancePageContainer = () => {
    /* Implementation Hidden */
};

export default AppearancePageContainer;

```