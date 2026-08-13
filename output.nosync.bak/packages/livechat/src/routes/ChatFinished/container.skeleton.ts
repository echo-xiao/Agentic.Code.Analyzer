## File: packages/livechat/src/routes/ChatFinished/container.tsx

```typescript
import type { TFunction } from 'i18next';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { withTranslation } from 'react-i18next';

import ChatFinished from './component';
import { StoreContext } from '../../store';

type ChatFinishedContainerProps = {
	ref?: any;
	t: TFunction;
	path: string;
};

const ChatFinishedContainer = ({ ref, t }: ChatFinishedContainerProps) => {
    /* Implementation Hidden */
};

export default withTranslation()(ChatFinishedContainer);

```