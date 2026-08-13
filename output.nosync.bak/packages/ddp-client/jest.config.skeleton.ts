## File: packages/ddp-client/jest.config.ts

```typescript
import client from '@rocket.chat/jest-presets/client';
import type { Config } from 'jest';

export default {
	preset: client.preset,
	modulePathIgnorePatterns: ['<rootDir>/__tests__/helpers'],
} satisfies Config;

```