## File: apps/meteor/client/views/omnichannel/cannedResponses/components/CannedResponsesComposer/InsertPlaceholderDropdown.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Divider } from '@rocket.chat/fuselage';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export type InsertPlaceholderDropdownProps = {
	onChange: (value: string) => void;
	textAreaRef: RefObject<HTMLTextAreaElement | null>;
	setVisible: Dispatch<SetStateAction<boolean>>;
};

const InsertPlaceholderDropdown = ({ onChange, textAreaRef, setVisible }: InsertPlaceholderDropdownProps) => {
    /* Implementation Hidden */
};

export default memo(InsertPlaceholderDropdown);

```