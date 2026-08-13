## File: packages/ui-client/src/components/GenericTable/GenericTableBody.tsx

```typescript
import { TableBody } from '@rocket.chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

type GenericTableBodyProps = ComponentPropsWithoutRef<typeof TableBody>;

export const GenericTableBody = (props: GenericTableBodyProps) => <TableBody {...props} />;

```