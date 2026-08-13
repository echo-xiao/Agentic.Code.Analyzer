## File: packages/livechat/src/helpers/MemoizedComponent.tsx

```typescript
import type { RenderableProps } from 'preact';
import { Component } from 'preact';

export abstract class MemoizedComponent<P extends Record<string, unknown>, S> extends Component<P, S> {
	override shouldComponentUpdate(nextProps: RenderableProps<P>) {
        /* Implementation Hidden */
    }
}

```