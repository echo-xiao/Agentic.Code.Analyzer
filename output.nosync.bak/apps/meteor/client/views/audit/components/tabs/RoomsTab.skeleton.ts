## File: apps/meteor/client/views/audit/components/tabs/RoomsTab.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Field, FieldLabel, FieldRow, FieldError, Icon } from '@rocket.chat/fuselage';
import type { Dispatch, SetStateAction } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import RoomAutoComplete from '../../../../components/RoomAutoComplete';
import type { AuditFields } from '../../hooks/useAuditForm';

export type RoomsTabProps = {
	form: UseFormReturn<AuditFields>;
	setSelectedRoom: Dispatch<SetStateAction<IRoom | undefined>>;
};

const RoomsTab = ({ form: { control }, setSelectedRoom }: RoomsTabProps) => {
    /* Implementation Hidden */
};

export default RoomsTab;

```