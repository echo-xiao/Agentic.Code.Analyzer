## File: apps/meteor/client/components/message/content/Reactions.tsx

```typescript
import { useToolbar } from '@react-aria/toolbar';
import type { IMessage } from '@rocket.chat/core-typings';
import { MessageReactions, MessageReactionAction } from '@rocket.chat/fuselage';
import { useButtonPattern } from '@rocket.chat/fuselage-hooks';
import type { HTMLAttributes } from 'react';
import { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { MessageListContext, useOpenEmojiPicker, useUserHasReacted } from '../list/MessageListContext';
import Reaction from './reactions/Reaction';
import { useToggleReactionMutation } from './reactions/useToggleReactionMutation';

export type ReactionsProps = {
	message: IMessage;
} & HTMLAttributes<HTMLDivElement>;

const Reactions = ({ message, ...props }: ReactionsProps) => {
    /* Implementation Hidden */
};

export default Reactions;

```