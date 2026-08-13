## File: apps/meteor/client/views/omnichannel/departments/DepartmentTags.tsx

```typescript
import { Button, Chip, FieldRow, TextInput } from '@rocket.chat/fuselage';
import type { ComponentProps, ChangeEvent } from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

type DepartmentTagsProps = {
	error: string;
	value: string[];
	onChange: (tags: string[]) => void;
} & ComponentProps<typeof TextInput>;

const DepartmentTags = ({ error, value: tags, onChange, ...props }: DepartmentTagsProps) => {
    /* Implementation Hidden */
};

export default DepartmentTags;

```