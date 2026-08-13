## File: apps/meteor/client/views/admin/customSounds/EditSound.tsx

```typescript
import { Box, Button, ButtonGroup, Margins, TextInput, Field, FieldLabel, FieldRow, IconButton } from '@rocket.chat/fuselage';
import { GenericModal, ContextualbarScrollableContent, ContextualbarFooter } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import fileSize from 'filesize';
import type { ChangeEvent } from 'react';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { validate } from './lib';
import { CUSTOM_SOUND_ALLOWED_MIME_TYPES, MAX_CUSTOM_SOUND_SIZE_BYTES } from '../../../../lib/constants';
import { useEndpointUploadMutation } from '../../../hooks/useEndpointUploadMutation';
import { useSingleFileInput } from '../../../hooks/useSingleFileInput';

export type EditSoundProps = {
	close: () => void;
	onChange: () => void;
	data: {
		_id: string;
		name: string;
		extension: string;
	};
};

function EditSound({ close, onChange, data, ...props }: EditSoundProps) {
    /* Implementation Hidden */
}

export default EditSound;

```