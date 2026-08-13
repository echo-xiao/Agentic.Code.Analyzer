## File: apps/meteor/client/apps/gameCenter/GameCenterContainer.tsx

```typescript
import { Avatar } from '@rocket.chat/fuselage';
import {
	ContextualbarTitle,
	ContextualbarHeader,
	ContextualbarBack,
	ContextualbarContent,
	ContextualbarClose,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import type { IGame } from './GameCenter';

interface IGameCenterContainerProps {
	handleClose: () => void;
	handleBack: (e: any) => void;
	game: IGame;
}

const GameCenterContainer = ({ handleClose, handleBack, game }: IGameCenterContainerProps) => {
    /* Implementation Hidden */
};

export default GameCenterContainer;

```