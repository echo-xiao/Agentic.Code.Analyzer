## File: apps/meteor/tests/data/livechat/priorities.ts

```typescript
import type { ILivechatPriority, IOmnichannelServiceLevelAgreements } from '@rocket.chat/core-typings';
import { expect } from 'chai';

import { generateRandomSLAData } from '../../e2e/utils/omnichannel/sla';
import { api, credentials, request } from '../api-data';
import type { DummyResponse } from './utils';

export const createSLA = (): Promise<Omit<IOmnichannelServiceLevelAgreements, '_updated'>> => {
    /* Implementation Hidden */
};

export const deleteSLA = (id: string): Promise<void> => {
    /* Implementation Hidden */
};

export const bulkCreateSLA = (amount: number): Promise<Omit<IOmnichannelServiceLevelAgreements, '_updated'>[]> => {
    /* Implementation Hidden */
};

export const deleteAllSLA = async (): Promise<void> => {
    /* Implementation Hidden */
};

export const getRandomPriority = async (): Promise<ILivechatPriority> => {
    /* Implementation Hidden */
};

```