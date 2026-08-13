## File: apps/meteor/client/views/admin/ABAC/ABACRoomsTab/RoomFormAttributeField.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Button, FieldError, FieldRow, MultiSelectFiltered, SelectFiltered } from '@rocket.chat/fuselage';
import { useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { RoomFormData } from './RoomForm';

type ABACAttributeAutocompleteProps = {
	labelId: string;
	onRemove: () => void;
	index: number;
	attributeList: { value: string; label: string; attributeValues: string[] }[];
	required?: boolean;
	disabled?: boolean;
};

const RoomFormAttributeField = ({
	labelId,
	onRemove,
	index,
	attributeList,
	required = false,
	disabled = false,
}: ABACAttributeAutocompleteProps) => {
    /* Implementation Hidden */
};

export default RoomFormAttributeField;

```