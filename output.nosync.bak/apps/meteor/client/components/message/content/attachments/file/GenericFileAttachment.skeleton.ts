## File: apps/meteor/client/components/message/content/attachments/file/GenericFileAttachment.tsx

```typescript
import type { MessageAttachmentBase } from '@rocket.chat/core-typings';
import {
	MessageGenericPreview,
	MessageGenericPreviewContent,
	MessageGenericPreviewIcon,
	MessageGenericPreviewTitle,
	MessageGenericPreviewDescription,
} from '@rocket.chat/fuselage';
import { useMediaUrl, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import type { UIEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useOpenEncryptedPdf } from './hooks/useOpenEncryptedPdf';
import { getFileExtension } from '../../../../../../lib/utils/getFileExtension';
import { forAttachmentDownload, registerDownloadForUid } from '../../../../../hooks/useDownloadFromServiceWorker';
import MarkdownText from '../../../../MarkdownText';
import MessageCollapsible from '../../../MessageCollapsible';
import MessageContentBody from '../../../MessageContentBody';
import AttachmentSize from '../structure/AttachmentSize';

const openDocumentViewer = window.RocketChatDesktop?.openDocumentViewer;

export type GenericFileAttachmentProps = MessageAttachmentBase;

const GenericFileAttachment = ({
	title,
	description,
	descriptionMd,
	title_link: link,
	title_link_download: hasDownload,
	size,
	format,
	collapsed,
}: GenericFileAttachmentProps) => {
    /* Implementation Hidden */
};

export default GenericFileAttachment;

```