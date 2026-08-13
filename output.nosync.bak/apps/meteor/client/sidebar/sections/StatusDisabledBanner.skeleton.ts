## File: apps/meteor/client/sidebar/sections/StatusDisabledBanner.tsx

```typescript
import { SidebarV2Banner } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { useStatusDisabledModal } from '../../views/admin/customUserStatus/hooks/useStatusDisabledModal';

export type StatusDisabledSectionProps = { onDismiss: () => void };

const StatusDisabledSection = ({ onDismiss }: StatusDisabledSectionProps) => {
    /* Implementation Hidden */
};

export default StatusDisabledSection;

```