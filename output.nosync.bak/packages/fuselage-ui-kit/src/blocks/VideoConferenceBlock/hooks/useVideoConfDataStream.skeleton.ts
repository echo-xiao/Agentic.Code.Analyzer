## File: packages/fuselage-ui-kit/src/blocks/VideoConferenceBlock/hooks/useVideoConfDataStream.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useStream } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useVideoConfData } from './useVideoConfData';

export const useVideoConfDataStream = ({ rid, callId }: { rid: IRoom['_id']; callId: string }) => {
    /* Implementation Hidden */
};

```