## File: apps/meteor/client/providers/LayoutProvider.tsx

```typescript
import { useBreakpoints } from '@rocket.chat/fuselage-hooks';
import { useFeaturePreview } from '@rocket.chat/ui-client';
import { LayoutContext, useRouter, useSetting } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useMemo, useState, useEffect } from 'react';

const hiddenActionsDefaultValue = {
	roomToolbox: [],
	messageToolbox: [],
	composerToolbox: [],
	userToolbox: [],
};

export type LayoutProviderProps = {
	children?: ReactNode;
};

const LayoutProvider = ({ children }: LayoutProviderProps) => {
    /* Implementation Hidden */
};

export default LayoutProvider;

```