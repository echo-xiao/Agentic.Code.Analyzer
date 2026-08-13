## File: packages/ui-client/src/components/Page/PageContext.ts

```typescript
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

type PageContextValue = [boolean, Dispatch<SetStateAction<boolean>>];

const PageContext = createContext<PageContextValue>([false, () => undefined]);

export default PageContext;

```