## File: packages/livechat/src/components/Screen/ChatButton.tsx

```typescript
import ChatIcon from '../../icons/chat.svg';
import CloseIcon from '../../icons/close.svg';
import { Button } from '../Button';

type ChatButtonProps = {
	text: string;
	minimized: boolean;
	badge: number | undefined;
	onClick: () => void;
	triggered?: boolean;
	className?: string;
	logoUrl?: string;
};

export const ChatButton = ({ text, minimized, badge, onClick, triggered = false, className, logoUrl }: ChatButtonProps) => {
    /* Implementation Hidden */
};

```