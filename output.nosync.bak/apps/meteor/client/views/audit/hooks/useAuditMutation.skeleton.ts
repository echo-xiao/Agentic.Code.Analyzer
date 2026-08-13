## File: apps/meteor/client/views/audit/hooks/useAuditMutation.ts

```typescript
import type { IAuditLog } from '@rocket.chat/core-typings';
import { useMethod } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';

import type { AuditFields } from './useAuditForm';

export const useAuditMutation = (type: IAuditLog['fields']['type']) => {
    /* Implementation Hidden */
};

```