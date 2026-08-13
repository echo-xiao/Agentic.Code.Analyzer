## File: apps/meteor/client/views/room/contextualBar/RoomMembers/InviteUsers/EditInviteLink.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Field, FieldLabel, FieldRow, Select, Button } from '@rocket.chat/fuselage';
import { useId, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type EditInviteLinkProps = {
	daysAndMaxUses: { days: string; maxUses: string };
	onClickNewLink: (daysAndMaxUses: { days: string; maxUses: string }) => void;
};

const EditInviteLink = ({ daysAndMaxUses, onClickNewLink }: EditInviteLinkProps) => {
    /* Implementation Hidden */
};

export default EditInviteLink;

```