## File: packages/gazzodown/src/mentions/UserMentionElement.tsx

```typescript
import { MessageHighlight } from '@rocket.chat/fuselage';
import { useButtonPattern } from '@rocket.chat/fuselage-hooks';
import { memo, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { MarkupInteractionContext } from '../MarkupInteractionContext';

export type UserMentionElementProps = {
	mention: string;
};

const handleUserMention = (mention: string | undefined, withSymbol: boolean | undefined): string | undefined =>
	withSymbol ? `@${mention}` : mention;

const UserMentionElement = ({ mention }: UserMentionElementProps) => {
    /* Implementation Hidden */
};

export default memo(UserMentionElement);

```