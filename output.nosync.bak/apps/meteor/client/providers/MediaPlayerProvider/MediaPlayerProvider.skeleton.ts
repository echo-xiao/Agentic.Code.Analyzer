## File: apps/meteor/client/providers/MediaPlayerProvider/MediaPlayerProvider.tsx

```typescript
import { useMergedRefs, useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { ReactNode } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import type { MediaPlayerContextValue, PersistentAudioTrack } from './MediaPlayerContext';
import { MediaPlayerContext } from './MediaPlayerContext';
import { useReloadOnError } from '../../components/message/content/attachments/file/hooks/useReloadOnError';

const PLAYBACK_RATES = [1, 1.5, 2] as const;

export type MediaPlayerProviderProps = {
	children?: ReactNode;
};

/**
 * Owns the single, app-wide `<audio>` element used to play message audio
 * attachments. Because the element lives above the room layout and is never
 * recreated, both the in-message controls and the sidebar card drive the very
 * same element: switching or closing the room only swaps which UI is shown — the
 * element keeps playing with no reload, seek, or gap.
 */
const MediaPlayerProvider = ({ children }: MediaPlayerProviderProps) => {
    /* Implementation Hidden */
};

export default MediaPlayerProvider;

```