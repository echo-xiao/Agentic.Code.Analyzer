## File: apps/meteor/app/utils/lib/mimeTypes.ts

```typescript
import mime from 'mime-type/with-db';

mime.types.wav = 'audio/wav';
mime.types.lst = 'text/plain';
mime.define('image/vnd.microsoft.icon', { source: '', extensions: ['ico'] }, mime.dupAppend);
mime.define('image/x-icon', { source: '', extensions: ['ico'] }, mime.dupOverwrite);
mime.define('audio/aac', { source: '', extensions: ['aac'] }, mime.dupOverwrite);

const getExtension = (param: string): string => {
    /* Implementation Hidden */
};

const getMimeTypeFromFileName = (fileName: string): string => {
    /* Implementation Hidden */
};

const getMimeType = (mimetype: string, fileName: string): string => {
    /* Implementation Hidden */
};

export { mime, getExtension, getMimeType, getMimeTypeFromFileName };

```