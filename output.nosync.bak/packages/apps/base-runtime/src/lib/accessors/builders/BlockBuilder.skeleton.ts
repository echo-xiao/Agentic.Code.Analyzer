## File: packages/apps/base-runtime/src/lib/accessors/builders/BlockBuilder.ts

```typescript
import { BlockBuilder as AppsEngineBlockBuilder } from '@rocket.chat/apps-engine/definition/uikit/blocks/BlockBuilder';

import { AppObjectRegistry } from '../../../AppObjectRegistry';

/**
 * Local BlockBuilder that extends the apps-engine BlockBuilder.
 * It overrides the constructor to source the appId from the registry
 * instead of requiring it as a constructor argument.
 *
 * @deprecated please prefer the rocket.chat/ui-kit components
 */
export class BlockBuilder extends AppsEngineBlockBuilder {
	constructor() {
        /* Implementation Hidden */
    }
}

```