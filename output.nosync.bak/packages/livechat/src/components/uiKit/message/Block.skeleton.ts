## File: packages/livechat/src/components/uiKit/message/Block.tsx

```typescript
import { type ComponentChildren, createContext } from 'preact';
import { memo, useContext, useCallback, useState, useRef, useEffect } from 'preact/compat';

import { useDispatchAction } from './Surface';

const BlockContext = createContext({
	appId: null,
	blockId: null,
});

type BlockProps = {
	appId?: string;
	blockId?: string;
	children: ComponentChildren;
};

const Block = ({ appId, blockId, children }: BlockProps) => (
	<BlockContext.Provider
		value={{
			appId,
			blockId,
		}}
	>
		{children}
	</BlockContext.Provider>
);

export const usePerformAction = (actionId: string) => {
    /* Implementation Hidden */
};

export default memo(Block);

```