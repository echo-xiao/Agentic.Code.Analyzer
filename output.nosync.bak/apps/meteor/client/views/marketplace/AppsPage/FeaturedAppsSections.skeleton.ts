## File: apps/meteor/client/views/marketplace/AppsPage/FeaturedAppsSections.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { useTranslation } from 'react-i18next';

import AppsList from '../AppsList';
import normalizeFeaturedApps from '../helpers/normalizeFeaturedApps';
import { useFeaturedApps } from '../hooks/useFeaturedApps';

type FeaturedSectionsProps = {
	appsResult: App[];
	appsListId: string;
};

const FeaturedAppsSections = ({ appsResult, appsListId }: FeaturedSectionsProps) => {
    /* Implementation Hidden */
};

export default FeaturedAppsSections;

```