## File: apps/meteor/client/views/admin/customEmoji/CustomEmoji.tsx

```typescript
import { Box, Pagination, States, StatesActions, StatesAction, StatesIcon, StatesTitle } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import {
	GenericTable,
	GenericTableBody,
	GenericTableCell,
	GenericTableHeader,
	GenericTableHeaderCell,
	GenericTableLoadingTable,
	GenericTableRow,
	usePagination,
	useSort,
} from '@rocket.chat/ui-client';
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useState } from 'react';

import FilterByText from '../../../components/FilterByText';
import GenericNoResults from '../../../components/GenericNoResults';

export type CustomEmojiProps = {
	reload: MutableRefObject<() => void>;
	onClick: (emoji: string) => () => void;
};

const CustomEmoji = ({ onClick, reload }: CustomEmojiProps) => {
    /* Implementation Hidden */
};

export default CustomEmoji;

```