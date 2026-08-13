## File: apps/meteor/client/components/avatar/UserAvatarEditor/UserAvatarEditor.tsx

```typescript
import type { IUser, AvatarObject } from '@rocket.chat/core-typings';
import { Box, Button, Avatar, IconButton } from '@rocket.chat/fuselage';
import { Field, FieldLabel, FieldRow, FieldError, TextInput } from '@rocket.chat/fuselage-forms';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useToastMessageDispatch, useSetting } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { UserAvatarSuggestion } from './UserAvatarSuggestion';
import UserAvatarSuggestions from './UserAvatarSuggestions';
import { readFileAsDataURL } from './readFileAsDataURL';
import { useSingleFileInput } from '../../../hooks/useSingleFileInput';
import { isSafeAvatarUrl } from '../../../lib/utils/isSafeAvatarUrl';
import { isValidImageFormat } from '../../../lib/utils/isValidImageFormat';

export type UserAvatarEditorProps = {
	currentUsername: IUser['username'];
	username: IUser['username'];
	setAvatarObj: (obj: AvatarObject) => void;
	disabled?: boolean;
	etag: IUser['avatarETag'];
	name: IUser['name'];
};

function UserAvatarEditor({ currentUsername, username, setAvatarObj, name, disabled, etag }: UserAvatarEditorProps) {
    /* Implementation Hidden */
}

export default UserAvatarEditor;

```