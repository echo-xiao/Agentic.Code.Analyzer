## File: apps/meteor/client/apps/gameCenter/GameCenter.tsx

```typescript
import type { IExternalComponent } from '@rocket.chat/apps-engine/definition/externalComponent';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useState } from 'react';
import type { MouseEvent } from 'react';

import GameCenterContainer from './GameCenterContainer';
import GameCenterList from './GameCenterList';
import { useExternalComponentsQuery } from './hooks/useExternalComponentsQuery';
import { preventSyntheticEvent } from '../../lib/utils/preventSyntheticEvent';

export type IGame = IExternalComponent;

const GameCenter = () => {
    /* Implementation Hidden */
};

export default GameCenter;

```