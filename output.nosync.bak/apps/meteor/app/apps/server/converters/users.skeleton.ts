## File: apps/meteor/app/apps/server/converters/users.js

```typescript
import { UserStatusConnection, UserType } from '@rocket.chat/apps-engine/definition/users';
import { Users } from '@rocket.chat/models';
import { removeEmpty } from '@rocket.chat/tools';

export class AppUsersConverter {
	constructor(orch) {
        /* Implementation Hidden */
    }

	async convertById(userId) {
        /* Implementation Hidden */
    }

	async convertByUsername(username) {
        /* Implementation Hidden */
    }

	convertToApp(user) {
        /* Implementation Hidden */
    }

	convertToRocketChat(user) {
        /* Implementation Hidden */
    }

	_convertUserTypeToEnum(type) {
        /* Implementation Hidden */
    }

	_convertStatusConnectionToEnum(username, userId, status) {
        /* Implementation Hidden */
    }
}

```