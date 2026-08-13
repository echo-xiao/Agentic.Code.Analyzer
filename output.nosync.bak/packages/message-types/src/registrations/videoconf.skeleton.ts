## File: packages/message-types/src/registrations/videoconf.ts

```typescript
import type { MessageTypes } from '../MessageTypes';

export default (instance: MessageTypes) => {
	instance.registerType({
		id: 'videoconf',
		system: false,
		text: (t) => t('Video_Conference'),
	});
};

```