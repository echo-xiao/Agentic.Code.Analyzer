## File: packages/ui-client/src/components/MultiSelectCustom/MultiSelectCustomList.tsx

```typescript
import { Box, CheckBox, Icon, Option, OptionIcon, SearchInput, Tile } from '@rocket.chat/fuselage';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { Fragment, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { OptionProp } from './MultiSelectCustom';
import { useFilteredOptions } from './useFilteredOptions';

const getIconColor = (color: 'default' | 'danger' | 'warning' | undefined) => {
    /* Implementation Hidden */
};

const MultiSelectCustomList = ({
	options,
	onSelected,
	searchBarText,
}: {
	options: OptionProp[];
	onSelected: (item: OptionProp, e?: ChangeEvent<HTMLElement>) => void;
	searchBarText?: string;
}) => {
    /* Implementation Hidden */
};

export default MultiSelectCustomList;

```