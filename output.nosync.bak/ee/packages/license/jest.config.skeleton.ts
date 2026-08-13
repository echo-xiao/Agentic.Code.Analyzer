## File: ee/packages/license/jest.config.ts

```typescript
import server from '@rocket.chat/jest-presets/server';
import type { Config } from 'jest';

export default {
	preset: server.preset,
	modulePathIgnorePatterns: ['<rootDir>/__tests__/MockedLicenseBuilder'],
} satisfies Config;

```