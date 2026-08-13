## File: apps/meteor/client/hooks/usePruneWarningMessage.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useSafely } from '@rocket.chat/fuselage-hooks';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useSetting, useTranslation, useLanguage } from '@rocket.chat/ui-contexts';
import { sendAt } from 'cron';
import { intlFormat } from 'date-fns';
import { useEffect, useState } from 'react';

import { useFormattedRelativeTime } from './useFormattedRelativeTime';
import { getCronAdvancedTimerFromPrecisionSetting } from '../../lib/getCronAdvancedTimerFromPrecisionSetting';
import { useRetentionPolicy } from '../views/room/hooks/useRetentionPolicy';

const getMessage = ({ filesOnly, excludePinned }: { filesOnly: boolean; excludePinned: boolean }): TranslationKey => {
    /* Implementation Hidden */
};

type CronPrecisionSetting = '0' | '1' | '2' | '3';
const getNextRunDate = ({
	enableAdvancedCronTimer,
	cronPrecision,
	advancedCronTimer,
}: {
	enableAdvancedCronTimer: boolean;
	cronPrecision: CronPrecisionSetting;
	advancedCronTimer: string;
}) => {
    /* Implementation Hidden */
};

const useNextRunDate = ({
	enableAdvancedCronTimer,
	advancedCronTimer,
	cronPrecision,
}: {
	enableAdvancedCronTimer: boolean;
	cronPrecision: CronPrecisionSetting;
	advancedCronTimer: string;
}) => {
    /* Implementation Hidden */
};

export const usePruneWarningMessage = (room: IRoom) => {
    /* Implementation Hidden */
};

```