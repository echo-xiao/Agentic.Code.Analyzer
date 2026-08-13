## File: apps/meteor/client/providers/ActionManagerProvider.tsx

```typescript
import { ActionManagerContext, useRouter } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';

import { ActionManager } from '../../app/ui-message/client/ActionManager';
import { useAppActionButtons } from '../hooks/useAppActionButtons';
import { useAppSlashCommands } from '../hooks/useAppSlashCommands';
import { useAppUiKitInteraction } from '../hooks/useAppUiKitInteraction';
import { useTranslationsForApps } from '../hooks/useTranslationsForApps';
import { useInstance } from '../views/room/providers/hooks/useInstance';

export type ActionManagerProviderProps = {
	children?: ReactNode;
};

const ActionManagerProvider = ({ children }: ActionManagerProviderProps) => {
    /* Implementation Hidden */
};

export default ActionManagerProvider;

```