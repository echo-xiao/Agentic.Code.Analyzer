## File: apps/meteor/app/apps/server/converters/messages.js

```typescript
import { isMessageFromVisitor } from '@rocket.chat/core-typings';
import { Messages, Rooms, Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { removeEmpty } from '@rocket.chat/tools';

import { cachedFunction } from './cachedFunction';
import { convertMessageFiles } from './convertMessageFiles';
import { transformMappedData } from './transformMappedData';

export class AppMessagesConverter {
	mem = new WeakMap();

	constructor(orch) {
        /* Implementation Hidden */
    }

	async convertById(msgId) {
        /* Implementation Hidden */
    }

	async convertMessageRaw(msgObj) {
        /* Implementation Hidden */
    }

	async convertMessage(msgObj, cacheObj = msgObj) {
        /* Implementation Hidden */
    }

	async convertAppMessage(message, isPartial = false) {
        /* Implementation Hidden */
    }

	_convertAppAttachments(attachments) {
        /* Implementation Hidden */
    }

	async _convertAttachmentsToApp(attachments, mainFile) {
        /* Implementation Hidden */
    }
}

```