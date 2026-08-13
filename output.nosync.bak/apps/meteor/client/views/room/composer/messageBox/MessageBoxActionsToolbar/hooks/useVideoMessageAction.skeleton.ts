## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxActionsToolbar/hooks/useVideoMessageAction.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useEffect, useMemo } from 'react';

import { VideoRecorder } from '../../../../../../../app/ui/client/lib/recorderjs/videoRecorder';
import { useChat } from '../../../../contexts/ChatContext';
import { useMediaActionTitle } from '../../hooks/useMediaActionTitle';
import { useMediaPermissions } from '../../hooks/useMediaPermissions';

export const useVideoMessageAction = (disabled: boolean): GenericMenuItemProps => {
    /* Implementation Hidden */
};

```