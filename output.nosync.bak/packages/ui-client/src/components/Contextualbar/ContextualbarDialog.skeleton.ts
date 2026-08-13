## File: packages/ui-client/src/components/Contextualbar/ContextualbarDialog.tsx

```typescript
import type { AriaDialogProps } from '@react-aria/dialog';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useLayoutSizes, useLayoutContextualBarPosition, useRoomToolbox } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useCallback, useRef } from 'react';

import Contextualbar from './Contextualbar';
import ContextualbarResizable from './ContextualbarResizable';

type ContextualbarDialogProps = AriaDialogProps & ComponentProps<typeof Contextualbar> & { onClose?: () => void };

/**
 * @prop onClose can be used to close contextualbar outside the room context with ESC key
 * */
const ContextualbarDialog = ({ onClose, ...props }: ContextualbarDialogProps) => {
    /* Implementation Hidden */
};

export default ContextualbarDialog;

```