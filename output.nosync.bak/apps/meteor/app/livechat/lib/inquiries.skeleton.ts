## File: apps/meteor/app/livechat/lib/inquiries.ts

```typescript
import { OmnichannelSortingMechanismSettingType } from '@rocket.chat/core-typings';

type SortOrder = 1 | -1;

type ReturnType =
	| {
			priorityWeight: SortOrder;
			ts: SortOrder;
			_updatedAt: SortOrder;
	  }
	| {
			estimatedWaitingTimeQueue: SortOrder;
			ts: SortOrder;
			_updatedAt: SortOrder;
	  }
	| {
			ts: SortOrder;
			_updatedAt: SortOrder;
	  };

export const getOmniChatSortQuery = (
	sortByMechanism: OmnichannelSortingMechanismSettingType = OmnichannelSortingMechanismSettingType.Timestamp,
): ReturnType => {
    /* Implementation Hidden */
};

```