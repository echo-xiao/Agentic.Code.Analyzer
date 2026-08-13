## File: apps/meteor/client/views/teams/contextualBar/TeamAutocomplete/TeamAutocomplete.tsx

```typescript
import { AutoComplete, Option, Box } from '@rocket.chat/fuselage';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ComponentProps } from 'react';
import { memo, useMemo, useState } from 'react';

type TeamAutocompleteProps = Omit<ComponentProps<typeof AutoComplete>, 'filter'>;

const TeamAutocomplete = ({ value, onChange, ...props }: TeamAutocompleteProps) => {
    /* Implementation Hidden */
};

export default memo(TeamAutocomplete);

```