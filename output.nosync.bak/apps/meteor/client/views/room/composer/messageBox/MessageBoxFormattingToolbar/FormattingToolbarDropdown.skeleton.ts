## File: apps/meteor/client/views/room/composer/messageBox/MessageBoxFormattingToolbar/FormattingToolbarDropdown.tsx

```typescript
import { GenericMenu } from '@rocket.chat/ui-client';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { isPromptButton, type FormattingButton } from '../../../../../../app/ui-message/client/messageBox/messageBoxFormatting';
import type { ComposerAPI } from '../../../../../lib/chats/ChatAPI';

type FormattingToolbarDropdownProps = {
	composer: ComposerAPI;
	items: FormattingButton[];
	disabled: boolean;
};

const FormattingToolbarDropdown = ({ composer, items, disabled }: FormattingToolbarDropdownProps) => {
    /* Implementation Hidden */
};

export default FormattingToolbarDropdown;

```