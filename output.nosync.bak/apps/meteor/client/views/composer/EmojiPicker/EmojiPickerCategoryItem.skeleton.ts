## File: apps/meteor/client/views/composer/EmojiPicker/EmojiPickerCategoryItem.tsx

```typescript
import { IconButton } from '@rocket.chat/fuselage';
import type { AllHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import type { EmojiCategory } from '../../../../app/emoji/client';

export type EmojiPickerCategoryItemProps = {
	category: EmojiCategory;
	active: boolean;
	handleGoToCategory: () => void;
} & Omit<AllHTMLAttributes<HTMLButtonElement>, 'is'>;

const mapCategoryIcon = (category: string) => {
    /* Implementation Hidden */
};

const EmojiPickerCategoryItem = ({ category, active, handleGoToCategory, ...props }: EmojiPickerCategoryItemProps) => {
    /* Implementation Hidden */
};

export default EmojiPickerCategoryItem;

```