## File: packages/server-fetch/src/parsers.ts

```typescript
import type { ExtendedFetchOptions, FetchOptions, OriginalFetchOptions } from './types';

const jsonParser = (options: ExtendedFetchOptions) => {
    /* Implementation Hidden */
};

const urlencodedParser = (options: ExtendedFetchOptions) => {
    /* Implementation Hidden */
};

const getParser = (contentTypeHeader?: string): ((options: ExtendedFetchOptions) => FetchOptions) => {
    /* Implementation Hidden */
};

export function parseRequestOptions(options?: ExtendedFetchOptions): OriginalFetchOptions {
    /* Implementation Hidden */
}

```