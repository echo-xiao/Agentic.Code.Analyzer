## File: apps/meteor/client/views/omnichannel/components/OmnichannelVerificationTag.tsx

```typescript
import { Icon, Tag } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

export type OmnichannelVerificationTagProps = {
	verified?: boolean;
	onClick?: () => void;
};

const OmnichannelVerificationTag = ({ verified, onClick }: OmnichannelVerificationTagProps) => {
    /* Implementation Hidden */
};

export default OmnichannelVerificationTag;

```