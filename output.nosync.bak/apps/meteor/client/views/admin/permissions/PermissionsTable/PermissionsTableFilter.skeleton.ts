## File: apps/meteor/client/views/admin/permissions/PermissionsTable/PermissionsTableFilter.tsx

```typescript
import { Icon, TextInput } from '@rocket.chat/fuselage';
import { useStableCallback, useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 *
 * TODO: Replaced this by FilterByText, it has the same render
 */
const PermissionsTableFilter = ({ onChange }: { onChange: (debouncedFilter: string) => void }) => {
    /* Implementation Hidden */
};

export default PermissionsTableFilter;

```