## File: apps/meteor/client/components/message/content/attachments/QuoteAttachment.tsx

```typescript
import type { MessageQuoteAttachment } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Palette } from '@rocket.chat/fuselage';
import { useUserPreference } from '@rocket.chat/ui-contexts';

import { useTimeAgo } from '../../../../hooks/useTimeAgo';
import MessageContentBody from '../../MessageContentBody';
import Attachments from '../Attachments';
import AttachmentAuthor from './structure/AttachmentAuthor';
import AttachmentAuthorAvatar from './structure/AttachmentAuthorAvatar';
import AttachmentAuthorName from './structure/AttachmentAuthorName';
import AttachmentAuthorTimestamp from './structure/AttachmentAuthorTimestamp';
import AttachmentContent from './structure/AttachmentContent';
import AttachmentDetails from './structure/AttachmentDetails';
import AttachmentInner from './structure/AttachmentInner';
import AttachmentMessageLink from './structure/AttachmentMessageLink';

// TODO: remove this team collaboration
const quoteStyles = css`
	.rcx-attachment__details {
		.rcx-message-body {
			color: ${Palette.text['font-default']};
		}
	}
	&:hover,
	&:focus {
		.rcx-attachment__details {
			background: ${Palette.surface['surface-hover']};
			border-color: ${Palette.stroke['stroke-light']};
			border-inline-start-color: ${Palette.stroke['stroke-medium']};
		}
	}
`;

export type QuoteAttachmentProps = {
	attachment: MessageQuoteAttachment;
};

export const QuoteAttachment = ({ attachment }: QuoteAttachmentProps) => {
    /* Implementation Hidden */
};

```