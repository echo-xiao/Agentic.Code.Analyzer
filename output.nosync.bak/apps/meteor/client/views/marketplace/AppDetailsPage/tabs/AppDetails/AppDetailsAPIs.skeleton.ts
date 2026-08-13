## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppDetails/AppDetailsAPIs.tsx

```typescript
import type { IApiEndpointMetadata } from '@rocket.chat/apps-engine/definition/api';
import { Box } from '@rocket.chat/fuselage';
import { useAbsoluteUrl } from '@rocket.chat/ui-contexts';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { apiCurlGetter } from '../../../helpers/apiCurlGetter';

export type AppDetailsAPIsProps = {
	apis: IApiEndpointMetadata[];
};

const AppDetailsAPIs = ({ apis }: AppDetailsAPIsProps) => {
    /* Implementation Hidden */
};

export default AppDetailsAPIs;

```