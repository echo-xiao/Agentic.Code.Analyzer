## File: apps/meteor/client/views/room/Header/Omnichannel/QuickActions/hooks/useQuickActions.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	useSetModal,
	useToastMessageDispatch,
	useUserId,
	useSetting,
	usePermission,
	useRole,
	useEndpoint,
	useTranslation,
	useRouter,
} from '@rocket.chat/ui-contexts';
import { useCallback, useState, useEffect } from 'react';

import { usePutChatOnHoldMutation } from './usePutChatOnHoldMutation';
import { useReturnChatToQueueMutation } from './useReturnChatToQueueMutation';
import PlaceChatOnHoldModal from '../../../../../../../app/livechat-enterprise/client/components/modals/PlaceChatOnHoldModal';
import { LegacyRoomManager } from '../../../../../../../app/ui-utils/client';
import { useHasLicenseModule } from '../../../../../../hooks/useHasLicenseModule';
import { useLivechatInquiryStore } from '../../../../../../hooks/useLivechatInquiryStore';
import { quickActionHooks } from '../../../../../../ui';
import { useIsRoomOverMacLimit } from '../../../../../omnichannel/hooks/useIsRoomOverMacLimit';
import { useOmnichannelRouteConfig } from '../../../../../omnichannel/hooks/useOmnichannelRouteConfig';
import CloseChatModal from '../../../../../omnichannel/modals/CloseChatModal';
import CloseChatModalData from '../../../../../omnichannel/modals/CloseChatModalData';
import ForwardChatModal from '../../../../../omnichannel/modals/ForwardChatModal';
import ReturnChatQueueModal from '../../../../../omnichannel/modals/ReturnChatQueueModal';
import TranscriptModal from '../../../../../omnichannel/modals/TranscriptModal';
import { useOmnichannelRoom } from '../../../../contexts/RoomContext';
import type { QuickActionsActionConfig } from '../../../../lib/quickActions';
import { QuickActionsEnum } from '../../../../lib/quickActions';

export const useQuickActions = (): {
	quickActions: QuickActionsActionConfig[];
	actionDefault: (actionId: string) => void;
} => {
    /* Implementation Hidden */
};

```