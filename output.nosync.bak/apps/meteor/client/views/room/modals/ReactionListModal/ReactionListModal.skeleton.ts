## File: apps/meteor/client/views/room/modals/ReactionListModal/ReactionListModal.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { GenericModal } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import Reactions from './Reactions';

export type ReactionListModalProps = {
	reactions: Required<IMessage>['reactions'];
	onClose: () => void;
};

const ReactionListModal = ({ reactions, onClose }: ReactionListModalProps) => {
    /* Implementation Hidden */
};

export default ReactionListModal;

```