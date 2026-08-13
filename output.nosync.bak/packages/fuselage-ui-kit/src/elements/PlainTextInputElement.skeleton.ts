## File: packages/fuselage-ui-kit/src/elements/PlainTextInputElement.tsx

```typescript
import { TextAreaInput, TextInput } from '@rocket.chat/fuselage';
import type * as UiKit from '@rocket.chat/ui-kit';
import { memo } from 'react';

import { useStringFromTextObject } from '../hooks/useStringFromTextObject';
import { useUiKitState } from '../hooks/useUiKitState';
import type { BlockProps } from '../utils/BlockProps';

export type PlainTextInputElementProps = BlockProps<UiKit.PlainTextInputElement>;

const PlainTextInputElement = ({ block, context }: PlainTextInputElementProps) => {
    /* Implementation Hidden */
};

export default memo(PlainTextInputElement);

```