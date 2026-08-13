## File: apps/meteor/client/views/marketplace/components/CategoryFilter/CategoryDropDown.tsx

```typescript
import type { Button } from '@rocket.chat/fuselage';
import { useToggle } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { useRef, useCallback } from 'react';

import CategoryDropDownAnchor from './CategoryDropDownAnchor';
import CategoryDropDownList from './CategoryDropDownList';
import type { CategoryDropdownItem, CategoryDropDownListProps } from '../../definitions/CategoryDropdownDefinitions';
import { isValidReference } from '../../helpers/isValidReference';
import { onMouseEventPreventSideEffects } from '../../helpers/onMouseEventPreventSideEffects';
import DropDownListWrapper from '../DropDownListWrapper';

export type CategoryDropDownProps = {
	categories: CategoryDropDownListProps['categories'];
	onSelected: CategoryDropDownListProps['onSelected'];
	selectedCategories: (CategoryDropdownItem & { checked: true })[];
} & ComponentProps<typeof Button>;

const CategoryDropDown = ({ categories, onSelected, selectedCategories, ...props }: CategoryDropDownProps) => {
    /* Implementation Hidden */
};

export default CategoryDropDown;

```