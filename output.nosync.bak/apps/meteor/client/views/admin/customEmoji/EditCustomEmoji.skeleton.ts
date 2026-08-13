## File: apps/meteor/client/views/admin/customEmoji/EditCustomEmoji.tsx

```typescript
import {
	Box,
	Button,
	ButtonGroup,
	Margins,
	TextInput,
	Field,
	FieldGroup,
	FieldLabel,
	FieldRow,
	FieldError,
	IconButton,
} from '@rocket.chat/fuselage';
import { GenericModal, ContextualbarScrollableContent, ContextualbarFooter } from '@rocket.chat/ui-client';
import { useSetModal, useAbsoluteUrl, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useEndpointMutation } from '../../../hooks/useEndpointMutation';
import { useEndpointUploadMutation } from '../../../hooks/useEndpointUploadMutation';
import { useSingleFileInput } from '../../../hooks/useSingleFileInput';

export type EditCustomEmojiProps = {
	close: () => void;
	onChange: () => void;
	data: {
		_id: string;
		name: string;
		aliases: string[];
		extension: string;
		etag?: string;
	};
};

const EditCustomEmoji = ({ close, onChange, data, ...props }: EditCustomEmojiProps) => {
    /* Implementation Hidden */
};

export default EditCustomEmoji;

```