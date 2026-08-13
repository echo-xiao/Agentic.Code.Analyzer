## File: packages/ui-video-conf/src/VideoConfMessage/VideoConfMessageUserStack.tsx

```typescript
import type { IVideoConferenceUser, Serialized } from '@rocket.chat/core-typings';
import { getUserDisplayName } from '@rocket.chat/core-typings';
import { Avatar, Box, Icon } from '@rocket.chat/fuselage';
import { useSetting, useUserAvatarPath, useUserPreference } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

const MAX_USERS = 3;

type VideoConfMessageUserStackProps = {
	users: Serialized<IVideoConferenceUser>[];
};

const VideoConfMessageUserStack = ({ users }: VideoConfMessageUserStackProps) => {
    /* Implementation Hidden */
};

export default memo(VideoConfMessageUserStack);

```