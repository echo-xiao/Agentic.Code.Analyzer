## File: apps/meteor/client/components/message/content/reactions/Reaction.tsx

```typescript
import { MessageReaction as MessageReactionTemplate, MessageReactionEmoji, MessageReactionCounter } from '@rocket.chat/fuselage';
import { useButtonPattern } from '@rocket.chat/fuselage-hooks';
import { useTooltipClose, useTooltipOpen } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import ReactionTooltip from './ReactionTooltip';
import { normalizeUsername } from '../../../../../lib/utils/normalizeUsername';
import { getEmojiClassNameAndDataTitle } from '../../../../lib/utils/renderEmoji';
import { MessageListContext } from '../../list/MessageListContext';

const normalizeUsernames = (names: string[]) => names.map<string>(normalizeUsername);

// TODO: replace it with proper usage of i18next plurals
export type ReactionProps = {
	hasReacted: (name: string) => boolean;
	counter: number;
	name: string;
	names: string[];
	messageId: string;
	onClick: () => void;
} & ComponentProps<typeof MessageReactionTemplate>;

const Reaction = ({ hasReacted, counter, name, names, messageId, onClick, ...props }: ReactionProps) => {
    /* Implementation Hidden */
};

export default Reaction;

```