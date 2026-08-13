## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/RepliesForm/utils/getAgentDerivedFromUser.ts

```typescript
import type { ILivechatDepartmentAgents, Serialized, IUser } from '@rocket.chat/core-typings';

const isOmnichannelAgent = (user: IUser | null): user is IUser => (user ? user.roles.includes('livechat-agent') : false);

export const getAgentDerivedFromUser = (user: IUser | null, departmentId: string): Serialized<ILivechatDepartmentAgents> => {
    /* Implementation Hidden */
};

```