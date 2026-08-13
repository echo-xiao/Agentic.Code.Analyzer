## File: packages/ui-voip/src/views/MediaCallRoomSection/MediaCallRoomActivity.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useResizeObserver } from '@rocket.chat/fuselage-hooks';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useUser, useUserAvatarPath } from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import MediaCallRoomSection from './MediaCallRoomSection';
import MediaCallViewProvider from '../../providers/MediaCallViewProvider';

type MediaCallRoomActivityProps = {
	children: ReactNode;
};

const MediaCallRoomActivity = ({ children }: MediaCallRoomActivityProps) => {
    /* Implementation Hidden */
};

export default MediaCallRoomActivity;

```