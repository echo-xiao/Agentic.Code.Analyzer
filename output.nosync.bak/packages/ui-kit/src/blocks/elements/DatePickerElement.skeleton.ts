## File: packages/ui-kit/src/blocks/elements/DatePickerElement.ts

```typescript
import type { Actionable } from '../Actionable';
import type { TextObject } from '../TextObject';

export type DatePickerElement = Actionable<{
	type: 'datepicker';
	placeholder?: TextObject;
	initialDate?: string;
}>;

```