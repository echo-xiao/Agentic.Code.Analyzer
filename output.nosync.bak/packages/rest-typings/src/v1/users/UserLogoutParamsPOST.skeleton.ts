## File: packages/rest-typings/src/v1/users/UserLogoutParamsPOST.ts

```typescript
import { ajv } from '../Ajv';

export type UserLogoutParamsPOST = {
	userId?: string;
};

const UserLogoutParamsPostSchema = {
	type: 'object',
	properties: {
		userId: {
			type: 'string',
			nullable: true,
		},
	},
	required: [],
};

export const isUserLogoutParamsPOST = ajv.compile<UserLogoutParamsPOST>(UserLogoutParamsPostSchema);

```