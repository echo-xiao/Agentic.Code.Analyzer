## File: apps/meteor/client/views/omnichannel/priorities/PrioritiesPage.tsx

```typescript
import { Button, ButtonGroup } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { Page, PageHeader, PageContent } from '@rocket.chat/ui-client';
import { useEndpoint, useRoute, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PrioritiesResetModal } from './PrioritiesResetModal';
import { PrioritiesTable } from './PrioritiesTable';
import type { PriorityFormData } from './PriorityEditForm';
import PriorityList from './PriorityList';
import { useOmnichannelPriorities } from '../hooks/useOmnichannelPriorities';

type PrioritiesPageProps = {
	priorityId: string;
	context: 'edit' | undefined;
};

export const PrioritiesPage = ({ priorityId, context }: PrioritiesPageProps) => {
    /* Implementation Hidden */
};

```