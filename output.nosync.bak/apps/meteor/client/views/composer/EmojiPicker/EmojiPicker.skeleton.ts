## File: apps/meteor/client/views/composer/EmojiPicker/EmojiPicker.tsx

```typescript
import { TextInput, Icon, Button, Divider } from '@rocket.chat/fuselage';
import { useMediaQuery, useMergedRefs, useOutsideClick } from '@rocket.chat/fuselage-hooks';
import {
	EmojiPickerCategoryHeader,
	EmojiPickerContainer,
	EmojiPickerFooter,
	EmojiPickerPreviewArea,
	EmojiPickerHeader,
	EmojiPickerListArea,
	EmojiPickerPreview,
} from '@rocket.chat/ui-client';
import { useTranslation, usePermission, useRoute } from '@rocket.chat/ui-contexts';
import type { ChangeEvent, KeyboardEvent, MouseEvent, RefObject } from 'react';
import { useLayoutEffect, useState, useEffect, useRef } from 'react';
import type { ListRange, VirtuosoHandle } from 'react-virtuoso';

import CategoriesResult from './CategoriesResult';
import EmojiPickerCategoryItem from './EmojiPickerCategoryItem';
import EmojiPickerDropdown from './EmojiPickerDropDown';
import SearchingResult from './SearchingResult';
import ToneSelector from './ToneSelector';
import ToneSelectorWrapper from './ToneSelector/ToneSelectorWrapper';
import { emoji, getCategoriesList, getEmojisBySearchTerm } from '../../../../app/emoji/client';
import type { EmojiItem } from '../../../../app/emoji/client';
import { usePreviewEmoji, useEmojiPickerData } from '../../../contexts/EmojiPickerContext';
import { useIsVisible } from '../../room/hooks/useIsVisible';

export type EmojiPickerProps = {
	reference: Element;
	onClose: () => void;
	onPickEmoji: (emoji: string) => void;
};

const EmojiPicker = ({ reference, onClose, onPickEmoji }: EmojiPickerProps) => {
    /* Implementation Hidden */
};

export default EmojiPicker;

```