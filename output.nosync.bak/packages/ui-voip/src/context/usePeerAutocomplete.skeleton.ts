## File: packages/ui-voip/src/context/usePeerAutocomplete.ts

```typescript
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { useUserPresence } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import type { PeerInfo } from './definitions';
import type { PeerAutocompleteOptions } from '../components';
import { useMediaCallInstance } from './MediaCallInstanceContext';
import { mediaCallQueryKeys } from '../utils/queryKeys';

const PREFIX_FIRST_OPTION = 'rcx-first-option-';

export const isFirstPeerAutocompleteOption = (value: string) => {
    /* Implementation Hidden */
};

const getFirstOption = (filter: string): PeerAutocompleteOptions => {
    /* Implementation Hidden */
};

export const usePeerAutocomplete = (onSelectPeer: (peerInfo: PeerInfo) => void, peerInfo: PeerInfo | undefined) => {
    /* Implementation Hidden */
};

```