## File: apps/meteor/client/views/omnichannel/cannedResponses/components/CannedResponsesComposer/CannedResponsesComposer.tsx

```typescript
import { Button, PositionAnimated, Tile } from '@rocket.chat/fuselage';
import {
	MessageComposerAction,
	MessageComposerToolbarActions,
	MessageComposer,
	MessageComposerInput,
	MessageComposerToolbar,
	MessageComposerActionsDivider,
} from '@rocket.chat/ui-composer';
import { useUserPreference } from '@rocket.chat/ui-contexts';
import type { ComponentProps, ChangeEvent } from 'react';
import { memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import InsertPlaceholderDropdown from './InsertPlaceholderDropdown';
import { Backdrop } from '../../../../../components/Backdrop';
import { useEmojiPicker } from '../../../../../contexts/EmojiPickerContext';

export type CannedResponsesComposerProps = Omit<ComponentProps<typeof MessageComposerInput>, 'onChange'> & {
	onChange: (value: string) => void;
};

const CannedResponsesComposer = ({ onChange, ...props }: CannedResponsesComposerProps) => {
    /* Implementation Hidden */
};

export default memo(CannedResponsesComposer);

```