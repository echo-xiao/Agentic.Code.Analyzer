## File: packages/fuselage-ui-kit/src/elements/ChannelsSelectElement/ChannelsSelectElement.tsx

```typescript
import { AutoComplete, Option, Box, Chip } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import type * as UiKit from '@rocket.chat/ui-kit';
import { memo, useCallback, useState } from 'react';

import { useChannelsData } from './hooks/useChannelsData';
import { useUiKitState } from '../../hooks/useUiKitState';
import type { BlockProps } from '../../utils/BlockProps';

export type ChannelsSelectElementProps = BlockProps<UiKit.ChannelsSelectElement>;

const ChannelsSelectElement = ({ block, context }: ChannelsSelectElementProps) => {
    /* Implementation Hidden */
};

export default memo(ChannelsSelectElement);

```