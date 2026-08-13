## File: packages/gazzodown/src/mentions/ChannelMentionElement.tsx

```typescript
import { MessageHighlight } from '@rocket.chat/fuselage';
import { useButtonPattern } from '@rocket.chat/fuselage-hooks';
import { memo, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { MarkupInteractionContext } from '../MarkupInteractionContext';

export type ChannelMentionElementProps = {
	mention: string;
};

const handleChannelMention = (mention: string, withSymbol: boolean | undefined): string => (withSymbol ? `#${mention}` : mention);

const ChannelMentionElement = ({ mention }: ChannelMentionElementProps) => {
    /* Implementation Hidden */
};

export default memo(ChannelMentionElement);

```