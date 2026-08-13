## File: apps/meteor/client/views/omnichannel/triggers/TriggersRow.tsx

```typescript
import type { ILivechatTrigger } from '@rocket.chat/core-typings';
import { IconButton } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal, GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useRoute, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import type { KeyboardEvent, MouseEvent } from 'react';
import { memo } from 'react';

type TriggersRowProps = Pick<ILivechatTrigger, '_id' | 'name' | 'description' | 'enabled'> & { reload: () => void };

const TriggersRow = ({ _id, name, description, enabled, reload }: TriggersRowProps) => {
    /* Implementation Hidden */
};

export default memo(TriggersRow);

```