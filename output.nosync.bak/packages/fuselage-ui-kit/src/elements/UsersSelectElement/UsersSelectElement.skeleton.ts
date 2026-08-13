## File: packages/fuselage-ui-kit/src/elements/UsersSelectElement/UsersSelectElement.tsx

```typescript
import { AutoComplete, Box, Chip, Option } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import type * as UiKit from '@rocket.chat/ui-kit';
import { useCallback, useState } from 'react';

import { useUsersData } from './hooks/useUsersData';
import { useUiKitState } from '../../hooks/useUiKitState';
import type { BlockProps } from '../../utils/BlockProps';

export type UsersSelectElementProps = BlockProps<UiKit.UsersSelectElement>;

export type UserAutoCompleteOptionType = {
	value: string;
	label: string;
};

const UsersSelectElement = ({ block, context }: UsersSelectElementProps) => {
    /* Implementation Hidden */
};

export default UsersSelectElement;

```