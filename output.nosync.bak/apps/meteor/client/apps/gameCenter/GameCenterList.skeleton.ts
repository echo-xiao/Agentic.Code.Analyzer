## File: apps/meteor/client/apps/gameCenter/GameCenterList.tsx

```typescript
import { Avatar, Icon, Table, TableBody, TableCell, TableHead, TableRow } from '@rocket.chat/fuselage';
import {
	ContextualbarHeader,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarDialog,
	ContextualbarSkeleton,
} from '@rocket.chat/ui-client';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { IGame } from './GameCenter';
import GameCenterInvitePlayersModal from './GameCenterInvitePlayersModal';

interface IGameCenterListProps {
	handleClose: () => void;
	handleOpenGame: (game: IGame) => void;
	games?: IGame[];
	isLoading: boolean;
}

const GameCenterList = ({ handleClose, handleOpenGame, games, isLoading }: IGameCenterListProps) => {
    /* Implementation Hidden */
};

export default memo(GameCenterList);

```