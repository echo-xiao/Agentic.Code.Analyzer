## File: apps/uikit-playground/src/Context/createCtx.tsx

```typescript
import type { Dispatch, Reducer, ReactNode } from 'react';
import { createContext, useReducer } from 'react';

import type { initialStateType } from './initialState';

export default function createCtx<ActionType>(reducer: Reducer<initialStateType, ActionType>, initialState: initialStateType) {
    /* Implementation Hidden */
}

```