## File: apps/meteor/client/views/admin/moderation/UserMessages.tsx

```typescript
import { Box, Callout, Message, StatesAction, StatesActions, StatesIcon, StatesTitle } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ContextualbarFooter } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import MessageContextFooter from './MessageContextFooter';
import ContextMessage from './helpers/ContextMessage';
import GenericNoResults from '../../../components/GenericNoResults';

// TODO: We should use Contextualbar components here
const UserMessages = ({ userId, onRedirect }: { userId: string; onRedirect: (mid: string) => void }) => {
    /* Implementation Hidden */
};

export default UserMessages;

```