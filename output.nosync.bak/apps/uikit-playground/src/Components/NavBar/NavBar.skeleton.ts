## File: apps/uikit-playground/src/Components/NavBar/NavBar.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Tile, FlexContainer, ButtonGroup, Button, Icon } from '@rocket.chat/fuselage';
import { useToastBarDispatch } from '@rocket.chat/fuselage-toastbar';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import RightNavBtn from './RightNavBtn';
import { context, updatePayloadAction } from '../../Context';
import { openCreateNewScreenAction } from '../../Context/action/openCreateNewScreenAction';
import routes from '../../Routes/Routes';

const NabBar = () => {
    /* Implementation Hidden */
};

export default NabBar;

```