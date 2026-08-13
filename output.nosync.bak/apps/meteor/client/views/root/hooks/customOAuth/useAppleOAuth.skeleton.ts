## File: apps/meteor/client/views/root/hooks/customOAuth/useAppleOAuth.ts

```typescript
import { config } from '../../../../../app/apple/lib/config';
import { CustomOAuth } from '../../../../lib/customOAuth/CustomOAuth';

/* const Apple =*/ CustomOAuth.configureOAuthService('apple', config);

export const useAppleOAuth = () => {
    /* Implementation Hidden */
};

```