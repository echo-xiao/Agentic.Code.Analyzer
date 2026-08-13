## File: apps/meteor/client/providers/OmnichannelProvider.tsx

```typescript
import {
	type IOmnichannelAgent,
	type OmichannelRoutingConfig,
	OmnichannelSortingMechanismSettingType,
	LivechatInquiryStatus,
} from '@rocket.chat/core-typings';
import { useSafely } from '@rocket.chat/fuselage-hooks';
import { createComparatorFromSort } from '@rocket.chat/mongo-adapter';
import { useUser, useSetting, usePermission, useEndpoint, useStream, useCustomSound } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState, useEffect, useMemo, memo, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

import { initializeLivechatInquiryStream } from '../../app/livechat/client/lib/stream/queueManager';
import { getOmniChatSortQuery } from '../../app/livechat/lib/inquiries';
import { ClientLogger } from '../../lib/ClientLogger';
import type { OmnichannelContextValue } from '../contexts/OmnichannelContext';
import { OmnichannelContext } from '../contexts/OmnichannelContext';
import { useHasLicenseModule } from '../hooks/useHasLicenseModule';
import { useLivechatInquiryStore } from '../hooks/useLivechatInquiryStore';
import { useOmnichannelContinuousSoundNotification } from '../hooks/useOmnichannelContinuousSoundNotification';
import { useShouldPreventAction } from '../hooks/useShouldPreventAction';

const emptyContextValue: OmnichannelContextValue = {
	inquiries: { enabled: false },
	enabled: false,
	isEnterprise: false,
	agentAvailable: false,
	showOmnichannelQueueLink: false,
	isOverMacLimit: false,
	livechatPriorities: {
		enabled: false,
		data: [],
		isLoading: false,
		isError: false,
	},
};

export type OmnichannelProviderProps = {
	children?: ReactNode;
};

const OmnichannelProvider = ({ children }: OmnichannelProviderProps) => {
    /* Implementation Hidden */
};

export default memo<typeof OmnichannelProvider>(OmnichannelProvider);

```