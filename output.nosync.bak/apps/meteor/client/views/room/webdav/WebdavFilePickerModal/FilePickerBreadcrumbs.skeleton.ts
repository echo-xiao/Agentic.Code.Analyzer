## File: apps/meteor/client/views/room/webdav/WebdavFilePickerModal/FilePickerBreadcrumbs.tsx

```typescript
import { Box, Icon, IconButton, Tag } from '@rocket.chat/fuselage';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

type FilePickerBreadcrumbsProps = {
	parentFolders: string[];
	handleBreadcrumb: (e: MouseEvent<HTMLElement>) => void;
	handleBack: () => void;
};

const FilePickerBreadcrumbs = ({ parentFolders, handleBreadcrumb, handleBack }: FilePickerBreadcrumbsProps) => {
    /* Implementation Hidden */
};

export default FilePickerBreadcrumbs;

```