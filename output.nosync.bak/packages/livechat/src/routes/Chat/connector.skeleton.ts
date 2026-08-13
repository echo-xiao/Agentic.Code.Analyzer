## File: packages/livechat/src/routes/Chat/connector.tsx

```typescript
import type { TFunction } from 'i18next';
import type { Ref } from 'preact';
import { useContext } from 'preact/hooks';
import { withTranslation } from 'react-i18next';

import { ChatContainer } from '.';
import { ScreenContext } from '../../components/Screen/ScreenProvider';
import { canRenderMessage } from '../../helpers/canRenderMessage';
import { formatAgent } from '../../helpers/formatAgent';
import { StoreContext } from '../../store';

type ChatConnectorProps = {
	path: string;
	default: boolean;
	t: TFunction;
	ref?: Ref<any>;
};

export const ChatConnector = ({ ref, t }: ChatConnectorProps) => {
    /* Implementation Hidden */
};

export default withTranslation()(ChatConnector);

```