## File: apps/meteor/app/search/server/register.ts

```typescript
import { DefaultProvider } from './provider/DefaultProvider';
import { searchProviderService } from './service';

// register provider
searchProviderService.register(new DefaultProvider());

```