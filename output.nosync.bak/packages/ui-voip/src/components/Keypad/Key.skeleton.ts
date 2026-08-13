## File: packages/ui-voip/src/components/Keypad/Key.tsx

```typescript
import { useLongPress, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { css } from '@rocket.chat/css-in-js';
import { Box, Button } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

type KeyProps = {
	primaryKey: string;
	alternativeKey?: string;
	longPressKey?: string;
	onLongKeyPress: (digit: string) => void;
	onKeyPress: (digit: string) => void;
	large?: boolean;
};

const dialPadButtonClass = css`
	> .rcx-button--content {
		display: flex;
		flex-direction: column;
	}
`;

const Key = ({ primaryKey, alternativeKey, longPressKey, onLongKeyPress, onKeyPress, large }: KeyProps) => {
    /* Implementation Hidden */
};

export default Key;

```