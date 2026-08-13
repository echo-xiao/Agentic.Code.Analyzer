## File: apps/meteor/client/components/message/content/attachments/default/ShortField.tsx

```typescript
import type { ComponentPropsWithoutRef } from 'react';

import Field from './Field';

export type ShortFieldProps = ComponentPropsWithoutRef<typeof Field>;

const ShortField = (props: ShortFieldProps) => <Field {...props} flexGrow={1} width='50%' flexBasis={1} />;

export default ShortField;

```