## File: apps/meteor/client/components/message/MessageCollapsible.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';

import AttachmentDownload from './content/attachments/structure/AttachmentDownload';
import AttachmentSize from './content/attachments/structure/AttachmentSize';
import CollapsibleContent from './content/collapsible/CollapsibleContent';
import { useCollapse } from './hooks/useCollapse';

export type MessageCollapsibleProps = {
	children?: ReactNode;
	title?: string;
	hasDownload?: boolean;
	link?: string;
	size?: number;
	isCollapsed?: boolean;
};

const MessageCollapsible = ({ children, title, hasDownload, link, size, isCollapsed }: MessageCollapsibleProps) => {
    /* Implementation Hidden */
};

export default MessageCollapsible;

```