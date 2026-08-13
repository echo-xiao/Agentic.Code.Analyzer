## File: packages/web-ui-registration/src/hooks/useLoginRouter.ts

```typescript
import type { Dispatch } from 'react';
import { useState } from 'react';

export type LoginRoutes =
	| 'login'
	| 'reset-password'
	| 'register'
	| 'register-invalid'
	| 'secret-register'
	| 'invite-register'
	| 'guest'
	| 'anonymous';

export const useLoginRouter = (route: LoginRoutes): [LoginRoutes, DispatchLoginRouter] => useState<LoginRoutes>(route);

export type DispatchLoginRouter = Dispatch<LoginRoutes>;

```