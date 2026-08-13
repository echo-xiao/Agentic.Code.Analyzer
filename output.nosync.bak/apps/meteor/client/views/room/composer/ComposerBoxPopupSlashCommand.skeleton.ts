## File: apps/meteor/client/views/room/composer/ComposerBoxPopupSlashCommand.tsx

```typescript
import { OptionContent, OptionDescription } from '@rocket.chat/fuselage';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

export type ComposerBoxPopupSlashCommandProps = {
	_id: string;
	description?: string;
	params?: string;
	disabled?: boolean;
};

const slashCommandDescriptionStyle: CSSProperties = { textAlign: 'right' };

function ComposerBoxPopupSlashCommand({ _id, description, params, disabled }: ComposerBoxPopupSlashCommandProps) {
    /* Implementation Hidden */
}

export default ComposerBoxPopupSlashCommand;

```