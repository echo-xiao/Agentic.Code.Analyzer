## File: apps/meteor/client/views/audit/hooks/useSettingSelectOptions.ts

```typescript
import { useSettings } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

type SettingSelectOption = {
	label: string;
	value: string;
	_id: string;
};

export const useSettingSelectOptions = (filter = '') => {
    /* Implementation Hidden */
};

```