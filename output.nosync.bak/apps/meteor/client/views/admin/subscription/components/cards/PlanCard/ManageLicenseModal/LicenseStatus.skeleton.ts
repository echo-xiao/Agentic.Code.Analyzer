## File: apps/meteor/client/views/admin/subscription/components/cards/PlanCard/ManageLicenseModal/LicenseStatus.tsx

```typescript
import { Callout, Skeleton } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

type LicenseStatusProps = {
	isValidating: boolean;
	isValid: boolean;
	invalidMessage: string;
};

const LicenseStatus = ({ isValidating, isValid, invalidMessage }: LicenseStatusProps) => {
    /* Implementation Hidden */
};

export default LicenseStatus;

```