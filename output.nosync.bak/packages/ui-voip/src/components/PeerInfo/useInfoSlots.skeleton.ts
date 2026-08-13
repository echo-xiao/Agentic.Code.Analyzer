## File: packages/ui-voip/src/components/PeerInfo/useInfoSlots.ts

```typescript
import type { Keys as IconNames } from '@rocket.chat/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ConnectionState } from '../../context';

export type Slot = {
	text: string;
	type: 'warning' | 'info';
	icon?: IconNames;
};

const getMutedSlot = (muted: boolean, t: ReturnType<typeof useTranslation>['t']) => {
    /* Implementation Hidden */
};

const getHeldSlot = (held: boolean, t: ReturnType<typeof useTranslation>['t']) => {
    /* Implementation Hidden */
};

const getConnectionStateSlot = (connectionState: ConnectionState, t: ReturnType<typeof useTranslation>['t']) => {
    /* Implementation Hidden */
};

export const useInfoSlots = (muted: boolean, held: boolean, connectionState?: ConnectionState): Slot[] => {
    /* Implementation Hidden */
};

```