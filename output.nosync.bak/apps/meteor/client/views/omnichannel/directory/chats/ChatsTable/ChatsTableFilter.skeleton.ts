## File: apps/meteor/client/views/omnichannel/directory/chats/ChatsTable/ChatsTableFilter.tsx

```typescript
import { Box, Button, Chip } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericMenu, GenericModal } from '@rocket.chat/ui-client';
import { useEndpoint, usePermission, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import type { RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import FilterByText from '../../../../../components/FilterByText';
import { useChatsContext } from '../../contexts/ChatsContext';
import { useOmnichannelDirectoryRouter } from '../../hooks/useOmnichannelDirectoryRouter';

const ChatsTableFilter = () => {
    /* Implementation Hidden */
};

export default ChatsTableFilter;

```