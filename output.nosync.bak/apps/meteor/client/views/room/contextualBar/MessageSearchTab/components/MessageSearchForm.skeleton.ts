## File: apps/meteor/client/views/room/contextualBar/MessageSearchTab/components/MessageSearchForm.tsx

```typescript
import type { IMessageSearchProvider } from '@rocket.chat/core-typings';
import { Box, Field, FieldLabel, FieldHint, Icon, TextInput, ToggleSwitch, Callout } from '@rocket.chat/fuselage';
import { useDebouncedCallback, useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import DOMPurify from 'dompurify';
import { useEffect, useId } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getRoomTypeTranslation } from '../../../../../lib/getRoomTypeTranslation';
import { useRoom } from '../../../contexts/RoomContext';

type MessageSearchFormProps = {
	provider: IMessageSearchProvider;
	onSearch: (params: { searchText: string; globalSearch: boolean }) => void;
	searchListId: string;
	isSuccess: boolean;
};

const MessageSearchForm = ({ provider, onSearch, searchListId, isSuccess }: MessageSearchFormProps) => {
    /* Implementation Hidden */
};

export default MessageSearchForm;

```