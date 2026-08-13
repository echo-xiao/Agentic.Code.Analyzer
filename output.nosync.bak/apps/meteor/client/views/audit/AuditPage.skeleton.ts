## File: apps/meteor/client/views/audit/AuditPage.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Box, Callout, Margins, States, StatesIcon, StatesSubtitle, StatesTitle, Tabs, TabsItem } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AuditForm from './components/AuditForm';
import AuditResult from './components/AuditResult';
import { useAuditMutation } from './hooks/useAuditMutation';
import { useAuditTab } from './hooks/useAuditTab';
import ListSkeleton from '../../components/ListSkeleton';
import { getErrorMessage } from '../../lib/errorHandling';

const AuditPage = () => {
    /* Implementation Hidden */
};

export default AuditPage;

```