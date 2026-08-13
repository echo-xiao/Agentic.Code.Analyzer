## File: packages/ui-composer/src/MessageComposer/MessageComposerFile/MessageComposerFile.tsx

```typescript
import { css } from '@rocket.chat/css-in-js';
import { Avatar, Box, Palette, Skeleton } from '@rocket.chat/fuselage';
import { useButtonPattern } from '@rocket.chat/fuselage-hooks';
import { FilePreviewIcon } from '@rocket.chat/ui-client';
import type { ReactNode, KeyboardEvent, MouseEvent, AllHTMLAttributes } from 'react';
import { useMemo } from 'react';

type MessageComposerFileProps = {
	fileTitle: string;
	fileSubtitle: string;
	fileFormat: string;
	showPreview?: boolean;
	previewUrl?: string;
	alt?: string;
	actionIcon: ReactNode;
	error?: boolean;
	disabled?: boolean;
	onClick: () => void;
} & Omit<AllHTMLAttributes<HTMLButtonElement>, 'is'>;

const MessageComposerFile = ({
	fileTitle,
	fileSubtitle,
	fileFormat,
	showPreview,
	previewUrl,
	alt = '',
	actionIcon,
	error,
	disabled,
	onClick,
	className,
	...props
}: MessageComposerFileProps) => {
    /* Implementation Hidden */
};

export default MessageComposerFile;

```