## File: packages/ui-client/src/hooks/useEmbeddedLayout.ts

```typescript
import { useLayout } from '@rocket.chat/ui-contexts';

export const useEmbeddedLayout = () => useLayout().isEmbedded;

```