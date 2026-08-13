## File: packages/ui-kit/src/blocks/elements/MultiChannelsSelectElement.ts

```typescript
import type { Actionable } from '../Actionable';
import type { PlainText } from '../text/PlainText';

export type MultiChannelsSelectElement = Actionable<{
	type: 'multi_channels_select';
	placeholder?: PlainText;
}>;

```