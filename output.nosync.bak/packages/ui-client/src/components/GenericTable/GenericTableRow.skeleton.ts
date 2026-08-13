## File: packages/ui-client/src/components/GenericTable/GenericTableRow.tsx

```typescript
import { TableRow } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

type GenericTableRowProps = ComponentPropsWithoutRef<typeof TableRow>;

export const GenericTableRow = (props: GenericTableRowProps) => <TableRow {...props} />;

```