## File: apps/meteor/client/views/marketplace/helpers/filterAppsByCategories.ts

```typescript
import type { App } from '../types';

export const filterAppsByCategories = (app: App, categories: string[]): boolean =>
	!app.categories || categories.length === 0 || app.categories.some((c) => categories.includes(c));

```