## File: packages/tools/src/getHeader.ts

```typescript
import type { IncomingHttpHeaders } from 'node:http';

type HeaderLike = IncomingHttpHeaders | Headers | Record<string, string | string[] | undefined>;

export const getHeader = <T extends string | string[] = string>(headers: HeaderLike, key: string): T => {
    /* Implementation Hidden */
};

```