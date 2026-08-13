## File: apps/meteor/client/views/admin/integrations/outgoing/history/HistoryItem.tsx

```typescript
import type { IIntegrationHistory, Serialized } from '@rocket.chat/core-typings';
import { Button, Icon, Box, AccordionItem, Field, FieldGroup, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useMethod } from '@rocket.chat/ui-contexts';
import DOMPurify from 'dompurify';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { outgoingEvents } from '../../../../../../app/integrations/lib/outgoingEvents';
import { useFormatDateAndTime } from '../../../../../hooks/useFormatDateAndTime';
import { useHighlightedCode } from '../../../../../hooks/useHighlightedCode';

export type HistoryItemProps = { data: Serialized<IIntegrationHistory> };

const HistoryItem = ({ data }: HistoryItemProps) => {
    /* Implementation Hidden */
};

export default HistoryItem;

```