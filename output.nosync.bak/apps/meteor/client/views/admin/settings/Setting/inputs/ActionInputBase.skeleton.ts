## File: apps/meteor/client/views/admin/settings/Setting/inputs/ActionInputBase.tsx

```typescript
import { Button, FieldRow, FieldHint } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import type { SettingInputProps } from './types';

export type ActionInputBaseProps = SettingInputProps & {
	actionText: TranslationKey;
	sectionChanged: boolean;
	onAction: () => Promise<{ message: TranslationKey; params?: string[] }>;
};

function ActionInputBase({ actionText, hint, disabled, sectionChanged, onAction }: ActionInputBaseProps) {
    /* Implementation Hidden */
}

export default ActionInputBase;

```