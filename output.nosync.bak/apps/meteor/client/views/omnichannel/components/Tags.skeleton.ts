## File: apps/meteor/client/views/omnichannel/components/Tags.tsx

```typescript
import { TextInput, Chip, Button, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useId, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CurrentChatTags } from '../additionalForms';
import { FormSkeleton } from './FormSkeleton';
import { useLivechatTags } from '../hooks/useLivechatTags';

export type TagsProps = {
	tags?: string[];
	handler: (value: string[]) => void;
	error?: string;
	tagRequired?: boolean;
	department?: string;
};

const Tags = ({ tags = [], handler, error, tagRequired, department }: TagsProps) => {
    /* Implementation Hidden */
};

export default Tags;

```