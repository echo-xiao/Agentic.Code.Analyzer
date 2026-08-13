## File: packages/ui-contexts/src/hooks/useLanguage.ts

```typescript
import { useContext } from 'react';

import type { TranslationContextValue } from '../TranslationContext';
import { TranslationContext } from '../TranslationContext';

export const useLanguage = (): TranslationContextValue['language'] => useContext(TranslationContext).language;

```