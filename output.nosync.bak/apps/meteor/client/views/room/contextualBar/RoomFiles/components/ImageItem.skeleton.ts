## File: apps/meteor/client/views/room/contextualBar/RoomFiles/components/ImageItem.tsx

```typescript
import { Avatar, Box } from '@rocket.chat/fuselage';

type ImageItemProps = {
	id: string;
	url: string | undefined;
	name: string | undefined;
	timestamp: string;
	username?: string;
	alt?: string;
};

const ImageItem = ({ id, url, name, timestamp, username, alt = '' }: ImageItemProps) => {
    /* Implementation Hidden */
};

export default ImageItem;

```