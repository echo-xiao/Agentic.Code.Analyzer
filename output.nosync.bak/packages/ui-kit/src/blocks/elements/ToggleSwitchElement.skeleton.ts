## File: packages/ui-kit/src/blocks/elements/ToggleSwitchElement.ts

```typescript
import type { Actionable } from '../Actionable';
import type { Option } from '../Option';

export type ToggleSwitchElement = Actionable<{
	type: 'toggle_switch';
	options: Option[];
	initialOptions?: Option[];
}>;

```