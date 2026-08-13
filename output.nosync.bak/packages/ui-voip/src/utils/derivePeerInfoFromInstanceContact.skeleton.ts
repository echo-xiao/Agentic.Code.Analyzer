## File: packages/ui-voip/src/utils/derivePeerInfoFromInstanceContact.ts

```typescript
import type { CallContact } from '@rocket.chat/media-signaling';

import type { ExternalPeerInfo, InternalPeerInfo } from '../context/definitions';

const deriveExternalPeerInfoFromInstanceContact = (contact: CallContact): ExternalPeerInfo => {
    /* Implementation Hidden */
};

const deriveInternalPeerInfoFromInstanceContact = (contact: CallContact): Omit<InternalPeerInfo, 'avatarUrl'> => {
    /* Implementation Hidden */
};

export const derivePeerInfoFromInstanceContact = (contact: CallContact) => {
    /* Implementation Hidden */
};

```