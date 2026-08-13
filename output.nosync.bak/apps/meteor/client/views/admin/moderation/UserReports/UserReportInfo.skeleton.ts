## File: apps/meteor/client/views/admin/moderation/UserReports/UserReportInfo.tsx

```typescript
import {
	Box,
	Callout,
	StatesAction,
	StatesActions,
	StatesIcon,
	StatesTitle,
	FieldGroup,
	Field,
	FieldLabel,
	FieldRow,
} from '@rocket.chat/fuselage';
import { ContextualbarScrollableContent, ContextualbarFooter } from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import UserContextFooter from './UserContextFooter';
import { normalizeUsername } from '../../../../../lib/utils/normalizeUsername';
import GenericNoResults from '../../../../components/GenericNoResults';
import { FormSkeleton } from '../../../../components/Skeleton';
import { UserCardRole } from '../../../../components/UserCard';
import { useFormatDate } from '../../../../hooks/useFormatDate';
import ReportReason from '../helpers/ReportReason';
import UserColumn from '../helpers/UserColumn';

export type UserReportInfoProps = { userId: string };

const UserReportInfo = ({ userId }: UserReportInfoProps) => {
    /* Implementation Hidden */
};

export default UserReportInfo;

```