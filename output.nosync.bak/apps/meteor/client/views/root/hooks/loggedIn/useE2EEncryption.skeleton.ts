## File: apps/meteor/client/views/root/hooks/loggedIn/useE2EEncryption.ts

```typescript
import { isE2EEPinnedMessage, type IRoom, type IMessage } from '@rocket.chat/core-typings';
import { useUserId, useSetting, useRouter, useLayout, useUser } from '@rocket.chat/ui-contexts';
import { useEffect, useRef } from 'react';

import { MentionsParser } from '../../../../../app/mentions/lib/MentionsParser';
import { e2e } from '../../../../lib/e2ee';
import { onClientBeforeSendMessage } from '../../../../lib/onClientBeforeSendMessage';
import { onClientMessageReceived } from '../../../../lib/onClientMessageReceived';
import { Rooms } from '../../../../stores';
import { useE2EEState } from '../../../room/hooks/useE2EEState';

export const useE2EEncryption = () => {
    /* Implementation Hidden */
};

```