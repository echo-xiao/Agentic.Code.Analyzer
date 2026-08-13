## File: apps/meteor/client/navbar/NavBarSearch/NavBarSearchItemSkeleton.tsx

```typescript
import { SidebarV2Item, SidebarV2ItemAvatarWrapper, SidebarV2ItemTitle, Skeleton } from '@rocket.chat/fuselage';

// Placeholder row shown while the server spotlight results are still loading.
// Decorative only: it has no `role='option'` so keyboard navigation skips it
// (see useSearchNavigation), and `tabIndex={-1}` + `pointerEvents='none'` keep
// it out of reach of focus and mouse clicks. Loading is conveyed via aria-busy.
const NavBarSearchItemSkeleton = () => {
    /* Implementation Hidden */
};

export default NavBarSearchItemSkeleton;

```