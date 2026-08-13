## File: apps/uikit-playground/src/Components/CreateNewScreen/ScreenThumbnail.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useToastBarDispatch } from '@rocket.chat/fuselage-toastbar';
import type { ChangeEvent, MouseEvent } from 'react';
import { useContext, useState } from 'react';

import { context, renameScreenAction } from '../../Context';
import { activeScreenAction } from '../../Context/action/activeScreenAction';
import { deleteScreenAction } from '../../Context/action/deleteScreenAction';
import { duplicateScreenAction } from '../../Context/action/duplicateScreenAction';
import type { ScreenType } from '../../Context/initialState';
import renderPayload from '../RenderPayload/RenderPayload';
import EditMenu from '../ScreenThumbnail/EditMenu/EditMenu';
import ScreenThumbnailWrapper from '../ScreenThumbnail/ScreenThumbnailWrapper';
import Thumbnail from '../ScreenThumbnail/Thumbnail';

const ScreenThumbnail = ({ screen, disableDelete }: { screen: ScreenType; disableDelete: boolean }) => {
    /* Implementation Hidden */
};

export default ScreenThumbnail;

```