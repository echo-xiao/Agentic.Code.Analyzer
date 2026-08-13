## File: packages/apps/src/server/misc/UIHelper.ts

```typescript
import { randomUUID } from 'node:crypto';

import type { IBlock } from '@rocket.chat/apps-engine/definition/uikit';
import type { LayoutBlock } from '@rocket.chat/ui-kit';

export class UIHelper {
	/**
	 * Assign blockId, appId and actionId to every block/element inside the array
	 * @param blocks the blocks that will be iterated and assigned the ids
	 * @param appId the appId that will be assigned to
	 * @returns the array of block with the ids properties assigned
	 */
	public static assignIds(blocks: Array<IBlock | LayoutBlock>, appId: string): Array<IBlock | LayoutBlock> {
        /* Implementation Hidden */
    }
}

```