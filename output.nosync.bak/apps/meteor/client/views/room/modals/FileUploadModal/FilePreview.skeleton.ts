## File: apps/meteor/client/views/room/modals/FileUploadModal/FilePreview.tsx

```typescript
import GenericPreview from './GenericPreview';
import MediaPreview from './MediaPreview';
import { MAX_FILE_SIZE_PREVIEW } from '../../../../lib/constants';
import { isIE11 } from '../../../../lib/utils/isIE11';

export enum FilePreviewType {
	IMAGE = 'image',
	AUDIO = 'audio',
	VIDEO = 'video',
}

const getFileType = (fileType: File['type']): FilePreviewType | undefined => {
    /* Implementation Hidden */
};

const shouldShowMediaPreview = (file: File, fileType: FilePreviewType | undefined): boolean => {
    /* Implementation Hidden */
};

export type FilePreviewProps = {
	file: File;
	altText?: string;
};

const FilePreview = ({ file, altText }: FilePreviewProps) => {
    /* Implementation Hidden */
};

export default FilePreview;

```