## File: apps/meteor/client/views/room/composer/ComposerBoxPopup.tsx

```typescript
import { Box, Option, OptionSkeleton, Tile } from '@rocket.chat/fuselage';
import { useContentBoxSize } from '@rocket.chat/fuselage-hooks';
import { CustomScrollbars } from '@rocket.chat/ui-client';
import type { UseQueryResult } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useEffect, memo, useMemo, useRef, useId } from 'react';
import { useTranslation } from 'react-i18next';

export type ComposerBoxPopupProps<
	T extends {
		_id: string;
		sort?: number;
		disabled?: boolean;
	},
> = {
	title?: string;
	focused?: T;
	items: UseQueryResult<T[]>[];
	select: (item: T) => void;
	renderItem?: ({ item }: { item: T }) => ReactNode;
};

function ComposerBoxPopup<
	T extends {
		_id: string;
		sort?: number;
		disabled?: boolean;
	},
>({ title, items, focused, select, renderItem = ({ item }: { item: T }) => <>{JSON.stringify(item)}</> }: ComposerBoxPopupProps<T>) {
    /* Implementation Hidden */
}

export default memo(ComposerBoxPopup);

```