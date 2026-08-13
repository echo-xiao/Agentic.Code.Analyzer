## File: apps/meteor/client/views/admin/customEmoji/EditCustomEmojiWithData.tsx

```typescript
import { Callout } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import EditCustomEmoji from './EditCustomEmoji';
import { FormSkeleton } from '../../../components/Skeleton';

export type EditCustomEmojiWithDataProps = {
	_id: string;
	close: () => void;
	onChange: () => void;
};

const EditCustomEmojiWithData = ({ _id, onChange, close, ...props }: EditCustomEmojiWithDataProps) => {
    /* Implementation Hidden */
};

export default EditCustomEmojiWithData;

```