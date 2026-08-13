## File: packages/apps-engine/src/definition/accessors/IUIExtend.ts

```typescript
import type { IUIActionButtonDescriptor } from '../ui';

export interface IUIExtend {
	registerButton(button: IUIActionButtonDescriptor): void;
}

```