## File: packages/message-parser/src/guards.ts

```typescript
import type { Types, TypesKeys } from './definitions';

export const isNodeOfType = <T extends TypesKeys>(value: unknown, type: T): value is Types[T] =>
	typeof value === 'object' && value !== null && 'type' in value && (value as { type: unknown }).type === type;

```