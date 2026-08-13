## File: apps/meteor/client/views/marketplace/helpers/filterAppsByEnterprise.ts

```typescript
import type { App } from '../types';

export const filterAppsByEnterprise = ({ isEnterpriseOnly }: Partial<App>): boolean => Boolean(isEnterpriseOnly);

```