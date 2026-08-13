## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxActionsToolbar/hooks/useAudioMessageAction.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useEffect, useMemo } from 'react';

import { AudioRecorder } from '../../../../../../../app/ui/client/lib/recorderjs/AudioRecorder';
import { useChat } from '../../../../contexts/ChatContext';
import { useMediaActionTitle } from '../../hooks/useMediaActionTitle';
import { useMediaPermissions } from '../../hooks/useMediaPermissions';

const audioRecorder = new AudioRecorder();

export const useAudioMessageAction = (disabled: boolean, isMicrophoneDenied: boolean): GenericMenuItemProps => {
    /* Implementation Hidden */
};

```