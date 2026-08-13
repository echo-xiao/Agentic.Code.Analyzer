## File: apps/meteor/client/views/room/Header/icons/Encrypted.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { HeaderState } from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export type EncryptedProps = { room: IRoom };

const Encrypted = ({ room }: EncryptedProps) => {
    /* Implementation Hidden */
};

export default memo(Encrypted);

```