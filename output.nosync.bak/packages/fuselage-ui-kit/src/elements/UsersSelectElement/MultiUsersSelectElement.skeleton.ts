## File: packages/fuselage-ui-kit/src/elements/UsersSelectElement/MultiUsersSelectElement.tsx

```typescript
import { Box, Chip, AutoComplete, Option, OptionAvatar, OptionContent, OptionDescription } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import type * as UiKit from '@rocket.chat/ui-kit';
import { memo, useCallback, useState } from 'react';

import { useUsersData } from './hooks/useUsersData';
import { useUiKitState } from '../../hooks/useUiKitState';
import type { BlockProps } from '../../utils/BlockProps';

export type MultiUsersSelectElementProps = BlockProps<UiKit.MultiUsersSelectElement>;

const MultiUsersSelectElement = ({ block, context }: MultiUsersSelectElementProps) => {
    /* Implementation Hidden */
};

export default memo(MultiUsersSelectElement);

```