## File: packages/livechat/src/store/Store.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';

import type { StoreState } from '.';

function getLocalStorage() {
    /* Implementation Hidden */
}
const localStorage = getLocalStorage();

type StoreStateType = StoreState;

export default class Store extends Emitter {
	private _state: StoreStateType;

	private localStorageKey: string;

	private dontPersist: Array<keyof StoreStateType>;

	constructor(
		initialState: StoreStateType,
		{
			localStorageKey = 'store',
			dontPersist = [],
		}: {
			localStorageKey?: string;
			dontPersist?: Array<keyof StoreStateType>;
		} = {},
	) {
        /* Implementation Hidden */
    }

	get state() {
		return this._state;
	}

	persist() {
        /* Implementation Hidden */
    }

	setState(partialState: Partial<StoreStateType>) {
        /* Implementation Hidden */
    }

	unsetSinglePropInStateByName(propName: keyof StoreStateType) {
        /* Implementation Hidden */
    }

	setStoredState(storedState: StoreStateType) {
        /* Implementation Hidden */
    }
}

```