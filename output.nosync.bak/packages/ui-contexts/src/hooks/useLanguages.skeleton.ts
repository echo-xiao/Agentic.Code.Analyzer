## File: packages/ui-contexts/src/hooks/useLanguages.ts

```typescript
import { useContext } from 'react';

import type { TranslationContextValue } from '../TranslationContext';
import { TranslationContext } from '../TranslationContext';

export const useLanguages = (): TranslationContextValue['languages'] => useContext(TranslationContext).languages;

```