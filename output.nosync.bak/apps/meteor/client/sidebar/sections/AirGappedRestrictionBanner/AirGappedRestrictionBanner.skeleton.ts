## File: apps/meteor/client/sidebar/sections/AirGappedRestrictionBanner/AirGappedRestrictionBanner.tsx

```typescript
import { SidebarV2Banner } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import AirGappedRestrictionWarning from './AirGappedRestrictionWarning';
import { links } from '../../../lib/links';

export type AirGappedRestrictionSectionProps = { isRestricted: boolean; remainingDays: number };

const AirGappedRestrictionSection = ({ isRestricted, remainingDays }: AirGappedRestrictionSectionProps) => {
    /* Implementation Hidden */
};

export default AirGappedRestrictionSection;

```