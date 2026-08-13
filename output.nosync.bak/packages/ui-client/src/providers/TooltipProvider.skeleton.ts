## File: packages/ui-client/src/providers/TooltipProvider.tsx

```typescript
import { useDebouncedState, useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { TooltipContext } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, memo, useCallback, useState } from 'react';

import { TooltipComponent } from '../components/TooltipComponent';

type TooltipProviderProps = {
	children?: ReactNode;
	ownerDocument?: Document;
};

const TooltipProvider = ({ children, ownerDocument = window.document }: TooltipProviderProps) => {
    /* Implementation Hidden */
};

export default memo<typeof TooltipProvider>(TooltipProvider);

```