## File: apps/meteor/client/views/room/body/UploadProgress/UploadProgressIndicator.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Box, Bubble } from '@rocket.chat/fuselage';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { Upload } from '../../../../lib/chats/Upload';

type UploadProgressIndicatorProps = {
	uploads: readonly Upload[];
};

const UploadProgressIndicator = ({ uploads }: UploadProgressIndicatorProps) => {
    /* Implementation Hidden */
};

export default UploadProgressIndicator;

```