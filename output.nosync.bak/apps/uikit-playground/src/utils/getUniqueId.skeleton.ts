## File: apps/uikit-playground/src/utils/getUniqueId.ts

```typescript
import { v4 as uuidv4 } from 'uuid';

const getUniqueId = () => uuidv4().slice(0, 8);

export default getUniqueId;

```