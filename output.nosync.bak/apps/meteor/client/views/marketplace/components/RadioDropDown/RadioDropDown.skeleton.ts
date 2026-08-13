## File: apps/meteor/client/views/marketplace/components/RadioDropDown/RadioDropDown.tsx

```typescript
import type { Button } from '@rocket.chat/fuselage';
import { useToggle } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { useCallback, useRef } from 'react';

import RadioDropDownAnchor from './RadioDownAnchor';
import type { RadioDropDownProps } from '../../definitions/RadioDropDownDefinitions';
import { isValidReference } from '../../helpers/isValidReference';
import { onMouseEventPreventSideEffects } from '../../helpers/onMouseEventPreventSideEffects';
import DropDownListWrapper from '../DropDownListWrapper';
import RadioButtonList from '../RadioButtonList';

const RadioDropDown = ({ group, onSelected, ...props }: RadioDropDownProps & ComponentProps<typeof Button>) => {
    /* Implementation Hidden */
};

export default RadioDropDown;

```