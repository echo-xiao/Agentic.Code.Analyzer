## File: apps/meteor/client/views/composer/EmojiPicker/EmojiElement.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { IconButton } from '@rocket.chat/fuselage';
import DOMPurify from 'dompurify';
import type { MouseEvent, AllHTMLAttributes } from 'react';
import { memo } from 'react';

import type { EmojiItem } from '../../../../app/emoji/client';
import { usePreviewEmoji } from '../../../contexts/EmojiPickerContext';

export type EmojiElementProps = EmojiItem & { small?: boolean; onClick: (e: MouseEvent<HTMLElement>) => void } & Omit<
		AllHTMLAttributes<HTMLButtonElement>,
		'is'
	>;

const EmojiElement = ({ emoji, image, onClick, small = false, ...props }: EmojiElementProps) => {
    /* Implementation Hidden */
};

export default memo(EmojiElement);

```