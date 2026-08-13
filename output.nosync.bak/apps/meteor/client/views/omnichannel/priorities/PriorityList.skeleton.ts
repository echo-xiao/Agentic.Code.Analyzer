## File: apps/meteor/client/views/omnichannel/priorities/PriorityList.tsx

```typescript
import {
	ContextualbarTitle,
	ContextualbarHeader,
	ContextualbarClose,
	ContextualbarScrollableContent,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import type { PriorityFormData } from './PriorityEditForm';
import PriorityEditFormWithData from './PriorityEditFormWithData';

type PriorityListProps = {
	context: 'edit';
	priorityId: string;
	onSave: (data: PriorityFormData) => Promise<void>;
	onClose: () => void;
};

const PriorityList = ({ priorityId, onClose, onSave }: PriorityListProps) => {
    /* Implementation Hidden */
};

export default PriorityList;

```