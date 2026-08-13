## File: apps/meteor/client/views/admin/customEmoji/AddCustomEmoji.tsx

```typescript
import { Box, Button, ButtonGroup, Margins, TextInput, Field, FieldLabel, FieldRow, FieldError, IconButton } from '@rocket.chat/fuselage';
import { ContextualbarScrollableContent, ContextualbarFooter } from '@rocket.chat/ui-client';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEndpointUploadMutation } from '../../../hooks/useEndpointUploadMutation';
import { useSingleFileInput } from '../../../hooks/useSingleFileInput';

export type AddCustomEmojiProps = {
	close: () => void;
	onChange: () => void;
};

const AddCustomEmoji = ({ close, onChange, ...props }: AddCustomEmojiProps) => {
    /* Implementation Hidden */
};

export default AddCustomEmoji;

```