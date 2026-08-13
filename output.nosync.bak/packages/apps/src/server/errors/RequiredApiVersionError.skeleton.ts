## File: packages/apps/src/server/errors/RequiredApiVersionError.ts

```typescript
import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import * as semver from 'semver';

export class RequiredApiVersionError implements Error {
	public name = 'RequiredApiVersion';

	public message: string;

	constructor(info: IAppInfo, versionInstalled: string) {
        /* Implementation Hidden */
    }
}

```