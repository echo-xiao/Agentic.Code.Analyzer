## File: packages/apps/src/server/misc/Utilities.ts

```typescript
import cloneDeep = require('lodash.clonedeep');

export class Utilities {
	public static deepClone<T>(item: T): T {
        /* Implementation Hidden */
    }

	public static deepFreeze<T>(item: any): T {
        /* Implementation Hidden */
    }

	public static deepCloneAndFreeze<T>(item: T): T {
        /* Implementation Hidden */
    }

	public static omit(object: { [key: string]: any }, keys: Array<string>) {
        /* Implementation Hidden */
    }
}

```