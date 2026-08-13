## File: apps/meteor/client/views/marketplace/components/CategoryFilter/TagList.tsx

```typescript
import { Chip, ButtonGroup } from '@rocket.chat/fuselage';

import type { CategoryDropdownItem, CategoryDropDownListProps } from '../../definitions/CategoryDropdownDefinitions';

export type TagListProps = {
	categories: (CategoryDropdownItem & { checked: true })[];
	onClick: CategoryDropDownListProps['onSelected'];
};

const TagList = ({ categories, onClick }: TagListProps) => {
    /* Implementation Hidden */
};

export default TagList;

```