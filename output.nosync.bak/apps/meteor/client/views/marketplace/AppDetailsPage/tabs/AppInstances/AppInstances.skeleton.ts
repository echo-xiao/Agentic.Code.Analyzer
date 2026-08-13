## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppInstances/AppInstances.tsx

```typescript
import type { AppStatus } from '@rocket.chat/apps';
import { AppStatusUtils } from '@rocket.chat/apps-engine/definition/AppStatus';
import { Box, Palette, Tag } from '@rocket.chat/fuselage';
import {
	GenericMenu,
	CustomScrollbars,
	GenericTable,
	GenericTableBody,
	GenericTableCell,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableRow,
} from '@rocket.chat/ui-client';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import GenericNoResults from '../../../../../components/GenericNoResults';
import AccordionLoading from '../../../components/AccordionLoading';
import { useAppInstances } from '../../../hooks/useAppInstances';

type AppInstanceProps = {
	id: string;
};

const AppInstances = ({ id }: AppInstanceProps) => {
    /* Implementation Hidden */
};

export default AppInstances;

```