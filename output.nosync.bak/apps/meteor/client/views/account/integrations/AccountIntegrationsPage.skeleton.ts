## File: apps/meteor/client/views/account/integrations/AccountIntegrationsPage.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Button } from '@rocket.chat/fuselage';
import { Select, Field, FieldLabel, FieldRow, FieldError } from '@rocket.chat/fuselage-forms';
import { Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useRemoveWebDAVAccountIntegrationMutation } from './hooks/useRemoveWebDAVAccountIntegrationMutation';
import { useWebDAVAccountIntegrationsQuery } from '../../../hooks/webdav/useWebDAVAccountIntegrationsQuery';
import { getWebdavServerName } from '../../../lib/getWebdavServerName';

const AccountIntegrationsPage = () => {
    /* Implementation Hidden */
};

export default AccountIntegrationsPage;

```