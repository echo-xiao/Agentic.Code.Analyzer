## File: apps/meteor/client/components/UserAndRoomAutoCompleteMultiple/UserAndRoomAutoCompleteMultiple.tsx

```typescript
import { type RoomType, isDirectMessageRoom } from '@rocket.chat/core-typings';
import { AutoComplete, Box, Option, OptionAvatar, OptionContent, Chip } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import { useUser, useUserSubscriptions } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { memo, useMemo, useState } from 'react';

import { roomCoordinator } from '../../lib/rooms/roomCoordinator';
import { Rooms } from '../../stores';

export type UserAndRoomAutoCompleteMultipleProps = Omit<ComponentProps<typeof AutoComplete>, 'filter'> & {
	limit?: number;
};

type OptionType = {
	value: string;
	label: {
		name: string | undefined;
		avatarETag: string | undefined;
		type: RoomType;
	};
}[];

const UserAndRoomAutoCompleteMultiple = ({ value, onChange, limit, ...props }: UserAndRoomAutoCompleteMultipleProps) => {
    /* Implementation Hidden */
};

export default memo(UserAndRoomAutoCompleteMultiple);

```