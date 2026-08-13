## File: apps/meteor/client/views/omnichannel/slaPolicies/RemoveSlaButton.tsx

```typescript
import { IconButton } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericModal, GenericTableCell } from '@rocket.chat/ui-client';
import { useRoute, useEndpoint, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

const RemoveSlaButton = ({ _id, reload }: { _id: string; reload: () => void }) => {
    /* Implementation Hidden */
};

export default RemoveSlaButton;

```