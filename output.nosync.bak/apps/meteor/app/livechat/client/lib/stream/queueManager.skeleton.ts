## File: apps/meteor/app/livechat/client/lib/stream/queueManager.ts

```typescript
import {
	LivechatInquiryStatus,
	type ILivechatDepartment,
	type ILivechatInquiryRecord,
	type IOmnichannelAgent,
	type Serialized,
} from '@rocket.chat/core-typings';

import { useLivechatInquiryStore } from '../../../../../client/hooks/useLivechatInquiryStore';
import { queryClient } from '../../../../../client/lib/queryClient';
import { roomsQueryKeys } from '../../../../../client/lib/queryKeys';
import { settings } from '../../../../../client/lib/settings';
import { dispatchToastMessage } from '../../../../../client/lib/toast';
import { mapMessageFromApi } from '../../../../../client/lib/utils/mapMessageFromApi';
import { sdk } from '../../../../utils/client/lib/SDKClient';

const departments = new Set();

const events = {
	added: async (inquiry: ILivechatInquiryRecord) => {
		if (!departments.has(inquiry.department)) {
			return;
		}

		useLivechatInquiryStore.getState().add({ ...inquiry, alert: true });
		await invalidateRoomQueries(inquiry.rid);
	},
	changed: async (inquiry: ILivechatInquiryRecord) => {
		if (inquiry.status !== LivechatInquiryStatus.QUEUED || (inquiry.department && !departments.has(inquiry.department))) {
			return removeInquiry(inquiry);
		}

		useLivechatInquiryStore.getState().merge({ ...inquiry, alert: true });
		await invalidateRoomQueries(inquiry.rid);
	},
	removed: (inquiry: ILivechatInquiryRecord) => removeInquiry(inquiry),
};

type InquiryEventType = keyof typeof events;
type InquiryEventArgs = { type: InquiryEventType } & Omit<ILivechatInquiryRecord, 'type'>;

const processInquiryEvent = async (args: unknown): Promise<void> => {
    /* Implementation Hidden */
};

const invalidateRoomQueries = async (rid: string) => {
    /* Implementation Hidden */
};

const removeInquiry = async (inquiry: ILivechatInquiryRecord) => {
    /* Implementation Hidden */
};

const INQUIRY_COUNT_SETTING = 'Livechat_guest_pool_max_number_incoming_livechats_displayed';

const getInquiriesFromAPI = async () => {
    /* Implementation Hidden */
};

const removeListenerOfDepartment = (departmentId: ILivechatDepartment['_id']) => {
    /* Implementation Hidden */
};

const appendListenerToDepartment = (departmentId: ILivechatDepartment['_id']) => {
    /* Implementation Hidden */
};
const addListenerForeachDepartment = (departments: ILivechatDepartment['_id'][] = []) => {
    /* Implementation Hidden */
};

const updateInquiries = async (inquiries: Serialized<ILivechatInquiryRecord>[] = []) =>
	inquiries.forEach((inquiry) => {
		useLivechatInquiryStore.getState().merge({
			...inquiry,
			alert: true,
			ts: new Date(inquiry.ts),
			v: { ...inquiry.v, lastMessageTs: inquiry.v.lastMessageTs ? new Date(inquiry.v.lastMessageTs) : undefined },
			estimatedInactivityCloseTimeAt: inquiry.estimatedInactivityCloseTimeAt ? new Date(inquiry.estimatedInactivityCloseTimeAt) : undefined,
			lockedAt: inquiry.lockedAt ? new Date(inquiry.lockedAt) : undefined,
			lastMessage: inquiry.lastMessage ? mapMessageFromApi(inquiry.lastMessage) : undefined,
			_updatedAt: new Date(inquiry._updatedAt),
		});
	});

const getAgentsDepartments = async (userId: IOmnichannelAgent['_id']) => {
    /* Implementation Hidden */
};

const removeGlobalListener = () => sdk.stop('livechat-inquiry-queue-observer', 'public');

const addGlobalListener = () => {
    /* Implementation Hidden */
};

const removeAgentListener = (userId: IOmnichannelAgent['_id']) => {
    /* Implementation Hidden */
};

const addAgentListener = (userId: IOmnichannelAgent['_id']) => {
    /* Implementation Hidden */
};

const subscribe = async (userId: IOmnichannelAgent['_id']) => {
    /* Implementation Hidden */
};

export const initializeLivechatInquiryStream = (() => {
	let cleanUp: (() => void) | undefined;

	return async (...args: Parameters<typeof subscribe>) => {
		cleanUp?.();
		cleanUp = await subscribe(...args);
	};
})();

```