## File: ee/packages/presence/jest.config.ts

```typescript
import server from '@rocket.chat/jest-presets/server';
import type { Config } from 'jest';

export default {
	preset: server.preset,
} satisfies Config;

```