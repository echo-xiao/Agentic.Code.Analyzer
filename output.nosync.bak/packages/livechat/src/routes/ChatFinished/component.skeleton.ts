## File: packages/livechat/src/routes/ChatFinished/component.tsx

```typescript
import { withTranslation } from 'react-i18next';

import styles from './styles.scss';
import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import { Screen, ScreenContent, ScreenFooter } from '../../components/Screen';
import { createClassName } from '../../helpers/createClassName';
import Triggers from '../../lib/triggers';

type ChatFinishedProps = {
	title: string;
	greeting?: string;
	message?: string;
	onRedirectChat?: () => void;
	t: (s: string) => string;
};

const ChatFinished = ({ title, greeting, message, onRedirectChat, t }: ChatFinishedProps) => {
    /* Implementation Hidden */
};

export default withTranslation()(ChatFinished);

```