## File: apps/meteor/client/views/directory/RoomTags.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { Box, Margins, Tag } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

export type RoomTagsProps = {
	room: Serialized<IRoom>;
};

const RoomTags = ({ room }: RoomTagsProps) => {
    /* Implementation Hidden */
};

export default RoomTags;

```