## File: packages/ui-client/src/components/UserAutoComplete/UserAutoComplete.tsx

```typescript
import { AutoComplete, Option, Box, Chip } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ComponentPropsWithoutRef } from 'react';
import { memo, useMemo, useState } from 'react';

const query = (
	term = '',
	conditions = {},
): {
	selector: string;
} => ({ selector: JSON.stringify({ term, conditions }) });

type UserAutoCompleteProps = Omit<ComponentPropsWithoutRef<typeof AutoComplete>, 'filter'> & {
	conditions?: { [key: string]: unknown };
};

const UserAutoComplete = ({ value, onChange, ...props }: UserAutoCompleteProps) => {
    /* Implementation Hidden */
};

export default memo(UserAutoComplete);

```