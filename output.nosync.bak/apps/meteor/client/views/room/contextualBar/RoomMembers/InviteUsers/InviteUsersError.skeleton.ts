## File: apps/meteor/client/views/room/contextualBar/RoomMembers/InviteUsers/InviteUsersError.tsx

```typescript
import { Callout } from '@rocket.chat/fuselage';

import InviteUsersWrapper from './InviteUsersWrapper';

type InviteUsersProps = {
	onClose: () => void;
	error: Error;
	onClickBack?: (() => void) | undefined;
};

const InviteUsersError = ({ onClose, error, onClickBack }: InviteUsersProps) => (
	<InviteUsersWrapper onClose={onClose} onClickBack={onClickBack}>
		<Callout type='danger'>{(error || '').toString()}</Callout>
	</InviteUsersWrapper>
);

export default InviteUsersError;

```