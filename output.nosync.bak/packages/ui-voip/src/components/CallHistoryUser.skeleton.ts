## File: packages/ui-voip/src/components/CallHistoryUser.tsx

```typescript
import CallHistoryExternalUser from './CallHistoryExternalUser';
import CallHistoryInternalUser from './CallHistoryInternalUser';
import CallHistoryUnknownUser from './CallHistoryUnknownUser';
import { isCallHistoryExternalContact, isCallHistoryInternalContact, type CallHistoryContact } from '../definitions';

type CallHistoryUserProps = {
	contact: CallHistoryContact;
};

const CallHistoryUser = ({ contact }: CallHistoryUserProps) => {
    /* Implementation Hidden */
};

export default CallHistoryUser;

```