## File: apps/meteor/client/views/admin/workspace/VersionCard/components/VersionTag.tsx

```typescript
import { Tag } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

export type VersionStatus = 'outdated' | 'latest' | 'available_version' | undefined;

export type VersionTagProps = {
	versionStatus: VersionStatus;
	title?: string;
};

export const VersionTag = ({ versionStatus, title }: VersionTagProps) => {
    /* Implementation Hidden */
};

```