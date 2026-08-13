## File: apps/meteor/client/views/admin/customSounds/CustomSoundsTable/CustomSoundRow.tsx

```typescript
import type { ICustomSound } from '@rocket.chat/core-typings';
import { Box, IconButton } from '@rocket.chat/fuselage';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';
import { useCustomSound } from '@rocket.chat/ui-contexts';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type CustomSoundRowProps = {
	onClick: (soundId: ICustomSound['_id']) => () => void;
	sound: {
		name: string;
		_id: string;
	};
};

const CustomSoundRow = ({ onClick, sound }: CustomSoundRowProps) => {
    /* Implementation Hidden */
};

export default CustomSoundRow;

```