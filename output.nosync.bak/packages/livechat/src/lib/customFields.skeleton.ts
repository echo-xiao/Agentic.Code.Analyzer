## File: packages/livechat/src/lib/customFields.ts

```typescript
import { Livechat } from '../api';
import type { StoreState } from '../store';
import store from '../store';

class CustomFields {
	static instance: CustomFields;

	private _initiated = false;

	private _started = false;

	constructor() {
        /* Implementation Hidden */
    }

	init() {
        /* Implementation Hidden */
    }

	reset() {
        /* Implementation Hidden */
    }

	handleStoreChange([state]: [StoreState]) {
        /* Implementation Hidden */
    }

	addToQueue(key: string, value: string, overwrite: boolean) {
        /* Implementation Hidden */
    }

	getQueue() {
        /* Implementation Hidden */
    }

	clearQueue() {
        /* Implementation Hidden */
    }

	processCustomFields() {
        /* Implementation Hidden */
    }

	setCustomField(key: string, value: string, overwrite = true) {
        /* Implementation Hidden */
    }
}

const instance = new CustomFields();
export default instance;

```