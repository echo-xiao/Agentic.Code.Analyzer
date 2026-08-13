## File: apps/meteor/client/views/admin/customSounds/EditCustomSound.tsx

```typescript
import { ContextualbarEmptyContent } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import EditSound from './EditSound';
import { FormSkeleton } from '../../../components/Skeleton';

export type EditCustomSoundProps = {
	_id: string | undefined;
	onChange?: () => void;
	close: () => void;
};

function EditCustomSound({ _id, onChange, close, ...props }: EditCustomSoundProps) {
    /* Implementation Hidden */
}

export default EditCustomSound;

```