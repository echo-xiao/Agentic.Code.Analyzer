## File: apps/meteor/client/views/admin/subscription/components/cards/PlanCard/ManageLicenseModal/LicenseFilePreview.tsx

```typescript
import { Box, IconButton } from '@rocket.chat/fuselage';
import { FilePreviewIcon } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { getFileExtension } from '../../../../../../../../lib/utils/getFileExtension';
import { formatBytes } from '../../../../../../../lib/utils/formatBytes';

const LicenseFilePreview = ({ selectedFile, handleRemoveFile }: { selectedFile: File; handleRemoveFile: () => void }) => {
    /* Implementation Hidden */
};

export default LicenseFilePreview;

```