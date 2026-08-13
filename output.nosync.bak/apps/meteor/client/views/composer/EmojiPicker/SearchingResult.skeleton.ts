## File: apps/meteor/client/views/composer/EmojiPicker/SearchingResult.tsx

```typescript
import { EmojiPickerNotFound, VirtualizedScrollbars } from '@rocket.chat/ui-client';
import type { MouseEvent } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { VirtuosoGridHandle } from 'react-virtuoso';
import { VirtuosoGrid } from 'react-virtuoso';

import EmojiElement from './EmojiElement';
import SearchingResultWrapper from './SearchingResultWrapper';
import type { EmojiItem } from '../../../../app/emoji/client';

/**
 * the `SearchingResults` is missing the previous loadMore function that was implemented before on the latest version of EmojiPicker using the Blaze Template. It can't be implemented because of the issue with react-virtuoso and the custom scrollbars, since its using virtual list its not gonna be an issue rendering bigger results for search
 *
 */

export type SearchingResultProps = {
	searchResults: EmojiItem[];
	handleSelectEmoji: (event: MouseEvent<HTMLElement>) => void;
};

const SearchingResult = ({ searchResults, handleSelectEmoji }: SearchingResultProps) => {
    /* Implementation Hidden */
};

export default SearchingResult;

```