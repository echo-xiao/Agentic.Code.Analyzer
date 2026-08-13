## File: apps/meteor/client/views/admin/customSounds/AddCustomSound.tsx

```typescript
import { Field, FieldLabel, FieldRow, TextInput, Box, Margins, Button, ButtonGroup, IconButton } from '@rocket.chat/fuselage';
import { ContextualbarScrollableContent, ContextualbarFooter } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, type UploadResult } from '@rocket.chat/ui-contexts';
import fileSize from 'filesize';
import type { ChangeEvent } from 'react';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { validate } from './lib';
import { CUSTOM_SOUND_ALLOWED_MIME_TYPES, MAX_CUSTOM_SOUND_SIZE_BYTES } from '../../../../lib/constants';
import { useEndpointUploadMutation } from '../../../hooks/useEndpointUploadMutation';
import { useSingleFileInput } from '../../../hooks/useSingleFileInput';

export type AddCustomSoundProps = {
	goToNew: (_id: string) => () => void;
	close: () => void;
	onChange: () => void;
};

type CustomSoundCreateResult = UploadResult & {
	sound: {
		_id: string;
	};
};

const AddCustomSound = ({ goToNew, close, onChange, ...props }: AddCustomSoundProps) => {
    /* Implementation Hidden */
};

export default AddCustomSound;

```