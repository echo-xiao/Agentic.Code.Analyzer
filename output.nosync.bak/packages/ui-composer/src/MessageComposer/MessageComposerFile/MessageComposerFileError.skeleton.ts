## File: packages/ui-composer/src/MessageComposer/MessageComposerFile/MessageComposerFileError.tsx

```typescript
import type { AllHTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import MessageComposerFile from './MessageComposerFile';

type MessageComposerFileErrorProps = {
	fileTitle: string;
	fileFormat: string;
	error: Error;
	actionIcon: ReactNode;
	onClick: () => void;
} & AllHTMLAttributes<HTMLButtonElement>;

const MessageComposerFileError = ({ fileTitle, error, actionIcon, onClick, ...props }: MessageComposerFileErrorProps) => {
    /* Implementation Hidden */
};

export default MessageComposerFileError;

```