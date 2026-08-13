## File: apps/meteor/client/views/admin/ABAC/ABACRoomsTab/RoomFormAttributeFields.tsx

```typescript
import { Box, Field, FieldLabel, InputBoxSkeleton } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import RoomFormAttributeField from './RoomFormAttributeField';
import { useAttributeList } from '../hooks/useAttributeList';
import { useIsExternalAttributeStore } from '../hooks/useIsExternalAttributeStore';

export type RoomFormAttributeFieldsProps = {
	fields: { id: string }[];
	remove: (index: number) => void;
	disabled?: boolean;
};

const RoomFormAttributeFields = ({ fields, remove, disabled = false }: RoomFormAttributeFieldsProps) => {
    /* Implementation Hidden */
};

export default RoomFormAttributeFields;

```