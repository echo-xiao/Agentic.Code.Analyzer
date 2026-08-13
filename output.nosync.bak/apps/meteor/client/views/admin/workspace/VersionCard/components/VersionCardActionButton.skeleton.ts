## File: apps/meteor/client/views/admin/workspace/VersionCard/components/VersionCardActionButton.tsx

```typescript
import { Button } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { LocationPathname } from '@rocket.chat/ui-contexts';
import { useRouter } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { memo } from 'react';

export type VersionCardActionButtonProps =
	| {
			path: LocationPathname;
			label: ReactNode;
	  }
	| {
			action: () => void;
			label: ReactNode;
	  };

const VersionCardActionButton = (item: VersionCardActionButtonProps) => {
    /* Implementation Hidden */
};

export default memo(VersionCardActionButton);

```