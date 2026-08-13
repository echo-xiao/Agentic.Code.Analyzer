## File: apps/meteor/client/providers/AttachmentProvider.tsx

```typescript
import { usePrefersReducedData } from '@rocket.chat/fuselage-hooks';
import type { AttachmentContextValue } from '@rocket.chat/ui-contexts';
import { AttachmentContext, useLayout, useUserPreference } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

import { getURL } from '../../app/utils/client';

export type AttachmentProviderProps = {
	children?: ReactNode;
	width?: number;
	height?: number;
};

const AttachmentProvider = ({ children, width = 360, height = 360 }: AttachmentProviderProps) => {
    /* Implementation Hidden */
};

export default AttachmentProvider;

```