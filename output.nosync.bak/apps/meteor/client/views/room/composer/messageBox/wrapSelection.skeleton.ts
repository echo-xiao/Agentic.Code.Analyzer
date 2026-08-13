## File: apps/meteor/client/views/room/composer/messageBox/wrapSelection.ts

```typescript
import type { ChatAPI } from '../../../../lib/chats/ChatAPI';

const wrapSelectionPatterns: Record<string, string> = {
	'`': '`{{text}}`',
	'"': '"{{text}}"',
	"'": "'{{text}}'",
	'(': '({{text}})',
	'<': '<{{text}}>',
	'{': '{{{text}}}',
	'[': '[{{text}}]',
	'*': '*{{text}}*',
	'_': '_{{text}}_',
	'~': '~{{text}}~',
	'˜': '~{{text}}~',
};

const once = (target: EventTarget, eventName: string, callback: (event: Event) => void) => {
    /* Implementation Hidden */
};

export const handleSelectionWrapping = (event: InputEvent, chat: ChatAPI): boolean => {
    /* Implementation Hidden */
};

```