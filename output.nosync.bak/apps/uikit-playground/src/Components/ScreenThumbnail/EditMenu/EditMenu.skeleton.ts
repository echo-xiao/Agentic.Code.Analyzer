## File: apps/uikit-playground/src/Components/ScreenThumbnail/EditMenu/EditMenu.tsx

```typescript
import { Box, Icon, Button, Divider, Option } from '@rocket.chat/fuselage';
import { useOutsideClick } from '@rocket.chat/fuselage-hooks';
import { type ComponentProps, useRef, useState, type ChangeEvent } from 'react';

import { formatDate } from '../../../utils/formatDate';
import EditableLabel from '../EditableLabel/EditableLabel';

const EditMenu = ({
	name,
	date,
	onChange,
	onBlur,
	onDuplicate,
	onDelete,
	labelProps,
}: {
	name: string;
	date: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onDuplicate?: () => void;
	onDelete?: () => void;
	onBlur: () => void;
	labelProps?: ComponentProps<typeof EditableLabel>;
}) => {
    /* Implementation Hidden */
};

export default EditMenu;

```