## File: packages/ui-kit/src/blocks/elements/RadioButtonElement.ts

```typescript
import type { Actionable } from '../Actionable';
import type { Option } from '../Option';

export type RadioButtonElement = Actionable<{
	type: 'radio_button';
	options: Option[];
	initialOption?: Option;
}>;

```