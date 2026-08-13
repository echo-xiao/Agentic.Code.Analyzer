## File: apps/uikit-playground/src/Components/HomeContainer/ProjectsList/ProjectsThumbnail.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
import { useToastBarDispatch } from '@rocket.chat/fuselage-toastbar';
import { type ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { activeProjectAction, context, renameProjectAction } from '../../../Context';
import { deleteProjectAction } from '../../../Context/action/deleteProjectAction';
import type { ILayoutBlock } from '../../../Context/initialState';
import routes from '../../../Routes/Routes';
import { formatDate } from '../../../utils/formatDate';
import RenderPayload from '../../RenderPayload/RenderPayload';
import EditMenu from '../../ScreenThumbnail/EditMenu';
import EditableLabel from '../../ScreenThumbnail/EditableLabel/EditableLabel';
import ScreenThumbnailWrapper from '../../ScreenThumbnail/ScreenThumbnailWrapper';
import Thumbnail from '../../ScreenThumbnail/Thumbnail';

const ProjectsThumbnail = ({ id, name: _name, date, blocks }: { id: string; name: string; date: string; blocks: ILayoutBlock[] }) => {
    /* Implementation Hidden */
};

export default ProjectsThumbnail;

```