## File: apps/meteor/client/views/audit/components/SettingSelect.tsx

```typescript
import { Option, PaginatedSelectFiltered } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSettingSelectOptions } from '../hooks/useSettingSelectOptions';

export const SettingSelect = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    /* Implementation Hidden */
};

```