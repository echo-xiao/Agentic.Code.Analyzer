## File: apps/meteor/client/views/admin/users/AdminInviteUsers.tsx

```typescript
import {
	Box,
	Button,
	ButtonGroup,
	States,
	StatesAction,
	StatesActions,
	StatesSubtitle,
	StatesTitle,
	TextAreaInput,
} from '@rocket.chat/fuselage';
import { validateEmail } from '@rocket.chat/tools';
import { ContextualbarScrollableContent, ContextualbarFooter, ContextualbarContent } from '@rocket.chat/ui-client';
import { useTranslation, useRoute } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import { useSendInvitationEmailMutation } from './hooks/useSendInvitationEmailMutation';
import { useSmtpQuery } from './hooks/useSmtpQuery';
import { FormSkeleton } from '../../../components/Skeleton';

// TODO: Replace using RHF
const AdminInviteUsers = () => {
    /* Implementation Hidden */
};

export default AdminInviteUsers;

```