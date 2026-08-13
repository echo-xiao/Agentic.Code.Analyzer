## File: apps/meteor/client/views/composer/EmojiPicker/EmojiCategoryRow.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box } from '@rocket.chat/fuselage';
import { EmojiPickerLoadMore, EmojiPickerNotFound, EmojiPickerCategoryWrapper } from '@rocket.chat/ui-client';
import { memo, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import EmojiElement from './EmojiElement';
import { isRowDivider, isLoadMore } from '../../../../app/emoji/client';
import type { EmojiPickerItem } from '../../../../app/emoji/client';

export type EmojiCategoryRowProps = {
	customItemsLimit: number;
	handleLoadMore: () => void;
	handleSelectEmoji: (e: MouseEvent<HTMLElement>) => void;
	item: EmojiPickerItem;
};

const EmojiCategoryRow = ({ item, handleLoadMore, handleSelectEmoji }: EmojiCategoryRowProps) => {
    /* Implementation Hidden */
};

export default memo(EmojiCategoryRow);

```