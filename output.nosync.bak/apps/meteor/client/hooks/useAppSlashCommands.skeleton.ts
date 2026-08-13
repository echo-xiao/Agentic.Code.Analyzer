## File: apps/meteor/client/hooks/useAppSlashCommands.ts

```typescript
import type { SlashCommand } from '@rocket.chat/core-typings';
import { useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useStream, useUserId } from '@rocket.chat/ui-contexts';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { slashCommands } from '../../app/utils/client/slashCommand';
import { appsQueryKeys } from '../lib/queryKeys';

type SlashCommandBasicInfo = Pick<SlashCommand, 'clientOnly' | 'command' | 'description' | 'params' | 'providesPreview' | 'appId'>;

export const useAppSlashCommands = () => {
    /* Implementation Hidden */
};

```