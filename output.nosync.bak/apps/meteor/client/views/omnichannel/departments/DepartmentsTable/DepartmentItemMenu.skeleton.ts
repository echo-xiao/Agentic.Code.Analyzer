## File: apps/meteor/client/views/omnichannel/departments/DepartmentsTable/DepartmentItemMenu.tsx

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericMenu } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint, useRoute, useSetModal, useSetting } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import RemoveDepartmentModal from './RemoveDepartmentModal';

const ARCHIVE_DEPARTMENT_ENDPOINTS = {
	archive: '/v1/livechat/department/:_id/archive',
	unarchive: '/v1/livechat/department/:_id/unarchive',
} as const;

type DepartmentItemMenuProps = {
	department: Omit<ILivechatDepartment, '_updatedAt'>;
	archived: boolean;
};

const DepartmentItemMenu = ({ department, archived }: DepartmentItemMenuProps) => {
    /* Implementation Hidden */
};

export default DepartmentItemMenu;

```