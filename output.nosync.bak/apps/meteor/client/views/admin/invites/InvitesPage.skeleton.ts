## File: apps/meteor/client/views/admin/invites/InvitesPage.tsx

```typescript
import { States, StatesIcon, StatesTitle, StatesActions, StatesAction } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import {
	GenericModal,
	GenericTable,
	GenericTableBody,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingTable,
	Page,
	PageHeader,
	PageContent,
} from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import InviteRow from './InviteRow';
import GenericNoResults from '../../../components/GenericNoResults';

const InvitesPage = () => {
    /* Implementation Hidden */
};

export default InvitesPage;

```