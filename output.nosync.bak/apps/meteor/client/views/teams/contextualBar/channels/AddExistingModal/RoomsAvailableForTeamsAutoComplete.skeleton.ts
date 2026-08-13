## File: apps/meteor/client/views/teams/contextualBar/channels/AddExistingModal/RoomsAvailableForTeamsAutoComplete.tsx

```typescript
import { AutoComplete, Box, Option, Chip } from '@rocket.chat/fuselage';
import { useDebouncedValue } from '@rocket.chat/fuselage-hooks';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { ComponentProps } from 'react';
import { memo, useMemo, useState } from 'react';

import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';

type RoomsAvailableForTeamsAutoCompleteProps = Omit<ComponentProps<typeof AutoComplete>, 'filter'>;

const RoomsAvailableForTeamsAutoComplete = ({ value, onChange, ...props }: RoomsAvailableForTeamsAutoCompleteProps) => {
    /* Implementation Hidden */
};

export default memo(RoomsAvailableForTeamsAutoComplete);

```