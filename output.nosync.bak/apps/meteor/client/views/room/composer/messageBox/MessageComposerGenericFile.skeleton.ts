## File: apps/meteor/client/views/room/composer/messageBox/MessageComposerGenericFile.tsx

```typescript
import { IconButton } from '@rocket.chat/fuselage';
import { useButtonPattern } from '@rocket.chat/fuselage-hooks';
import { MessageComposerFile, MessageComposerFileError, MessageComposerFileLoader } from '@rocket.chat/ui-composer';
import { useSetModal } from '@rocket.chat/ui-contexts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { MessageComposerFileItemProps } from './MessageComposerFileItem';
import { getMimeType } from '../../../../../app/utils/lib/mimeTypes';
import { getFileExtension } from '../../../../../lib/utils/getFileExtension';
import { usePreventPropagation } from '../../../../hooks/usePreventPropagation';
import { formatBytes } from '../../../../lib/utils/formatBytes';
import { useChat } from '../../contexts/ChatContext';
import FileUploadModal from '../../modals/FileUploadModal';

const MessageComposerGenericFile = ({
	upload,
	onRemove,
	onEdit,
	onCancel,
	shouldPreview,
	previewUrl,
	disabled,
	...props
}: MessageComposerFileItemProps) => {
    /* Implementation Hidden */
};

export default MessageComposerGenericFile;

```