## File: apps/meteor/server/ufs/index.ts

```typescript
import { UploadFS as UFS } from './ufs';
import './ufs-methods';
import './ufs-server';
import './ufs-gridfs';
import './ufs-local';

export const UploadFS = UFS;

```