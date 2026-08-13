## File: apps/meteor/client/views/room/contextualBar/uikit/UiKitContextualBar.tsx

```typescript
import { Avatar, Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	UiKitComponent,
	UiKitContextualBar as UiKitContextualBarSurfaceRender,
	contextualBarParser,
	UiKitContext,
} from '@rocket.chat/fuselage-ui-kit';
import {
	ContextualbarHeader,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarDialog,
	ContextualbarScrollableContent,
	ContextualbarFooter,
} from '@rocket.chat/ui-client';
import { useRoomToolbox } from '@rocket.chat/ui-contexts';
import type * as UiKit from '@rocket.chat/ui-kit';
import type { FormEvent, UIEvent } from 'react';
import { memo } from 'react';

import { getURL } from '../../../../../app/utils/client';
import { preventSyntheticEvent } from '../../../../lib/utils/preventSyntheticEvent';
import { useContextualBarContextValue } from '../../../../uikit/hooks/useContextualBarContextValue';
import { useUiKitActionManager } from '../../../../uikit/hooks/useUiKitActionManager';
import { useUiKitView } from '../../../../uikit/hooks/useUiKitView';
import { getButtonStyle } from '../../../modal/uikit/getButtonStyle';
import { useRoom } from '../../contexts/RoomContext';

type UiKitContextualBarProps = {
	key: UiKit.ContextualBarView['id']; // force re-mount when viewId changes
	initialView: UiKit.ContextualBarView;
};

const UiKitContextualBar = ({ initialView }: UiKitContextualBarProps) => {
    /* Implementation Hidden */
};

export default memo(UiKitContextualBar);

```