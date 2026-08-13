## File: apps/meteor/client/views/room/contextualBar/RoomMembers/InviteUsers/InviteUsersEdit.tsx

```typescript
import EditInviteLink from './EditInviteLink';
import InviteUsersWrapper from './InviteUsersWrapper';

type InviteUsersEditProps = {
	onClickBackLink?: () => void;
	onClickNewLink: (daysAndMaxUses: { days: string; maxUses: string }) => void;
	onClose: () => void;
	daysAndMaxUses: { days: string; maxUses: string };
};

const InviteUsersEdit = ({ onClickBackLink, onClickNewLink, onClose, daysAndMaxUses }: InviteUsersEditProps) => {
    /* Implementation Hidden */
};

export default InviteUsersEdit;

```