## File: apps/meteor/app/file-upload/server/index.ts

```typescript
import '../lib/FileUploadBase';
import { FileUpload } from './lib/FileUpload';
import './lib/requests';
import './config/_configUploadStorage';
import './methods/sendFileMessage';
import './methods/getS3FileUrl';

export { FileUpload };

```