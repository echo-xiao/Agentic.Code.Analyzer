## File: apps/meteor/client/views/modal/uikit/UiKitModal.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { UiKitContext } from '@rocket.chat/fuselage-ui-kit';
import { MarkupInteractionContext } from '@rocket.chat/gazzodown';
import type * as UiKit from '@rocket.chat/ui-kit';
import type { FormEvent } from 'react';

import ModalBlock from './ModalBlock';
import { detectEmoji } from '../../../lib/utils/detectEmoji';
import { preventSyntheticEvent } from '../../../lib/utils/preventSyntheticEvent';
import { useModalContextValue } from '../../../uikit/hooks/useModalContextValue';
import { useUiKitActionManager } from '../../../uikit/hooks/useUiKitActionManager';
import { useUiKitView } from '../../../uikit/hooks/useUiKitView';

export type UiKitModalProps = {
	key: UiKit.ModalView['id']; // force re-mount when viewId changes
	initialView: UiKit.ModalView;
};

const UiKitModal = ({ initialView }: UiKitModalProps) => {
    /* Implementation Hidden */
};

export default UiKitModal;

```