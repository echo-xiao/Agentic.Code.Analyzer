## File: apps/meteor/client/components/message/content/attachments/DefaultAttachment.tsx

```typescript
import type { MarkdownFields, MessageAttachmentDefault } from '@rocket.chat/core-typings';
import { isActionAttachment } from '@rocket.chat/core-typings';
import type { ReactNode, ComponentProps } from 'react';

import { ActionAttachment } from './default/ActionAttachtment';
import FieldsAttachment from './default/FieldsAttachment';
import AttachmentAuthor from './structure/AttachmentAuthor';
import AttachmentAuthorAvatar from './structure/AttachmentAuthorAvatar';
import AttachmentAuthorName from './structure/AttachmentAuthorName';
import AttachmentBlock from './structure/AttachmentBlock';
import AttachmentContent from './structure/AttachmentContent';
import AttachmentImage from './structure/AttachmentImage';
import AttachmentRow from './structure/AttachmentRow';
import AttachmentText from './structure/AttachmentText';
import AttachmentThumb from './structure/AttachmentThumb';
import AttachmentTitle from './structure/AttachmentTitle';
import MarkdownText from '../../../MarkdownText';
import { useCollapse } from '../../hooks/useCollapse';
import CollapsibleContent from '../collapsible/CollapsibleContent';

const applyMarkdownIfRequires = (
	list: MessageAttachmentDefault['mrkdwn_in'] = ['text', 'pretext'],
	key: MarkdownFields,
	text: string,
	variant: ComponentProps<typeof MarkdownText>['variant'] = 'inline',
): ReactNode => (list?.includes(key) ? <MarkdownText parseEmoji variant={variant} content={text} /> : text);

export type DefaultAttachmentProps = MessageAttachmentDefault;

const DefaultAttachment = (attachment: DefaultAttachmentProps) => {
    /* Implementation Hidden */
};

export default DefaultAttachment;

```