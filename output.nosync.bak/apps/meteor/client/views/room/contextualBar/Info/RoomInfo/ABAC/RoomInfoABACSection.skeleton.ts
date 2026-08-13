## File: apps/meteor/client/views/room/contextualBar/Info/RoomInfo/ABAC/RoomInfoABACSection.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Box, Divider, Tag } from '@rocket.chat/fuselage';
import { InfoPanelField, InfoPanelLabel } from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { RoomIcon } from '../../../../../../components/RoomIcon';

// TODO: Remove type union when ABAC is implemented
type RoomInfoABACSectionProps = {
	room: IRoom & {
		abacAttributes?: {
			key: string;
			values: string[];
		}[];
	};
};

const RoomInfoABACSection = ({ room }: RoomInfoABACSectionProps) => {
    /* Implementation Hidden */
};

export default RoomInfoABACSection;

```