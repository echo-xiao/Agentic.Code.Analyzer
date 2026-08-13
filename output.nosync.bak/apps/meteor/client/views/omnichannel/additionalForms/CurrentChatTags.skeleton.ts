## File: apps/meteor/client/views/omnichannel/additionalForms/CurrentChatTags.tsx

```typescript
import type { ComponentProps } from 'react';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';
import AutoCompleteTagsMultiple from '../tags/AutoCompleteTagsMultiple';

export type CurrentChatTagsProps = Pick<ComponentProps<typeof AutoCompleteTagsMultiple>, 'id' | 'aria-labelledby'> & {
	value: NonNullable<ComponentProps<typeof AutoCompleteTagsMultiple>['value']>;
	handler: NonNullable<ComponentProps<typeof AutoCompleteTagsMultiple>['onChange']>;
	department?: string;
	viewAll?: boolean;
};

const CurrentChatTags = ({ value, handler, department, viewAll, ...props }: CurrentChatTagsProps) => {
    /* Implementation Hidden */
};

export default CurrentChatTags;

```