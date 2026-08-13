## File: apps/meteor/client/views/room/contextualBar/ExportMessages/useDownloadExportMutation.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useToastMessageDispatch, useUser } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { downloadJsonAs } from '../../../../lib/download';
import { Messages } from '../../../../stores';
import { useRoom } from '../../contexts/RoomContext';

export const useDownloadExportMutation = () => {
    /* Implementation Hidden */
};

```