## File: apps/meteor/client/components/message/content/actions/MessageAction.tsx

```typescript
import { Button } from '@rocket.chat/fuselage';
import type { Keys as IconName } from '@rocket.chat/icons';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

const resolveLegacyIcon = (legacyIcon: IconName | `icon-${IconName | 'videocam'}`): IconName => {
    /* Implementation Hidden */
};

export type MessageActionProps = {
	icon: IconName;
	i18nLabel?: TranslationKey;
	label?: string;
	methodId: string;
	runAction: (actionId: string) => () => void;
	danger?: boolean;
};

const MessageAction = ({ icon, methodId, i18nLabel, label, runAction, danger }: MessageActionProps) => {
    /* Implementation Hidden */
};

export default MessageAction;

```