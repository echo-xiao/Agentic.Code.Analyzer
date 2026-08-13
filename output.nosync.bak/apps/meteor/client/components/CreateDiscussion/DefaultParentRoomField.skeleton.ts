## File: apps/meteor/client/components/CreateDiscussion/DefaultParentRoomField.tsx

```typescript
import { Skeleton, Callout } from '@rocket.chat/fuselage';
import { TextInput } from '@rocket.chat/fuselage-forms';
import { useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ComponentPropsWithoutRef } from 'react';
import { useMemo } from 'react';

import { roomCoordinator } from '../../lib/rooms/roomCoordinator';

export type DefaultParentRoomFieldProps = {
	defaultParentRoom: string;
} & Omit<ComponentPropsWithoutRef<typeof TextInput>, 'defaultValue' | 'disabled'>;

const DefaultParentRoomField = ({ defaultParentRoom, ...props }: DefaultParentRoomFieldProps) => {
    /* Implementation Hidden */
};

export default DefaultParentRoomField;

```