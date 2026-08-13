## File: apps/meteor/client/providers/EmojiPickerProvider/EmojiPickerProvider.tsx

```typescript
import { useDebouncedState, useStableCallback, useLocalStorage } from '@rocket.chat/fuselage-hooks';
import type { ReactNode, ContextType } from 'react';
import { useState, useCallback, useMemo, useSyncExternalStore } from 'react';

import { useUpdateCustomEmoji } from './useUpdateCustomEmoji';
import { emoji, getFrequentEmoji, createEmojiListByCategorySubscription } from '../../../app/emoji/client';
import { EmojiPickerContext } from '../../contexts/EmojiPickerContext';
import EmojiPicker from '../../views/composer/EmojiPicker';

const DEFAULT_ITEMS_LIMIT = 90;

// limit recent emojis to 27 (3 rows of 9)
const RECENT_EMOJIS_LIMIT = 27;

export type EmojiPickerProviderProps = { children: ReactNode };

const EmojiPickerProvider = ({ children }: EmojiPickerProviderProps) => {
    /* Implementation Hidden */
};

export default EmojiPickerProvider;

```