## File: apps/meteor/client/views/room/contextualBar/RoomMembers/InviteUsers/InviteUsersWrapper.tsx

```typescript
import {
	ContextualbarHeader,
	ContextualbarTitle,
	ContextualbarBack,
	ContextualbarClose,
	ContextualbarScrollableContent,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type InviteUsersWrapperProps = {
	children: ReactNode;
	onClickBack: (() => void) | undefined;
	onClose: () => void;
};

const InviteUsersWrapper = ({ children, onClickBack, onClose }: InviteUsersWrapperProps) => {
    /* Implementation Hidden */
};

export default InviteUsersWrapper;

```