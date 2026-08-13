## File: apps/meteor/client/components/UserCard/UserCardDialog.tsx

```typescript
import type { AriaDialogProps } from '@react-aria/dialog';
import { useDialog } from '@react-aria/dialog';
import { Box } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useRef } from 'react';

export type UserCardDialogProps = AriaDialogProps & ComponentProps<typeof Box>;

const UserCardDialog = (props: UserCardDialogProps) => {
    /* Implementation Hidden */
};

export default UserCardDialog;

```