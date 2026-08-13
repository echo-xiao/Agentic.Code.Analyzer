## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppReleases/AppReleases.tsx

```typescript
import type { App } from '@rocket.chat/core-typings';
import { Accordion } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import AppReleasesItem from './AppReleasesItem';
import AccordionLoading from '../../../components/AccordionLoading';

export type AppReleasesProps = { id: App['id'] };

const AppReleases = ({ id }: AppReleasesProps) => {
    /* Implementation Hidden */
};

export default AppReleases;

```