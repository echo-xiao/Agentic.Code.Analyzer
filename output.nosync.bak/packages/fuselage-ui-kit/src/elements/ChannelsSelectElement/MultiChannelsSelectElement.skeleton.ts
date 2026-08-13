## File: packages/fuselage-ui-kit/src/elements/ChannelsSelectElement/MultiChannelsSelectElement.tsx

```typescript
import { AutoComplete, Option, Chip, Box } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import type * as UiKit from '@rocket.chat/ui-kit';
import { memo, useCallback, useState } from 'react';

import { useChannelsData } from './hooks/useChannelsData';
import { useUiKitState } from '../../hooks/useUiKitState';
import type { BlockProps } from '../../utils/BlockProps';

type MultiChannelsSelectProps = BlockProps<UiKit.MultiChannelsSelectElement>;

const MultiChannelsSelectElement = ({ block, context }: MultiChannelsSelectProps) => {
    /* Implementation Hidden */
};

export default memo(MultiChannelsSelectElement);

```