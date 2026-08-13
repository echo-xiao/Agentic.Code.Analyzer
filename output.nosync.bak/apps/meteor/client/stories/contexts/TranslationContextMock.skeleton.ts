## File: apps/meteor/client/stories/contexts/TranslationContextMock.tsx

```typescript
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { TranslationContext } from '@rocket.chat/ui-contexts';
import i18next from 'i18next';
import type { ContextType, ReactNode } from 'react';
import { useContext, useMemo } from 'react';

export type TranslationContextMockProps = {
	children: ReactNode;
};

const TranslationContextMock = ({ children }: TranslationContextMockProps) => {
    /* Implementation Hidden */
};

export default TranslationContextMock;

```