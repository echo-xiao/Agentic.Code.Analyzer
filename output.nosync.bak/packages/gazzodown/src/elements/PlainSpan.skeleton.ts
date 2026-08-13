## File: packages/gazzodown/src/elements/PlainSpan.tsx

```typescript
import { Fragment, memo, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { MarkupInteractionContext } from '../MarkupInteractionContext';

export type PlainSpanProps = {
	text: string;
};

const PlainSpan = ({ text }: PlainSpanProps) => {
    /* Implementation Hidden */
};

export default memo(PlainSpan);

```