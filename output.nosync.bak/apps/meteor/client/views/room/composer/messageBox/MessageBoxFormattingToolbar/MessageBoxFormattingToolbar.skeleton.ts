## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxFormattingToolbar/MessageBoxFormattingToolbar.tsx

```typescript
import { MessageComposerAction } from '@rocket.chat/ui-composer';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import FormattingToolbarDropdown from './FormattingToolbarDropdown';
import type { FormattingButton } from '../../../../../../app/ui-message/client/messageBox/messageBoxFormatting';
import { isPromptButton } from '../../../../../../app/ui-message/client/messageBox/messageBoxFormatting';
import type { ComposerAPI } from '../../../../../lib/chats/ChatAPI';

type MessageBoxFormattingToolbarProps = {
	composer: ComposerAPI;
	variant?: 'small' | 'large';
	items: FormattingButton[];
	disabled: boolean;
};

const MessageBoxFormattingToolbar = ({ items, variant = 'large', composer, disabled }: MessageBoxFormattingToolbarProps) => {
    /* Implementation Hidden */
};

export default memo(MessageBoxFormattingToolbar);

```