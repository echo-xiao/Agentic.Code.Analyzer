## File: apps/meteor/client/views/admin/ABAC/ABACRoomsTab/RoomFormAutocomplete.tsx

```typescript
import { AutoComplete, Option, Box } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { ComponentProps } from 'react';
import { memo, useState } from 'react';

import { ABACQueryKeys } from '../../../../lib/queryKeys';

const generateQuery = (
	term = '',
): {
	filter: string;
} => ({ filter: term });

export type RoomFormAutocompleteProps = Omit<ComponentProps<typeof AutoComplete>, 'filter' | 'onChange'> & {
	onSelectedRoom: (value: string, label: string) => void;
};

const RoomFormAutocomplete = ({ value, onSelectedRoom, ...props }: RoomFormAutocompleteProps) => {
    /* Implementation Hidden */
};

export default memo(RoomFormAutocomplete);

```