## File: apps/meteor/client/views/omnichannel/businessHours/EditBusinessHoursWithData.tsx

```typescript
import type { ILivechatBusinessHour, LivechatBusinessHourTypes } from '@rocket.chat/core-typings';
import { Button, States, StatesAction, StatesActions, StatesIcon, StatesTitle } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageContent } from '@rocket.chat/ui-client';
import { useEndpoint, useRouter } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import EditBusinessHours from './EditBusinessHours';
import PageSkeleton from '../../../components/PageSkeleton';

export type EditBusinessHoursWidthDataProps = { id?: ILivechatBusinessHour['_id']; type: LivechatBusinessHourTypes };

const EditBusinessHoursWidthData = ({ id, type }: EditBusinessHoursWidthDataProps) => {
    /* Implementation Hidden */
};

export default EditBusinessHoursWidthData;

```