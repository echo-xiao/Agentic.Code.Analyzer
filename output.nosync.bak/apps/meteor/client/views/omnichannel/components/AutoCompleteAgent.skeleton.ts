## File: apps/meteor/client/views/omnichannel/components/AutoCompleteAgent.tsx

```typescript
import { PaginatedSelectFiltered } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { memo, useState } from 'react';

import { useAgentsList } from '../hooks/useAgentsList';

export type AutoCompleteAgentProps = Omit<
	ComponentProps<typeof PaginatedSelectFiltered>,
	'filter' | 'setFilter' | 'options' | 'endReached' | 'renderItem'
> & {
	value: string;
	haveAll?: boolean;
	haveNoAgentsSelectedOption?: boolean;
	excludeId?: string;
	showIdleAgents?: boolean;
	onlyAvailable?: boolean;
	onChange: (value: string) => void;
};

const AutoCompleteAgent = ({
	value,
	haveAll = false,
	haveNoAgentsSelectedOption = false,
	excludeId,
	showIdleAgents = true,
	onlyAvailable = false,
	onChange,
	...props
}: AutoCompleteAgentProps) => {
    /* Implementation Hidden */
};

export default memo(AutoCompleteAgent);

```