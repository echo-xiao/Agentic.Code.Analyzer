## File: packages/ui-contexts/src/hooks/useLoadLanguage.ts

```typescript
import { useContext } from 'react';

import type { TranslationContextValue } from '../TranslationContext';
import { TranslationContext } from '../TranslationContext';

export const useLoadLanguage = (): TranslationContextValue['loadLanguage'] => useContext(TranslationContext).loadLanguage;

```