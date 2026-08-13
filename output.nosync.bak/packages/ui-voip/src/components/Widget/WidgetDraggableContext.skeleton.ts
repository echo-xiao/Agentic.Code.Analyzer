## File: packages/ui-voip/src/components/Widget/WidgetDraggableContext.ts

```typescript
import type { Ref } from 'react';
import { createContext, useContext } from 'react';

type DragContextValue = {
	draggableRef: Ref<HTMLElement>;
	boundingRef: Ref<HTMLElement>;
	handleRef: Ref<HTMLElement>;
};

export const DragContext = createContext<DragContextValue | undefined>(undefined);

export const useDraggableWidget = (): DragContextValue => {
    /* Implementation Hidden */
};

```