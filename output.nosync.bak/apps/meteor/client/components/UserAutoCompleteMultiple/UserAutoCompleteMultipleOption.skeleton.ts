## File: apps/meteor/client/components/UserAutoCompleteMultiple/UserAutoCompleteMultipleOption.tsx

```typescript
import { Option, OptionDescription } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import type { UserLabel } from './UserAutoCompleteMultipleOptions';
import { normalizeUsername } from '../../../lib/utils/normalizeUsername';

export type UserAutoCompleteMultipleOptionProps = {
	label: UserLabel;
	value: string | number;
	selected?: boolean;
	focus?: boolean;
	role?: string;
};

const UserAutoCompleteMultipleOption = ({ label, ...props }: UserAutoCompleteMultipleOptionProps) => {
    /* Implementation Hidden */
};

export default UserAutoCompleteMultipleOption;

```