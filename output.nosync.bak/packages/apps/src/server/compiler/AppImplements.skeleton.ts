## File: packages/apps/src/server/compiler/AppImplements.ts

```typescript
import { AppInterface } from '@rocket.chat/apps-engine/definition/metadata/AppInterface';

import { Utilities } from '../misc/Utilities';

export class AppImplements {
	private implemented: Record<AppInterface, boolean>;

	constructor() {
        /* Implementation Hidden */
    }

	public setImplements(int: AppInterface): void {
        /* Implementation Hidden */
    }

	public doesImplement(int: AppInterface): boolean {
        /* Implementation Hidden */
    }

	public getValues(): Record<AppInterface, boolean> {
        /* Implementation Hidden */
    }

	public toJSON(): Record<AppInterface, boolean> {
        /* Implementation Hidden */
    }
}

```