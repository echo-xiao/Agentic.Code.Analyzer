## File: apps/meteor/client/views/room/composer/messageBox/MessageComposerFileItem.tsx

```typescript
import MessageComposerGenericFile from './MessageComposerGenericFile';
import MessageComposerImageFileItem from './MessageComposerImageFile';
import type { Upload } from '../../../../lib/chats/Upload';
import { MAX_FILE_SIZE_PREVIEW } from '../../../../lib/constants';
import { isPreviewableImage } from '../../../../lib/utils/isPreviewableImage';

export type MessageComposerFileItemProps = {
	upload: Upload;
	onRemove: (id: string) => void;
	onEdit: (id: Upload['id'], fileName: string, altText?: string) => void;
	onCancel: (id: Upload['id']) => void;
	disabled: boolean;
	shouldPreview?: boolean;
	previewUrl?: string;
};

const MessageComposerFileItem = (props: MessageComposerFileItemProps) => {
    /* Implementation Hidden */
};

export default MessageComposerFileItem;

```