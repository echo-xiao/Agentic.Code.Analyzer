## File: apps/meteor/client/hooks/useHighlightedCode.ts

```typescript
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import hljs, { register } from '../../app/markdown/lib/hljs';

export function useHighlightedCode(language: string, text: string): string {
    /* Implementation Hidden */
}

```