## File: apps/meteor/client/views/omnichannel/directory/chats/ChatInfo/VisitorClientInfo.tsx

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import UAParser from 'ua-parser-js';

import { omnichannelQueryKeys } from '../../../../../lib/queryKeys';
import Field from '../../../components/Field';
import Info from '../../../components/Info';
import Label from '../../../components/Label';
import { FormSkeleton } from '../../components/FormSkeleton';

type VisitorClientInfoProps = {
	uid: string;
};

const VisitorClientInfo = ({ uid }: VisitorClientInfoProps) => {
    /* Implementation Hidden */
};

export default VisitorClientInfo;

```