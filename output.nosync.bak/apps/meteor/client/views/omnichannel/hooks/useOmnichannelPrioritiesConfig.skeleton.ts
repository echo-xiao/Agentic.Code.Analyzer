## File: apps/meteor/client/views/omnichannel/hooks/useOmnichannelPrioritiesConfig.ts

```typescript
import { LivechatPriorityWeight } from '@rocket.chat/core-typings';
import { Palette } from '@rocket.chat/fuselage';
import type { Keys } from '@rocket.chat/icons';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useOmnichannelPriorities } from './useOmnichannelPriorities';

type PrioritiesConfig = { iconName: Keys; color?: string; variant?: 'secondary-danger' | 'secondary-warning' | 'secondary-info' };

export const PRIORITIES_CONFIG: Record<number, PrioritiesConfig> = {
	[LivechatPriorityWeight.NOT_SPECIFIED]: {
		iconName: 'circle-unfilled',
	},
	[LivechatPriorityWeight.HIGHEST]: {
		iconName: 'chevron-double-up',
		color: Palette.badge['badge-background-level-4'].toString(),
		variant: 'secondary-danger',
	},
	[LivechatPriorityWeight.HIGH]: {
		iconName: 'chevron-up',
		color: Palette.badge['badge-background-level-4'].toString(),
		variant: 'secondary-danger',
	},
	[LivechatPriorityWeight.MEDIUM]: {
		iconName: 'equal',
		color: Palette.badge['badge-background-level-3'].toString(),
		variant: 'secondary-warning',
	},
	[LivechatPriorityWeight.LOW]: {
		iconName: 'chevron-down',
		color: Palette.badge['badge-background-level-2'].toString(),
		variant: 'secondary-info',
	},
	[LivechatPriorityWeight.LOWEST]: {
		iconName: 'chevron-double-down',
		color: Palette.badge['badge-background-level-2'].toString(),
		variant: 'secondary-info',
	},
};

export const useOmnichannelPrioritiesConfig = (level: LivechatPriorityWeight, showUnprioritized: boolean) => {
    /* Implementation Hidden */
};

```