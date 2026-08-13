## File: apps/meteor/client/views/root/hooks/useLivechatEnterprise.ts

```typescript
import { useSetting } from '@rocket.chat/ui-contexts';
import { useEffect } from 'react';

import { businessHourManager } from '../../../../app/livechat/client/views/app/business-hours/BusinessHours';
import type { IBusinessHourBehavior } from '../../../../app/livechat/client/views/app/business-hours/IBusinessHourBehavior';
import { SingleBusinessHourBehavior } from '../../../../app/livechat/client/views/app/business-hours/Single';
import { MultipleBusinessHoursBehavior } from '../../../../app/livechat-enterprise/client/views/business-hours/Multiple';
import { useHasLicenseModule } from '../../../hooks/useHasLicenseModule';

const businessHours: Record<string, IBusinessHourBehavior> = {
	multiple: new MultipleBusinessHoursBehavior(),
	single: new SingleBusinessHourBehavior(),
};

export const useLivechatEnterprise = () => {
    /* Implementation Hidden */
};

```