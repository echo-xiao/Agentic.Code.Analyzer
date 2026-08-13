## File: apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfPopups/VideoConfPopup/VideoConfPopupRoomInfo.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isDirectMessageRoom, isMultipleDirectMessageRoom } from '@rocket.chat/core-typings';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import { useUser } from '@rocket.chat/ui-contexts';
import { VideoConfPopupInfo } from '@rocket.chat/ui-video-conf';

import { RoomIcon } from '../../../../../../components/RoomIcon';
import ReactiveUserStatus from '../../../../../../components/UserStatus/ReactiveUserStatus';
import { useVideoConfRoomName } from '../../hooks/useVideoConfRoomName';

export type VideoConfPopupRoomInfoProps = { room: IRoom };

const VideoConfPopupRoomInfo = ({ room }: VideoConfPopupRoomInfoProps) => {
    /* Implementation Hidden */
};

export default VideoConfPopupRoomInfo;

```