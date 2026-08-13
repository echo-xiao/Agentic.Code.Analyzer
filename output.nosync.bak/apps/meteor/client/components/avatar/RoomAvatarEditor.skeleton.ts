## File: apps/meteor/client/components/avatar/RoomAvatarEditor.tsx

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { IRoom, RoomAdminFieldsType } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { getAvatarURL } from '../../../app/utils/client/getAvatarURL';
import { useSingleFileInput } from '../../hooks/useSingleFileInput';
import { isValidImageFormat } from '../../lib/utils/isValidImageFormat';

export type RoomAvatarEditorProps = {
	room: Pick<IRoom, RoomAdminFieldsType>;
	disabled?: boolean;
	roomAvatar?: string;
	onChangeAvatar: (url: string | null) => void;
};

const RoomAvatarEditor = ({ disabled = false, room, roomAvatar, onChangeAvatar }: RoomAvatarEditorProps) => {
    /* Implementation Hidden */
};

export default RoomAvatarEditor;

```