## File: packages/ui-contexts/src/hooks/useMethod.ts

```typescript
import type { ServerMethodName, ServerMethodParameters, ServerMethodReturn, ServerMethods } from '@rocket.chat/ddp-client';
import { useCallback, useContext } from 'react';

import { ServerContext } from '../ServerContext';

type ServerMethodFunction<MethodName extends ServerMethodName> = (
	...args: ServerMethodParameters<MethodName>
) => Promise<ServerMethodReturn<MethodName>>;

/** @deprecated prefer the use of api endpoints (useEndpoint) */
export const useMethod = <MethodName extends keyof ServerMethods>(methodName: MethodName): ServerMethodFunction<MethodName> => {
    /* Implementation Hidden */
};

```