## File: apps/meteor/client/views/room/body/UnreadMessagesIndicator.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Bubble } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

type UnreadMessagesIndicatorProps = {
	count: number;
	onJumpButtonClick: () => void;
	onMarkAsReadButtonClick: () => void;
};

const indicatorStyle = css`
	position: relative;
	display: flex;
	justify-content: center;
	z-index: 3;
`;

const UnreadMessagesIndicator = ({ count, onJumpButtonClick, onMarkAsReadButtonClick }: UnreadMessagesIndicatorProps) => {
    /* Implementation Hidden */
};

export default UnreadMessagesIndicator;

```