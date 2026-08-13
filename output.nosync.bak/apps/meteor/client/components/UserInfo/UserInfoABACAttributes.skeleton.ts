## File: apps/meteor/client/components/UserInfo/UserInfoABACAttributes.tsx

```typescript
import type { IAbacAttributeDefinition } from '@rocket.chat/core-typings';
import { Box, Margins } from '@rocket.chat/fuselage';

import UserInfoABACAttribute from './UserInfoABACAttribute';

export type UserInfoABACAttributesProps = {
	abacAttributes: IAbacAttributeDefinition[];
};

const UserInfoABACAttributes = ({ abacAttributes }: UserInfoABACAttributesProps) => {
    /* Implementation Hidden */
};

export default UserInfoABACAttributes;

```