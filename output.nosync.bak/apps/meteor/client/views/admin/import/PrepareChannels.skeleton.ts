## File: apps/meteor/client/views/admin/import/PrepareChannels.tsx

```typescript
import { CheckBox, Table, Tag, Pagination, TableHead, TableRow, TableCell, TableBody } from '@rocket.chat/fuselage';
import type { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { ChannelDescriptor } from './ChannelDescriptor';

export type PrepareChannelsProps = {
	channelsCount: number;
	channels: ChannelDescriptor[];
	setChannels: Dispatch<SetStateAction<ChannelDescriptor[]>>;
};

// TODO: review inner logic
const PrepareChannels = ({ channels, channelsCount, setChannels }: PrepareChannelsProps) => {
    /* Implementation Hidden */
};

export default PrepareChannels;

```