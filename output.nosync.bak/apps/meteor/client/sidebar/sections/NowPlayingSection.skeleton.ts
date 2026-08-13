## File: apps/meteor/client/sidebar/sections/NowPlayingSection.tsx

```typescript
import { AudioPlayerControls, Box, IconButton } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import SidebarCard from './SidebarCard';
import { useFormatMemorySize } from '../../hooks/useFormatMemorySize';
import { setMessageJumpQueryStringParameter } from '../../lib/utils/setMessageJumpQueryStringParameter';
import { useMediaPlayer } from '../../providers/MediaPlayerProvider';
import { useGoToRoom } from '../../views/room/hooks/useGoToRoom';

/**
 * Persistent audio card pinned to the bottom of the sidebar (design 1c).
 * It drives the shared audio element, so it stays available while a track is
 * loaded — including after switching or closing the room, or closing the thread
 * the audio was played from.
 */
const NowPlayingSection = () => {
    /* Implementation Hidden */
};

export default NowPlayingSection;

```