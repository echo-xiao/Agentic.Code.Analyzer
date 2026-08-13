## File: packages/ui-client/src/components/Page/Page.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { useState } from 'react';

import PageContext from './PageContext';

type PageProps = Omit<ComponentProps<typeof Box>, 'backgroundColor'> & {
	background?: 'light' | 'tint' | 'neutral' | 'room';
};

const Page = ({ background = 'light', ...props }: PageProps) => {
    /* Implementation Hidden */
};

export default Page;

```