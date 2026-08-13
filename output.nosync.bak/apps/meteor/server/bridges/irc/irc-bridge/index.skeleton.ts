## File: apps/meteor/server/bridges/irc/irc-bridge/index.js

```typescript
import { Logger } from '@rocket.chat/logger';
import { Settings } from '@rocket.chat/models';
import moment from 'moment';
import Queue from 'queue-fifo';

import { notifyOnSettingChangedById } from '../../../../app/lib/server/lib/notifyListener';
import { withThrottling } from '../../../../lib/utils/highOrderFunctions';
import { callbacks } from '../../../lib/callbacks';
import { afterLeaveRoomCallback } from '../../../lib/callbacks/afterLeaveRoomCallback';
import { afterLogoutCleanUpCallback } from '../../../lib/callbacks/afterLogoutCleanUpCallback';
import { updateAuditedBySystem } from '../../../settings/lib/auditedSettingUpdates';
import * as servers from '../servers';
import * as localCommandHandlers from './localHandlers';
import * as peerCommandHandlers from './peerHandlers';

const logger = new Logger('IRC Bridge');
const queueLogger = logger.section('Queue');

let removed = false;
const updateLastPing = withThrottling({ wait: 10_000 })(() => {
	if (removed) {
		return;
	}

	void (async () => {
		const updatedValue = await updateAuditedBySystem({
			reason: 'updateLastPing',
		})(Settings.updateValueById, 'IRC_Bridge_Last_Ping', new Date(), { upsert: true });
		if (updatedValue.modifiedCount || updatedValue.upsertedCount) {
			void notifyOnSettingChangedById('IRC_Bridge_Last_Ping');
		}
	})();
});

class Bridge {
	constructor(config) {
        /* Implementation Hidden */
    }

	async init() {
        /* Implementation Hidden */
    }

	stop() {
        /* Implementation Hidden */
    }

	remove() {
        /* Implementation Hidden */
    }

	/**
	 * Log helper
	 */
	log(message) {
        /* Implementation Hidden */
    }

	logQueue(message) {
        /* Implementation Hidden */
    }

	/**
	 *
	 *
	 * Queue
	 *
	 *
	 */
	onMessageReceived(from, command, ...parameters) {
        /* Implementation Hidden */
    }

	async runQueue() {
        /* Implementation Hidden */
    }

	/**
	 *
	 *
	 * Peer
	 *
	 *
	 */
	setupPeerHandlers() {
        /* Implementation Hidden */
    }

	/**
	 *
	 *
	 * Local
	 *
	 *
	 */
	setupLocalHandlers() {
        /* Implementation Hidden */
    }

	removeLocalHandlers() {
        /* Implementation Hidden */
    }

	sendCommand(command, parameters) {
        /* Implementation Hidden */
    }
}

export default Bridge;

```