## File: apps/meteor/client/hooks/useUpdateAvatar.ts

```typescript
import type { AvatarObject, AvatarServiceObject, AvatarReset, AvatarUrlObj, IUser } from '@rocket.chat/core-typings';
import { useToastMessageDispatch, useMethod } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useEndpointMutation } from './useEndpointMutation';
import { useEndpointUploadMutation } from './useEndpointUploadMutation';

const isAvatarReset = (avatarObj: AvatarObject): avatarObj is AvatarReset => avatarObj === 'reset';
const isServiceObject = (avatarObj: AvatarObject): avatarObj is AvatarServiceObject =>
	!isAvatarReset(avatarObj) && typeof avatarObj === 'object' && 'service' in avatarObj;
const isAvatarUrl = (avatarObj: AvatarObject): avatarObj is AvatarUrlObj =>
	!isAvatarReset(avatarObj) && typeof avatarObj === 'object' && 'service' && 'avatarUrl' in avatarObj;

export const useUpdateAvatar = (avatarObj: AvatarObject, userId: IUser['_id']) => {
    /* Implementation Hidden */
};

```