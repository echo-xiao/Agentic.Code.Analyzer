## File: apps/meteor/client/views/admin/integrations/IntegrationRow.tsx

```typescript
import type { IIntegration, Serialized } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';

import { useFormatDateAndTime } from '../../../hooks/useFormatDateAndTime';

export type IntegrationRowProps = {
	integration: Serialized<IIntegration>;
	isMobile: boolean;
	onClick: (_id: string, type: string) => () => void;
};

const IntegrationRow = ({ integration, onClick, isMobile }: IntegrationRowProps) => {
    /* Implementation Hidden */
};

export default IntegrationRow;

```