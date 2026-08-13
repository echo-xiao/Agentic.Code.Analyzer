## File: packages/ui-voip/src/views/MediaCallPopoutWindow.tsx

```typescript
import { Box, OwnerDocument as FuselageOwnerDocument } from '@rocket.chat/fuselage';
import { OwnerDocument as StyledOwnerDocument } from '@rocket.chat/styled';
import { ModalProvider, ModalRegion, TooltipProvider, useUserDisplayName } from '@rocket.chat/ui-client';
import { useUser, useUserAvatarPath } from '@rocket.chat/ui-contexts';
import { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import MediaCallPopoutView from './MediaCallPopoutView';
import type { PopoutContainer } from './usePopoutWindow';
import MediaCallViewProvider from '../providers/MediaCallViewProvider';

type MediaCallPopoutWindowProps = {
	container: PopoutContainer;
	onClosePopout: () => void;
};
const MediaCallPopoutWindow = ({ container, onClosePopout }: MediaCallPopoutWindowProps) => {
    /* Implementation Hidden */
};

export default MediaCallPopoutWindow;

```