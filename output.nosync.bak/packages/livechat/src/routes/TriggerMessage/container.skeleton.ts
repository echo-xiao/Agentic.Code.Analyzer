## File: packages/livechat/src/routes/TriggerMessage/container.tsx

```typescript
import type { Ref } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

import TriggerMessage from './component';
import { ScreenContext } from '../../components/Screen/ScreenProvider';
import { canRenderMessage } from '../../helpers/canRenderMessage';
import { formatAgent } from '../../helpers/formatAgent';
import { parentCall } from '../../lib/parentCall';
import { StoreContext } from '../../store';

type TriggerMessageContainerProps = {
	path: string;
	ref?: Ref<any>;
};

export const TriggerMessageContainer = ({ ref }: TriggerMessageContainerProps) => {
    /* Implementation Hidden */
};

export default TriggerMessageContainer;

```