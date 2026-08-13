## File: apps/meteor/client/views/room/modals/ReactionListModal/Reactions.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { useSetting } from '@rocket.chat/ui-contexts';

import ReactionUserTag from './ReactionUserTag';
import Emoji from '../../../../components/Emoji';

export type ReactionsProps = { reactions: Required<IMessage>['reactions'] };

const Reactions = ({ reactions }: ReactionsProps) => {
    /* Implementation Hidden */
};

export default Reactions;

```