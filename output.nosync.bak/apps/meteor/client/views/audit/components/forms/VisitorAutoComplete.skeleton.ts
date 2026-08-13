## File: apps/meteor/client/views/audit/components/forms/VisitorAutoComplete.tsx

```typescript
import { AutoComplete, Option } from '@rocket.chat/fuselage';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ComponentProps } from 'react';
import { memo, useMemo, useState } from 'react';

export type VisitorAutoCompleteProps = Omit<ComponentProps<typeof AutoComplete>, 'filter'>;

const VisitorAutoComplete = ({ value, onChange, ...props }: VisitorAutoCompleteProps) => {
    /* Implementation Hidden */
};

export default memo(VisitorAutoComplete);

```