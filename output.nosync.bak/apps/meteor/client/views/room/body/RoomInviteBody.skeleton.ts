## File: apps/meteor/client/views/room/body/RoomInviteBody.tsx

```typescript
import type { IInviteSubscription } from '@rocket.chat/core-typings';
import { Box, Button, Chip, States, StatesActions, StatesIcon, StatesLink, StatesSubtitle, StatesTitle } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useTranslation } from 'react-i18next';

type RoomInviteBodyProps = {
	isLoading?: boolean;
	inviter: IInviteSubscription['inviter'];
	infoLink?: {
		label: string;
		href: string;
	};
	onAccept: () => void;
	onReject: () => void;
};

const RoomInviteBody = ({ inviter, infoLink, isLoading, onAccept, onReject }: RoomInviteBodyProps) => {
    /* Implementation Hidden */
};

export default RoomInviteBody;

```