## File: packages/ui-kit/src/blocks/elements/CheckboxElement.ts

```typescript
import type { Actionable } from '../Actionable';
import type { Option } from '../Option';

export type CheckboxElement = Actionable<{
	type: 'checkbox';
	options: Option[];
	initialOptions?: Option[];
}>;

```