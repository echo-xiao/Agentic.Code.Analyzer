## File: apps/meteor/client/hooks/useAppActionButtons.ts

```typescript
import type { IUIActionButton, UIActionButtonContext } from '@rocket.chat/apps-engine/definition/ui';
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import { useConnectionStatus, useEndpoint, useStream, useUserId } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const getIdForActionButton = ({ appId, actionId }: IUIActionButton): string => `${appId}/${actionId}`;

export const useAppActionButtons = <TContext extends `${UIActionButtonContext}`>(context?: TContext) => {
    /* Implementation Hidden */
};

```