## File: packages/ui-kit/src/blocks/elements/ChannelsSelectElement.ts

```typescript
import type { Actionable } from '../Actionable';
import type { PlainText } from '../text/PlainText';

export type ChannelsSelectElement = Actionable<{
	type: 'channels_select';
	placeholder?: PlainText;
}>;

```