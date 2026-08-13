## File: apps/meteor/client/views/omnichannel/directory/chats/ChatsTable/ChatsTable.tsx

```typescript
import { Pagination, States, StatesIcon, StatesTitle, StatesActions, StatesAction } from '@rocket.chat/fuselage';
import {
	GenericTable,
	GenericTableBody,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingTable,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { usePermission } from '@rocket.chat/ui-contexts';
import { hashKey } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ChatFilterByText from './ChatsTableFilter';
import ChatsTableRow from './ChatsTableRow';
import { useCurrentChats } from './hooks/useCurrentChats';
import { useChatsQuery } from './useChatsQuery';
import GenericNoResults from '../../../../../components/GenericNoResults/GenericNoResults';
import { links } from '../../../../../lib/links';
import { useOmnichannelPriorities } from '../../../hooks/useOmnichannelPriorities';
import { useChatsContext } from '../../contexts/ChatsContext';

const ChatsTable = () => {
    /* Implementation Hidden */
};

export default ChatsTable;

```