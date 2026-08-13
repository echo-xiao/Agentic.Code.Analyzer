## File: packages/livechat/src/lib/triggers.js

```typescript
import { Emitter } from '@rocket.chat/emitter';

import { Livechat } from '../api';
import store from '../store';
import { actions } from './triggerActions';
import { conditions } from './triggerConditions';
import { hasTriggerCondition, isInIframe } from './triggerUtils';

class IgnoredScheduledTriggerError extends Error {
	constructor(message) {
        /* Implementation Hidden */
    }
}

class Triggers {
	/** @property {Triggers} instance*/

	/** @property {boolean} _started */

	/** @property {Array} _requests */

	/** @property {Array} _triggers */

	/** @property {boolean} _enabled */

	/** @property {import('@rocket.chat/emitter').Emitter} callbacks */

	constructor() {
        /* Implementation Hidden */
    }

	set triggers(newTriggers) {
		this._triggers = [...newTriggers];
	}

	set enabled(value) {
		this._enabled = value;
	}

	get parentUrl() {
		return isInIframe() ? store.state.parentUrl : window.location.href;
	}

	init() {
        /* Implementation Hidden */
    }

	async when(id, condition) {
        /* Implementation Hidden */
    }

	async fire(id, action, params) {
        /* Implementation Hidden */
    }

	schedule(trigger) {
        /* Implementation Hidden */
    }

	scheduleAll(triggers) {
        /* Implementation Hidden */
    }

	async processTrigger(id) {
        /* Implementation Hidden */
    }

	async processTriggers({ force = false, filter = () => true } = {}) {
        /* Implementation Hidden */
    }

	hasTriggersBeforeRegistration() {
        /* Implementation Hidden */
    }

	_listenParentUrlChanges() {
        /* Implementation Hidden */
    }

	_isValid(trigger) {
        /* Implementation Hidden */
    }

	_updateRecord(id, data) {
        /* Implementation Hidden */
    }

	_findRecordsByStatus(status) {
        /* Implementation Hidden */
    }

	_findRecordById(id) {
        /* Implementation Hidden */
    }

	_syncTriggerRecords() {
        /* Implementation Hidden */
    }
}

const instance = new Triggers();
export default instance;

```