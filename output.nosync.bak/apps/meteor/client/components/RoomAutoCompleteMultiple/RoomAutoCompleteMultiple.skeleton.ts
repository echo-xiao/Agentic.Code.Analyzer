## File: apps/meteor/client/components/RoomAutoCompleteMultiple/RoomAutoCompleteMultiple.tsx

```typescript
import { AutoComplete, Option, Chip, Box, Skeleton } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { ComponentProps } from 'react';
import { memo, useMemo, useState } from 'react';

const generateQuery = (
	term = '',
): {
	selector: string;
} => ({ selector: JSON.stringify({ name: term }) });

type RoomAutoCompleteProps = Omit<ComponentProps<typeof AutoComplete>, 'filter'> & {
	readOnly?: boolean;
};

const RoomAutoCompleteMultiple = ({ value, onChange, ...props }: RoomAutoCompleteProps) => {
    /* Implementation Hidden */
};

export default memo(RoomAutoCompleteMultiple);

```