## File: apps/meteor/client/hooks/useTranslationsForApps.ts

```typescript
import { normalizeLanguage } from '@rocket.chat/tools';
import { useEndpoint, useStream, useUserId } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { withDebouncing } from '../../lib/utils/highOrderFunctions';

export const useTranslationsForApps = () => {
    /* Implementation Hidden */
};

```