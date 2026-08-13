## File: apps/meteor/client/views/room/Header/icons/Translate.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { HeaderState } from '@rocket.chat/ui-client';
import { useSetting } from '@rocket.chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export type TranslateProps = {
	room: IRoom;
};

const Translate = ({ room: { autoTranslateLanguage, autoTranslate } }: TranslateProps) => {
    /* Implementation Hidden */
};

export default memo(Translate);

```