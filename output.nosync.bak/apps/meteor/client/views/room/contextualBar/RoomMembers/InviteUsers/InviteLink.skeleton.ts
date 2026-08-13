## File: apps/meteor/client/views/room/contextualBar/RoomMembers/InviteUsers/InviteLink.tsx

```typescript
import { Box, Field, FieldLabel, FieldRow, UrlInput, Icon, Button, InputBoxSkeleton } from '@rocket.chat/fuselage';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import useClipboardWithToast from '../../../../../hooks/useClipboardWithToast';

type InviteLinkProps = {
	linkText: string;
	captionText: string;
	onClickEdit: () => void;
};

const InviteLink = ({ linkText, captionText, onClickEdit }: InviteLinkProps) => {
    /* Implementation Hidden */
};

export default InviteLink;

```