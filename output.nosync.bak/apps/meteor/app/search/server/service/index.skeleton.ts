## File: apps/meteor/app/search/server/service/index.ts

```typescript
import { SearchProviderService } from './SearchProviderService';
import { SearchResultValidationService } from './SearchResultValidationService';

export const searchProviderService = new SearchProviderService();
export const validationService = new SearchResultValidationService();

```