## File: apps/meteor/client/views/room/contextualBar/RoomMembers/AddUsers/AddMatrixUsers/useAddMatrixUsers.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useSetModal, useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';

import AddMatrixUsersModal from './AddMatrixUsersModal';

export type useAddMatrixUsersProps = {
	handleSave: (args_0: { users: string[]; unbanConfirmed?: boolean }) => Promise<void>;
	users: string[];
};

export const useAddMatrixUsers = () => {
    /* Implementation Hidden */
};

```