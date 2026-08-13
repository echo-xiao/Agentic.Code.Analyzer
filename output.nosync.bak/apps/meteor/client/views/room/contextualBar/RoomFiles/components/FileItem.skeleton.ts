## File: apps/meteor/client/views/room/contextualBar/RoomFiles/components/FileItem.tsx

```typescript
import type { IRoom, IUpload, IUploadWithUser } from '@rocket.chat/core-typings';
import { Box } from '@rocket.chat/fuselage';
import { FilePreviewIcon } from '@rocket.chat/ui-client';

import FileItemMenu from './FileItemMenu';
import ImageItem from './ImageItem';
import { getFileExtension } from '../../../../../../lib/utils/getFileExtension';
import { normalizeUsername } from '../../../../../../lib/utils/normalizeUsername';
import { useDownloadFromServiceWorker } from '../../../../../hooks/useDownloadFromServiceWorker';
import { useFormatDateAndTime } from '../../../../../hooks/useFormatDateAndTime';
import { isPreviewableImage } from '../../../../../lib/utils/isPreviewableImage';

type FileItemProps = {
	rid: IRoom['_id'];
	fileData: IUploadWithUser;
	onClickDelete: (id: IUpload['_id']) => void;
};

const FileItem = ({ rid, fileData, onClickDelete }: FileItemProps) => {
    /* Implementation Hidden */
};

export default FileItem;

```