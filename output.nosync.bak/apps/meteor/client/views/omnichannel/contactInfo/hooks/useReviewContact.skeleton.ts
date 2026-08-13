## File: apps/meteor/client/views/omnichannel/contactInfo/hooks/useReviewContact.ts

```typescript
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { QueryKey } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useContactRoute } from '../../hooks/useContactRoute';

export const useReviewContact = (invalidateQueries?: QueryKey) => {
    /* Implementation Hidden */
};

```