## File: packages/ui-client/src/components/GenericTable/GenericTableCell.tsx

```typescript
import { TableCell } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

type GenericTableCellProps = ComponentPropsWithoutRef<typeof TableCell>;

export const GenericTableCell = (props: GenericTableCellProps) => <TableCell {...props} />;

```