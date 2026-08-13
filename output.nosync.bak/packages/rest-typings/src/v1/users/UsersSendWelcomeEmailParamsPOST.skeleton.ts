## File: packages/rest-typings/src/v1/users/UsersSendWelcomeEmailParamsPOST.ts

```typescript
import { ajv } from '../Ajv';

export type UsersSendWelcomeEmailParamsPOST = { email: string };

const UsersSendWelcomeEmailParamsPostSchema = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
			format: 'basic_email',
		},
	},
	required: ['email'],
	additionalProperties: false,
};

export const isUsersSendWelcomeEmailProps = ajv.compile<UsersSendWelcomeEmailParamsPOST>(UsersSendWelcomeEmailParamsPostSchema);

```