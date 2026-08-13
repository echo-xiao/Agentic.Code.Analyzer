## File: packages/fuselage-ui-kit/src/blocks/TabNavigationBlock.tsx

```typescript
import { Tabs } from '@rocket.chat/fuselage';
import type { ExperimentalTabNavigationBlock } from '@rocket.chat/ui-kit';
import { memo, useState } from 'react';

import { TabElement } from '../elements/TabElement';
import type { BlockProps } from '../utils/BlockProps';

export type TabNavigationBlockProps = BlockProps<ExperimentalTabNavigationBlock>;

const TabNavigationBlock = (blockProps: TabNavigationBlockProps) => {
    /* Implementation Hidden */
};

export default memo(TabNavigationBlock);

```