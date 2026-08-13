## File: apps/meteor/client/views/omnichannel/modals/CloseChatModalData.tsx

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import CloseChatModal from './CloseChatModal';
import { FormSkeleton } from '../components/FormSkeleton';

const CloseChatModalData = ({
	departmentId,
	visitorEmail,
	onCancel,
	onConfirm,
}: {
	departmentId: ILivechatDepartment['_id'];
	onCancel: () => void;
	visitorEmail?: string;
	onConfirm: (
		comment?: string,
		tags?: string[],
		preferences?: { omnichannelTranscriptPDF: boolean; omnichannelTranscriptEmail: boolean },
	) => Promise<void>;
}) => {
    /* Implementation Hidden */
};
export default CloseChatModalData;

```