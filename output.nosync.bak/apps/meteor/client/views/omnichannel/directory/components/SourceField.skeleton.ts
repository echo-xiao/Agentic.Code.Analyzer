## File: apps/meteor/client/views/omnichannel/directory/components/SourceField.tsx

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { OmnichannelRoomIcon } from '../../../../components/RoomIcon/OmnichannelRoomIcon';
import Field from '../../components/Field';
import Info from '../../components/Info';
import Label from '../../components/Label';
import { useOmnichannelSource } from '../../hooks/useOmnichannelSource';

type SourceFieldProps = {
	room: IOmnichannelRoom;
};

const SourceField = ({ room }: SourceFieldProps) => {
    /* Implementation Hidden */
};

export default SourceField;

```