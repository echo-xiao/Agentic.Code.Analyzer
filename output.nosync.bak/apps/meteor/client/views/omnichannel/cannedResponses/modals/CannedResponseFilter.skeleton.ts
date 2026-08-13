## File: apps/meteor/client/views/omnichannel/cannedResponses/modals/CannedResponseFilter.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Icon, TextInput, Select } from '@rocket.chat/fuselage';
import type { ChangeEvent } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import AutoCompleteAgent from '../../components/AutoCompleteAgent';

type SharingValues = '' | 'user' | 'global' | 'department';

export type CannedResponsesFilterProps = {
	createdBy: string;
	setCreatedBy: (value: string) => void;
	sharing: SharingValues;
	setSharing: (value: SharingValues) => void;
	text: string;
	setText: (text: string) => void;
};

const CannedResponsesFilter = ({ createdBy, setCreatedBy, sharing, setSharing, text, setText }: CannedResponsesFilterProps) => {
    /* Implementation Hidden */
};

export default memo(CannedResponsesFilter);

```