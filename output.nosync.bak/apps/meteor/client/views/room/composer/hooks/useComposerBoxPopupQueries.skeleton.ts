## File: apps/meteor/client/views/room/composer/hooks/useComposerBoxPopupQueries.ts

```typescript
import type { QueriesResults } from '@tanstack/react-query';
import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useEnablePopupPreview } from './useEnablePopupPreview';
import { slashCommands } from '../../../../../app/utils/client/slashCommand';
import type { ComposerPopupOption } from '../../contexts/ComposerPopupContext';

export const useComposerBoxPopupQueries = <T extends { _id: string; sort?: number }>(filter: unknown, popup?: ComposerPopupOption<T>) => {
    /* Implementation Hidden */
};

```