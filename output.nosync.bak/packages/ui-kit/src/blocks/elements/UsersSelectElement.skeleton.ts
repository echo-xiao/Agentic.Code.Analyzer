## File: packages/ui-kit/src/blocks/elements/UsersSelectElement.ts

```typescript
import type { Actionable } from '../Actionable';
import type { PlainText } from '../text/PlainText';

export type UsersSelectElement = Actionable<{
	type: 'users_select';
	placeholder?: PlainText;
}>;

```