## File: apps/meteor/client/apps/gameCenter/GameCenterInvitePlayersModal.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { Random } from '@rocket.chat/random';
import { GenericModal } from '@rocket.chat/ui-client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { IGame } from './GameCenter';
import { sdk } from '../../../app/utils/client/lib/SDKClient';
import UserAutoCompleteMultiple from '../../components/UserAutoCompleteMultiple';
import { useOpenedRoom } from '../../lib/RoomManager';
import { roomCoordinator } from '../../lib/rooms/roomCoordinator';
import { callWithErrorHandling } from '../../lib/utils/callWithErrorHandling';

type Username = Exclude<IUser['username'], undefined>;

interface IGameCenterInvitePlayersModalProps {
	game: IGame;
	onClose: () => void;
}

const GameCenterInvitePlayersModal = ({ game, onClose }: IGameCenterInvitePlayersModalProps) => {
    /* Implementation Hidden */
};

export default GameCenterInvitePlayersModal;

```