## File: apps/meteor/client/views/room/body/JumpToRecentMessageButton.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Bubble } from '@rocket.chat/fuselage';
import { isTruthy } from '@rocket.chat/tools';
import { useState } from 'react';

type JumpToRecentMessageButtonProps = {
	visible: boolean;
	onClick: () => void;
	text: string;
};

const buttonStyle = css`
	position: absolute;
	z-index: 2;
	bottom: 8px;
	left: 50%;
	user-select: none;
	transform: translate(-50%, 0);

	&.not {
		visibility: hidden;
	}

	&.clicked {
		animation: fadeout 1s linear forwards;
	}

	@keyframes fadeout {
		50% {
			visibility: visible;
			transform: translate(-50%, 150%);
		}
		100% {
			visibility: hidden;
			transform: translate(-50%, 150%);
			position: fixed;
		}
	}
`;

const JumpToRecentMessageButton = ({ visible, onClick, text }: JumpToRecentMessageButtonProps) => {
    /* Implementation Hidden */
};

export default JumpToRecentMessageButton;

```