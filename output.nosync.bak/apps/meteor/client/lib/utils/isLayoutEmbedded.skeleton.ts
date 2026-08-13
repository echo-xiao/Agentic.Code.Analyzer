## File: apps/meteor/client/lib/utils/isLayoutEmbedded.ts

```typescript
import { router } from '../../providers/RouterProvider';

let embedded = false;

router.subscribeToRouteChange(() => {
	embedded = router.getSearchParameters().layout === 'embedded';
});

export const isLayoutEmbedded = () => embedded;

```