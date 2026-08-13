## File: apps/meteor/tests/data/livechat/businessHours.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';
import { LivechatBusinessHourTypes } from '@rocket.chat/core-typings';
import type { POSTLivechatBusinessHoursSaveParams } from '@rocket.chat/rest-typings';
import moment from 'moment';

import { api, credentials, request } from '../api-data';
import { updateEESetting, updateSetting } from '../permissions.helper';

type ISaveBhApiWorkHour = Omit<ILivechatBusinessHour, '_id' | 'ts' | 'timezone'> & {
	workHours: { day: string; start: string; finish: string; open: boolean }[];
} & { departmentsToApplyBusinessHour?: string } & { timezoneName: string };

export const saveBusinessHour = async (businessHour: POSTLivechatBusinessHoursSaveParams) => {
    /* Implementation Hidden */
};

export const createCustomBusinessHour = async (departments: string[], open = true): Promise<ILivechatBusinessHour> => {
    /* Implementation Hidden */
};

export const makeDefaultBusinessHourActiveAndClosed = async () => {
    /* Implementation Hidden */
};

export const disableDefaultBusinessHour = async () => {
    /* Implementation Hidden */
};

const removeCustomBusinessHour = async (businessHourId: string) => {
    /* Implementation Hidden */
};

const getAllCustomBusinessHours = async (): Promise<ILivechatBusinessHour[]> => {
    /* Implementation Hidden */
};

export const removeAllCustomBusinessHours = async () => {
    /* Implementation Hidden */
};

export const getDefaultBusinessHour = async (): Promise<ILivechatBusinessHour> => {
    /* Implementation Hidden */
};

export const getCustomBusinessHourById = async (businessHourId: string): Promise<ILivechatBusinessHour> => {
    /* Implementation Hidden */
};

// TODO: Refactor logic so object passed is of the correct type for POST /livechat/business-hours.save. See: CORE-1552
export const openOrCloseBusinessHour = async (businessHour: ILivechatBusinessHour, open: boolean) => {
    /* Implementation Hidden */
};

export const getWorkHours = (open = true): ISaveBhApiWorkHour['workHours'] => {
    /* Implementation Hidden */
};

```