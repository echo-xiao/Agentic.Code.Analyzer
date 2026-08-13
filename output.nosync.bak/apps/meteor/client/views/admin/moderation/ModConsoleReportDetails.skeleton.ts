## File: apps/meteor/client/views/admin/moderation/ModConsoleReportDetails.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Tabs, TabsItem, ContextualbarHeader, ContextualbarTitle } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ContextualbarClose, ContextualbarDialog } from '@rocket.chat/ui-client';
import { useTranslation, useRouter, useRouteParameter } from '@rocket.chat/ui-contexts';
import { useState } from 'react';

import UserMessages from './UserMessages';
import UserReportInfo from './UserReports/UserReportInfo';

export type ModConsoleReportDetailsProps = {
	userId: IUser['_id'];
	default: string;
	onRedirect: (mid: string) => void;
};

const ModConsoleReportDetails = ({ userId, default: defaultTab, onRedirect }: ModConsoleReportDetailsProps) => {
    /* Implementation Hidden */
};

export default ModConsoleReportDetails;

```